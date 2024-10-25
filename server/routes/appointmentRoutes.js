const express = require('express');
const router = express.Router();
const { bookAppointment ,updateAppointment,deleteAppointment} = require('../controllers/appointmentController');
const { authenticatePatient } = require('../middlewares/authmiddleware');

router.post('/book', authenticatePatient, bookAppointment);

router.put('/update/:id', authenticatePatient, updateAppointment); 

router.delete('/Delete/:appointmentId',authenticatePatient, deleteAppointment);

module.exports = router;
