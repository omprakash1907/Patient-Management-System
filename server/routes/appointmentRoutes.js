const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controllers/appointmentController');
const { authenticatePatient } = require('../middlewares/authmiddleware');

router.post('/book', authenticatePatient, bookAppointment);

module.exports = router;
