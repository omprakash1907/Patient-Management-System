const Patient = require('../models/patient');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Import file system module
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const registerPatient = async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  try {
    const { firstName, lastName, email, phoneNumber, age, height, weight, gender,dateOfBirth, bloodGroup, country, state, city, address, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imageFile = req.file;
    console.log(imageFile);

    // Convert the image buffer into a stream and upload it to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'patients' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(imageFile.buffer); // Pass the buffer to the upload stream
    });

    console.log(result);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      height,
      weight,
      gender,
      patientImage: result.secure_url,
      publicId: result.public_id,
      bloodGroup,
      dateOfBirth,
      country,
      state,
      city,
      address,
      password: hashedPassword,
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering patient.", error });
  }
};



async function loginPatient(req, res) {
  try {
    const { email, password } = req.body;

    // Validate the email and password
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ error: 'patient not found' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, patient.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'password not match' });
    }

    // const token = jwt.sign({ id: patient._id, email: patient.email }, process.env.PATIENT_JWT_SECRET, {
    //   expiresIn: process.env.PATIENT_JWT_EXPIRES_IN, // Set expiration time
    // });

     const token = jwt.sign({ id: patient._id }, process.env.PATIENT_JWT_SECRET, { expiresIn: process.env.PATIENT_JWT_EXPIRES_IN });

    // Return patient data without generating a token
    res.status(200).json({
      message: 'Login successful',
      token,
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
}


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
    if (password && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // If a new photo is uploaded, handle it
    let photoUrl = patient.photo; // Default to current photo URL
    let publicId = patient.publicId; // Default to current publicId

    if (req.file) {
      // Check if there is an existing public_id
      if (patient.publicId) {
        // Delete the old photo from Cloudinary
        await cloudinary.uploader.destroy(patient.publicId);
      }

      // Upload the new photo to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'patients' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer); // Pass the file buffer to the stream
      });

      photoUrl = result.secure_url;
      publicId = result.public_id; // Store the new public_id
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
    patient.publicId = publicId; // Update the publicId

    await patient.save();
    res.status(200).json({ message: 'Patient updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating patient' });
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
  console.log(req.body);
  
  const { email, otp } = req.body; // Get email and OTP from the request

  try {
    const patient = await Patient.findOne({ email});
    console.log(patient.email);
    
    if (!patient || patient.otp !== otp || Date.now() > patient.otpExpires) {
      console.log(patient.otp);
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

const viewallpatient = async (req, res) => {
  try {
    const patient = await Patient.find({});
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
}

module.exports = { registerPatient,loginPatient,viewallpatient,updatePatient,deletePatient,patientsendOtp,patientverifyOtp,patientresetPassword};
// , , , loginPatient, patientsendOtp, , patientresetPassword