const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, state, city, hospital, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      state,
      city,
      hospital,
      password
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
    console.log(req.body);
    
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

const sendOtp = async (req, res) => {
    const { email, phoneNumber } = req.body; // Get email or phone number from the request
  
    try {
      // Find the user by email or phone number
      const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate OTP
      const otp = crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
      user.otp = otp;
      user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
      await user.save();
  
      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP is ${otp}. It is valid for 15 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending OTP' });
    }
  };
  
  // Function to verify OTP
  const verifyOtp = async (req, res) => {
    const { email, otp } = req.body; // Get email and OTP from the request
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
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
  const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;
  
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      const user = await User.findOne({ email });
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

module.exports = { signUp, login ,sendOtp, verifyOtp, resetPassword};

