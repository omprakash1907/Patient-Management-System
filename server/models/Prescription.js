const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    strength: { type: String, required: true },
    dose: { type: String, required: true },
    duration: { type: String, required: true },
    whenToTake: { type: String, required: true },
    price: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    medicines: [medicineSchema],  // Array of medicines
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    totalPrice: { type: Number, required: true },  // Add totalPrice field
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }, 
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
