const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Register a new doctor
const registerDoctor = async (req, res) => {
  try {
    const {
      doctorName, qualification, gender, specialtyType, workOn, workingTime,
      checkupTime, breakTime, experience, phoneNumber, age, email, country,
      state, city, zipCode, address, description, onlineConsultationRate, password
    } = req.body;
    // console.log(password);
    
    // Access files uploaded via multer (if any)
    const doctorImage = req.files && req.files.doctorImage ? req.files.doctorImage[0] : null;
    const doctorSignature = req.files && req.files.doctorSignature ? req.files.doctorSignature[0] : null;

    // Check if image and signature were uploaded successfully
    if (!doctorImage || !doctorSignature) {
      return res.status(400).json({ message: "Both doctor image and signature are required." });
    }

    // Check if email is already in use
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor with this email already exists." });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create doctor with hashed password and Cloudinary details
    const doctor = new Doctor({
      doctorName,
      qualification,
      gender,
      specialtyType,
      workOn,
      workingTime,
      checkupTime,
      breakTime,
      experience,
      phoneNumber,
      age,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      description,
      onlineConsultationRate,
      password, // Save hashed password
      doctorImage: {
        url: doctorImage.path, // Cloudinary URL
        public_id: doctorImage.filename, // Cloudinary public ID
      },
      doctorSignature: {
        url: doctorSignature.path, // Cloudinary URL
        public_id: doctorSignature.filename, // Cloudinary public ID
      },
    });

    // Save doctor to the database
    await doctor.save();
    const token = jwt.sign({ id: Doctor._id }, process.env.DOCTOR_JWT_SECRET, { expiresIn: process.env.DOCTOR_JWT_EXPIRES_IN });
    res.status(201).json({doctor,token});

  } catch (error) {
    res.status(500).json({
      error: "Error registering doctor",
      details: error.message,
    });
  }
};

const doctorsendOtp = async (req, res) => {
  const { email, phoneNumber } = req.body; // Get email or phone number from the request

  try {
    // Find the user by email or phone number
    const doctor = await Doctor.findOne({ $or: [{ email }, { phoneNumber }] });
    if (!doctor) {
      return res.status(404).json({ error: 'doctor not found' });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
    doctor.otp = otp;
    doctor.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await doctor.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_DOCTORUSER, // Your email
        pass: process.env.EMAIL_DOCTORPASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_DOCTORUSER,
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
const doctorverifyOtp = async (req, res) => {
  
  const { email, otp } = req.body; // Get email and OTP from the request
  
  try {
    const doctor = await Doctor.findOne({ email });
    console.log(doctor);
    if (!doctor || doctor.otp !== otp || Date.now() > doctor.otpExpires) {
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
const doctorresetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const user = await Doctor.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined; // Clear OTP after successful password reset
    user.otpExpires = undefined; // Clear OTP expiration
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error resetting password' });
  }
};

const viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving doctors" });
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete associated images from Cloudinary
    await cloudinary.uploader.destroy(doctor.doctorImage.public_id);
    await cloudinary.uploader.destroy(doctor.doctorSignature.public_id);

    // Delete doctor from database
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting doctor" });
  }
};


const updateDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updates = req.body;

    // Check if new images were uploaded
    if (req.files) {
      // Handle doctor image
      if (req.files.doctorImage) {
        await cloudinary.uploader.destroy(doctor.doctorImage.public_id); // Remove old image
        const doctorImage = req.files.doctorImage[0];
        updates.doctorImage = {
          url: doctorImage.path,
          public_id: doctorImage.filename,
        };
      }

      // Handle doctor signature
      if (req.files.doctorSignature) {
        await cloudinary.uploader.destroy(doctor.doctorSignature.public_id); // Remove old signature
        const doctorSignature = req.files.doctorSignature[0];
        updates.doctorSignature = {
          url: doctorSignature.path,
          public_id: doctorSignature.filename,
        };
      }
    }
    // Check if password is being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10); // Hash new password
    }

    // Update the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: "Error updating doctor" });
  }
};


const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the doctor by email
    const doctor = await Doctor.findOne({ email });
    
    if (!doctor) {
      console.log("Doctor not found");
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: doctor._id, email: doctor.email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.doctorName,
        email: doctor.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error); // Added log for catching errors
    res.status(500).json({ error: 'Error logging in' });
  }
};

// const doctorchangePassword = async (req, res) => {
//   const { currentPassword, newPassword, confirmPassword } = req.body;

//   try {
//     // Find the logged-in doctor by ID (from the `protect` middleware)
//     const doctor = await Doctor.findById(req.user.id);

//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }

//     // Check if current password matches
//     const isMatch = await doctor.matchPassword(currentPassword);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Current password is incorrect' });
//     }

//     // Check if newPassword matches confirmPassword
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ error: 'New password and confirmation do not match' });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     doctor.password = await bcrypt.hash(newPassword, salt);

//     // Save the updated doctor
//     await doctor.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error changing password' });
//   }
// };



const doctorchangePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const doctorId = req.params.id; // Get the doctor ID from URL parameters

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirmation do not match' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(newPassword, salt);

    // Save the updated doctor password
    await doctor.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error changing password' });
  }
};



module.exports = { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor, loginDoctor,doctorsendOtp,doctorverifyOtp,doctorresetPassword,doctorchangePassword };