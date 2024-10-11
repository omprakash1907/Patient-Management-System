const express = require('express');
const { registerPatient, updatePatient, deletePatient, viewallpatient, loginPatient,patientsendOtp,patientverifyOtp,patientresetPassword} = require('../controllers/patientcontroller');
const { protect, admin ,authenticatePatient} = require('../middlewares/authmiddleware');
const { bookAppointment } = require('../controllers/appointmentController');
const multer = require('multer');

 const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.single('patientImage'), registerPatient); // 'photo' is the field name for the file

router.put('/:id', protect, admin, upload.single('photo'), updatePatient);
router.delete('/:id', protect, admin, deletePatient);
router.get('/viewallpatient', protect, admin, viewallpatient);

// Login route
router.post('/patientlogin', loginPatient);

router.post('/patientforgot-password', patientsendOtp); // Route to send OTP
router.post('/patientverify-otp', patientverifyOtp); // Route to verify OTP
router.post('/patientreset-password', patientresetPassword); 

module.exports = router;
