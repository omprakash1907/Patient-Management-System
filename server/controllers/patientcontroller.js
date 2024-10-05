const Patient = require('../models/patient');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Import file system module

// Function to register a new patient
const registerPatient = async (req, res) => {
    try {
      const { 
        firstName, lastName, email, phoneNumber, age, height, weight, gender, bloodGroup,
        dateOfBirth, country, state, city, address, password, confirmPassword 
      } = req.body;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Check if patient already exists
      const patientExists = await Patient.findOne({ email });
      if (patientExists) {
        return res.status(400).json({ error: 'Patient already exists' });
      }
  
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Upload photo to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create patient
      const newPatient = new Patient({
        firstName, lastName, email, phoneNumber, age, height, weight, gender, bloodGroup,
        dateOfBirth, country, state, city, address, password: hashedPassword,
        photo: result.secure_url, // Store Cloudinary image URL
        public_id: result.public_id // Store Cloudinary public_id
      });
  
      await newPatient.save();
  
      // Remove temporary file after upload
      fs.unlinkSync(req.file.path); // Remove file from the temporary location
  
      res.status(201).json({ message: 'Patient registered successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error registering patient' });
    }
  };
  


  const updatePatient = async (req, res) => {
    try {
      const { 
        firstName, lastName, email, phoneNumber, age, height, weight, gender, bloodGroup,
        dateOfBirth, country, state, city, address, password, confirmPassword 
      } = req.body;
  
      const patientId = req.params.id; // Get patient ID from route parameters
  
      // Check if the patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Password validation
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // If a new photo is uploaded, handle it
      let photoUrl;
      if (req.file) {
        // Delete the old photo from Cloudinary
        await cloudinary.uploader.destroy(patient.public_id); // Use the public_id
  
        // Upload the new photo to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        photoUrl = result.secure_url;
        patient.public_id = result.public_id; // Store the new public_id
  
        // Remove the old file from local storage
        fs.unlinkSync(req.file.path);
      } else {
        // Keep the old photo if no new photo is uploaded
        photoUrl = patient.photo; // Assuming patient.photo contains the Cloudinary URL
      }
  
      // Hash the new password if provided
      let hashedPassword = patient.password; // Keep old password if not changing
      if (password && confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      // Update patient details
      patient.firstName = firstName || patient.firstName;
      patient.lastName = lastName || patient.lastName;
      patient.email = email || patient.email;
      patient.phoneNumber = phoneNumber || patient.phoneNumber;
      patient.age = age || patient.age;
      patient.height = height || patient.height;
      patient.weight = weight || patient.weight;
      patient.gender = gender || patient.gender;
      patient.bloodGroup = bloodGroup || patient.bloodGroup;
      patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
      patient.country = country || patient.country;
      patient.state = state || patient.state;
      patient.city = city || patient.city;
      patient.address = address || patient.address;
      patient.password = hashedPassword; // Update the password
      patient.photo = photoUrl; // Update the photo URL
  
      await patient.save();
      res.status(200).json({ message: 'Patient updated successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating patient' });
    }
  };
  
  const deletePatient = async (req, res) => {
    try {
      const patientId = req.params.id; // Get patient ID from route parameters
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Delete the photo from Cloudinary
      await cloudinary.uploader.destroy(patient.public_id); // Use the public_id
  
      // Delete the patient record
      await Patient.findByIdAndDelete(patientId);
      res.status(200).json({ message: 'Patient deleted successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting patient' });
    }
  };
    const viewallpatient=async(req,res)=>{
        try {
            const patient = await Patient.find({ });
            res.status(200).json(patient);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch patient' });
          }
    }  

module.exports = { registerPatient, updatePatient, deletePatient,viewallpatient };