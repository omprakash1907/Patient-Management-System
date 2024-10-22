const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/Prescriptioncontroller');
const paymentController = require('../controllers/paymentController');
const { doctorAuth } = require('../middlewares/authmiddleware');

// Add prescription - Doctor token required
router.post('/CreatePrescription/:patientId', doctorAuth , prescriptionController.CreatePrescription);

router.post('/capture', paymentController.capturePayment); 

module.exports = router;
