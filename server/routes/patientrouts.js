const express = require('express');
const { registerPatient, updatePatient, deletePatient, viewallpatient, loginPatient,patientsendOtp,patientverifyOtp,patientresetPassword} = require('../controllers/patientcontroller');
const { protect, admin } = require('../middlewares/authmiddleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/register', protect, admin, upload.single('photo'), registerPatient);
router.put('/:id', protect, admin, upload.single('photo'), updatePatient);
router.delete('/:id', protect, admin, deletePatient);
router.get('/viewallpatient', protect, admin, viewallpatient);

// Login route
router.post('/patientlogin', loginPatient);

router.post('/patientforgot-password', patientsendOtp); // Route to send OTP
router.post('/patientverify-otp', patientverifyOtp); // Route to verify OTP
router.post('/patientreset-password', patientresetPassword); 

module.exports = router;
