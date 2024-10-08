const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
        required: true
    },
    patientIssue: {
        type: String,
        required: true
    },
    diseaseName: {
        type: String,
        required: true
    },
    country: String,
    state: String,
    city: String,
    hospital: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
