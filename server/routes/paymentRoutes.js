const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Ensure the path is correct

// Pay route
router.post('/pay/:prescriptionId', paymentController.initiatePayment); // Make sure `initiatePayment` is defined in `paymentController`

module.exports = router;
