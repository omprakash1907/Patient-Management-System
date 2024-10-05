const express = require('express');
const { registerPatient, updatePatient, deletePatient,viewallpatient } = require('../controllers/patientcontroller');
const { protect, admin } = require('../middlewares/authmiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Temporary storage for uploaded files

const router = express.Router();

// Route for patient registration (requires admin token)
router.post('/register', protect, admin, upload.single('photo'), registerPatient);

// Route for updating patient information (requires admin token)
router.put('/:id', protect, admin, upload.single('photo'), updatePatient);

// Route for deleting a patient (requires admin token)
router.delete('/:id', protect, admin, deletePatient);
router.get('/viewallpatient', protect, admin, viewallpatient);

module.exports = router;
