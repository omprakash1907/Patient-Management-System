const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/Prescriptioncontroller');
const { doctorAuth } = require('../middlewares/authmiddleware');

// Add prescription - Doctor token required
router.post('/CreatePrescription/:patientId', doctorAuth, prescriptionController.CreatePrescription);

module.exports = router;
