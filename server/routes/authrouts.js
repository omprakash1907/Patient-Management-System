const express = require('express');
const { signUp, login, sendOtp, verifyOtp, resetPassword } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password', sendOtp); // Route to send OTP
router.post('/verify-otp', verifyOtp); // Route to verify OTP
router.post('/reset-password', resetPassword); // Route to reset password

module.exports = router;
