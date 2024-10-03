const cloudinary = require('cloudinary').v2;
const Doctor = require('../models/doctor');

// Register a new doctor
const registerDoctor = async (req, res) => {
  console.log("Register Doctor endpoint hit"); // Log when the endpoint is accessed
  console.log("Request Body:", req.body); // Log the request body

  // Validate uploaded files
  if (!req.files.doctorImage || req.files.doctorImage.length === 0) {
    console.error("No doctor image uploaded");
    return res.status(400).json({ error: 'Doctor image is required' });
  }

  if (req.files.doctorImage.length > 1) {
    return res.status(400).json({ error: 'Only one doctor image can be uploaded' });
  }

  if (!req.files.doctorSignature || req.files.doctorSignature.length === 0) {
    console.error("No doctor signature uploaded");
    return res.status(400).json({ error: 'Doctor signature is required' });
  }

  if (req.files.doctorSignature.length > 1) {
    return res.status(400).json({ error: 'Only one doctor signature can be uploaded' });
  }

  const {
    doctorName, qualification, gender, specialtyType, workOn, workingTime, checkupTime, breakTime, experience,
    phoneNumber, age, email, country, state, city, zipCode, address, description, onlineConsultationRate
  } = req.body;

  try {
    // Upload images to Cloudinary
    console.log("Uploading doctor image...");
    const doctorImageUpload = await cloudinary.uploader.upload(req.files.doctorImage[0].path, {
      folder: 'doctor_images',
    });
    console.log("Doctor image uploaded successfully:", doctorImageUpload.secure_url);

    console.log("Uploading doctor signature...");
    const doctorSignatureUpload = await cloudinary.uploader.upload(req.files.doctorSignature[0].path, {
      folder: 'doctor_signatures',
    });
    console.log("Doctor signature uploaded successfully:", doctorSignatureUpload.secure_url);

    // Create doctor entry
    const doctor = await Doctor.create({
      doctorName, qualification, gender, specialtyType, workOn, workingTime, checkupTime, breakTime, experience,
      phoneNumber, age, email, country, state, city, zipCode, address, description, onlineConsultationRate,
      doctorImage: doctorImageUpload.secure_url, // URL from Cloudinary
      doctorSignature: doctorSignatureUpload.secure_url, // URL from Cloudinary
    });

    console.log("Doctor registered successfully:", doctor);
    res.status(201).json({ message: 'Doctor registered successfully', doctor });
  } catch (error) {
    console.error("Error registering doctor:", error.message);
    res.status(400).json({ error: 'Error registering doctor', details: error.message });
  }
};



const viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching doctors', details: error.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the doctor
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    // Extract public IDs from the Cloudinary URLs
    const doctorImagePublicId = doctor.doctorImage.split('/').slice(-1)[0].split('.')[0];
    const doctorSignaturePublicId = doctor.doctorSignature.split('/').slice(-1)[0].split('.')[0];
    
    // Delete images from Cloudinary
    await cloudinary.uploader.destroy(`doctor_images/${doctorImagePublicId}`);
    await cloudinary.uploader.destroy(`doctor_signatures/${doctorSignaturePublicId}`);
    
    // Delete the doctor record
    await Doctor.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting doctor', details: error.message });
  }
};


// Update a doctor
const updateDoctor = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the existing doctor
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const {
      doctorName, qualification, gender, specialtyType, workOn, workingTime, checkupTime, breakTime, experience,
      phoneNumber, age, email, country, state, city, zipCode, address, description, onlineConsultationRate
    } = req.body;

    // Update images only if they were uploaded
    if (req.files.doctorImage && req.files.doctorImage.length > 0) {
      const doctorImageUpload = await cloudinary.uploader.upload(req.files.doctorImage[0].path, {
        folder: 'doctor_images',
      });
      doctor.doctorImage = doctorImageUpload.secure_url; // Update image URL
    }

    if (req.files.doctorSignature && req.files.doctorSignature.length > 0) {
      const doctorSignatureUpload = await cloudinary.uploader.upload(req.files.doctorSignature[0].path, {
        folder: 'doctor_signatures',
      });
      doctor.doctorSignature = doctorSignatureUpload.secure_url; // Update signature URL
    }

    // Update other doctor details
    doctor.doctorName = doctorName || doctor.doctorName;
    doctor.qualification = qualification || doctor.qualification;
    doctor.gender = gender || doctor.gender;
    doctor.specialtyType = specialtyType || doctor.specialtyType;
    doctor.workOn = workOn || doctor.workOn;
    doctor.workingTime = workingTime || doctor.workingTime;
    doctor.checkupTime = checkupTime || doctor.checkupTime;
    doctor.breakTime = breakTime || doctor.breakTime;
    doctor.experience = experience || doctor.experience;
    doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
    doctor.age = age || doctor.age;
    doctor.email = email || doctor.email;
    doctor.country = country || doctor.country;
    doctor.state = state || doctor.state;
    doctor.city = city || doctor.city;
    doctor.zipCode = zipCode || doctor.zipCode;
    doctor.address = address || doctor.address;
    doctor.description = description || doctor.description;
    doctor.onlineConsultationRate = onlineConsultationRate || doctor.onlineConsultationRate;

    // Save the updated doctor record
    await doctor.save();
    
    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    res.status(400).json({ error: 'Error updating doctor', details: error.message });
  }
};


module.exports = { registerDoctor,viewAllDoctors, deleteDoctor, updateDoctor };
