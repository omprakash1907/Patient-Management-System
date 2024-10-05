const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  specialtyType: { type: String, required: true },
  workOn: { type: String, enum: ['onsite', 'online'], required: true },
  workingTime: { type: String, required: true },
  checkupTime: { type: String, required: true },
  breakTime: { type: String, required: true },
  experience: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  onlineConsultationRate: { type: Number, required: true },
  doctorImage: {
    url: { type: String, required: true }, // Cloudinary image URL
    public_id: { type: String, required: true }, // Cloudinary public ID
  },
  doctorSignature: {
    url: { type: String, required: true }, // Cloudinary signature URL
    public_id: { type: String, required: true }, // Cloudinary public ID
  },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
