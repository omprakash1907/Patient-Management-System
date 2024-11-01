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
    roomID: {
        type: String, // Room ID for video call
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
