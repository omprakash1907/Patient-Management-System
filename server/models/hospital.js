const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  admin: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
