// models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }, // Default status to 'unpaid'
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
