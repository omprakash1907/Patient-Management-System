const Patient = require('../models/patient');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Import file system module
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const registerPatient = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phoneNumber, age, height, weight, gender,
      bloodGroup, dateOfBirth, country, state, city, address, password
    } = req.body;

    // Access files uploaded via multer (if any)
    const patientPhoto = req.files && req.files.photo ? req.files.photo[0] : null;

    // Check if the photo was uploaded successfully
    if (!patientPhoto) {
      return res.status(400).json({ message: "Patient photo is required." });
    }

    // Check if email is already in use
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: "Patient with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create patient with hashed password and Cloudinary details
    const patient = new Patient({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      height,
      weight,
      gender,
      bloodGroup,
      dateOfBirth,
      country,
      state,
      city,
      address,
      password: hashedPassword, // Save hashed password
      photo: {
        url: patientPhoto.path, // Cloudinary URL
        public_id: patientPhoto.filename, // Cloudinary public ID
      },
    });

    // Save patient to the database
    await patient.save();
    res.status(201).json(patient);

  } catch (error) {
    res.status(500).json({
      error: "Error registering patient",
      details: error.message,
    });
  }
};



const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the email and password
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, patient.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Return patient data without generating a token
    res.status(200).json({
      message: 'Login successful',
      patient: {
        id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in patient' });
  }
};

const patientsendOtp = async (req, res) => {
  const { email, phoneNumber } = req.body; // Get email or phone number from the request

  try {
    // Find the user by email or phone number
    const patient = await Patient.findOne({ $or: [{ email }, { phoneNumber }] });
    if (!patient) {
      return res.status(404).json({ error: 'patient not found' });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
    patient.otp = otp;
    patient.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await patient.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_PATIENTUSER, // Your email
        pass: process.env.EMAIL_PATIENTPASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_PATIENTUSER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
};

// Function to verify OTP
const patientverifyOtp = async (req, res) => {
  
  const { email, otp } = req.body; // Get email and OTP from the request
  
  try {
    const patient = await Patient.findOne({ email });
    console.log(doctor);
    if (!patient || patient.otp !== otp || Date.now() > patient.otpExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // If OTP is valid, allow password reset
    res.status(200).json({ message: 'OTP verified. You can reset your password.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
};

// Function to reset password
const patientresetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ error: 'patient not found' });
    }

    // Hash the new password and save
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(newPassword, salt);
    patient.otp = undefined; // Clear OTP after successful password reset
    patient.otpExpires = undefined; // Clear OTP expiration
    await patient.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error resetting password' });
  }
};

  const updatePatient = async (req, res) => {
    try {
      const { 
        firstName, lastName, email, phoneNumber, age, height, weight, gender, bloodGroup,
        dateOfBirth, country, state, city, address, password, confirmPassword 
      } = req.body;
  
      const patientId = req.params.id; // Get patient ID from route parameters
  
      // Check if the patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Password validation
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // If a new photo is uploaded, handle it
      let photoUrl;
      if (req.file) {
        // Delete the old photo from Cloudinary
        await cloudinary.uploader.destroy(patient.public_id); // Use the public_id
  
        // Upload the new photo to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        photoUrl = result.secure_url;
        patient.public_id = result.public_id; // Store the new public_id
  
        // Remove the old file from local storage
        fs.unlinkSync(req.file.path);
      } else {
        // Keep the old photo if no new photo is uploaded
        photoUrl = patient.photo; // Assuming patient.photo contains the Cloudinary URL
      }
  
      // Hash the new password if provided
      let hashedPassword = patient.password; // Keep old password if not changing
      if (password && confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      // Update patient details
      patient.firstName = firstName || patient.firstName;
      patient.lastName = lastName || patient.lastName;
      patient.email = email || patient.email;
      patient.phoneNumber = phoneNumber || patient.phoneNumber;
      patient.age = age || patient.age;
      patient.height = height || patient.height;
      patient.weight = weight || patient.weight;
      patient.gender = gender || patient.gender;
      patient.bloodGroup = bloodGroup || patient.bloodGroup;
      patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
      patient.country = country || patient.country;
      patient.state = state || patient.state;
      patient.city = city || patient.city;
      patient.address = address || patient.address;
      patient.password = hashedPassword; // Update the password
      patient.photo = photoUrl; // Update the photo URL
  
      await patient.save();
      res.status(200).json({ message: 'Patient updated successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating patient' });
    }
  };
  

  const deletePatient = async (req, res) => {
    try {
      const patientId = req.params.id; // Get patient ID from route parameters
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Delete the photo from Cloudinary
      await cloudinary.uploader.destroy(patient.public_id); // Use the public_id
  
      // Delete the patient record
      await Patient.findByIdAndDelete(patientId);
      res.status(200).json({ message: 'Patient deleted successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting patient' });
    }
  };
    const viewallpatient=async(req,res)=>{
        try {
            const patient = await Patient.find({ });
            res.status(200).json(patient);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch patient' });
          }
    }  

module.exports = { registerPatient, updatePatient, deletePatient,viewallpatient,loginPatient,patientsendOtp,patientverifyOtp,patientresetPassword};