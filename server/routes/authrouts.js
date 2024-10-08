const express = require('express');
const { protect, admin } = require('../middlewares/authmiddleware');
const { signUp, login, sendOtp, verifyOtp, resetPassword,getAllAdmins, updateAdmin, deleteAdmin ,changeAdminPassword } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password', sendOtp); // Route to send OTP
router.post('/verify-otp', verifyOtp); // Route to verify OTP
router.post('/reset-password', resetPassword); // Route to reset password
router.get('/all', protect, admin, getAllAdmins); // Get all admins
router.put('/updateAdmin/:id', protect, admin, updateAdmin);  
router.delete('/:id', protect, admin, deleteAdmin);

router.put('/change-password', protect, admin, changeAdminPassword);


module.exports = router;
