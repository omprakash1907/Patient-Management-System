const cloudinary = require('cloudinary').v2;
const Doctor = require('../models/doctor');

// Register a new doctor
// const registerDoctor = async (req, res) => {
//   console.log("Register Doctor endpoint hit"); // Log when the endpoint is accessed
//   console.log("Request Body:", req.body); // Log the request body

//   // Validate uploaded files
//   if (!req.files.doctorImage || req.files.doctorImage.length === 0) {
//     console.error("No doctor image uploaded");
//     return res.status(400).json({ error: 'Doctor image is required' });
//   }

//   if (req.files.doctorImage.length > 1) {
//     return res.status(400).json({ error: 'Only one doctor image can be uploaded' });
//   }

//   if (!req.files.doctorSignature || req.files.doctorSignature.length === 0) {
//     console.error("No doctor signature uploaded");
//     return res.status(400).json({ error: 'Doctor signature is required' });
//   }

//   if (req.files.doctorSignature.length > 1) {
//     return res.status(400).json({ error: 'Only one doctor signature can be uploaded' });
//   }

//   const {
//     doctorName, qualification, gender, specialtyType, workOn, workingTime, checkupTime, breakTime, experience,
//     phoneNumber, age, email, country, state, city, zipCode, address, description, onlineConsultationRate
//   } = req.body;

//   try {
//     // Upload images to Cloudinary
//     console.log("Uploading doctor image...");
//     const doctorImageUpload = await cloudinary.uploader.upload(req.files.doctorImage[0].path, {
//       folder: 'doctor_images',
//     });
//     console.log("Doctor image uploaded successfully:", doctorImageUpload.secure_url);

//     console.log("Uploading doctor signature...");
//     const doctorSignatureUpload = await cloudinary.uploader.upload(req.files.doctorSignature[0].path, {
//       folder: 'doctor_signatures',
//     });
//     console.log("Doctor signature uploaded successfully:", doctorSignatureUpload.secure_url);

//     // Create doctor entry
//     const doctor = await Doctor.create({
//       doctorName, qualification, gender, specialtyType, workOn, workingTime, checkupTime, breakTime, experience,
//       phoneNumber, age, email, country, state, city, zipCode, address, description, onlineConsultationRate,
//       doctorImage: doctorImageUpload.secure_url, // URL from Cloudinary
//       doctorSignature: doctorSignatureUpload.secure_url, // URL from Cloudinary
//     });

//     console.log("Doctor registered successfully:", doctor);
//     res.status(201).json({ message: 'Doctor registered successfully', doctor });
//   } catch (error) {
//     console.error("Error registering doctor:", error.message);
//     res.status(400).json({ error: 'Error registering doctor', details: error.message });
//   }
// };
const registerDoctor = async (req, res) => {
  try {
    const {
      doctorName, qualification, gender, specialtyType, workOn, workingTime,
      checkupTime, breakTime, experience, phoneNumber, age, email, country,
      state, city, zipCode, address, description, onlineConsultationRate
    } = req.body;

    // Access files uploaded via multer (if any)
    const doctorImage = req.files && req.files.doctorImage ? req.files.doctorImage[0] : null;
    const doctorSignature = req.files && req.files.doctorSignature ? req.files.doctorSignature[0] : null;

    // Log the uploaded files to see what you get
    console.log("Doctor Image: ", doctorImage);
    console.log("Doctor Signature: ", doctorSignature);

    // Check if image and signature were uploaded successfully
    if (!doctorImage || !doctorSignature) {
      return res.status(400).json({ message: "Both doctor image and signature are required." });
    }

    // Save doctor information along with Cloudinary details
    const doctor = new Doctor({
      doctorName,
      qualification,
      gender,
      specialtyType,
      workOn,
      workingTime,
      checkupTime,
      breakTime,
      experience,
      phoneNumber,
      age,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      description,
      onlineConsultationRate,
      doctorImage: {
        url: doctorImage.path, // Cloudinary URL
        public_id: doctorImage.filename, // Cloudinary public ID
      },
      doctorSignature: {
        url: doctorSignature.path, // Cloudinary URL
        public_id: doctorSignature.filename, // Cloudinary public ID
      },
    });

    // Save doctor to the database
    await doctor.save();
    res.status(201).json(doctor);

  } catch (error) {
    // Log the error for debugging
    console.error(error);
    res.status(500).json({
      error: "Error registering doctor",
      details: error.message,
    });
  }
};



const viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving doctors" });
  }
};


// Delete a doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete the associated images from Cloudinary
    await cloudinary.uploader.destroy(doctor.doctorImage.public_id);
    await cloudinary.uploader.destroy(doctor.doctorSignature.public_id);

    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting doctor" });
  }
};

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: doctor._id, email: doctor.email }, process.env.JWT_SECRET, {
      expiresIn: '30d', // Token expiration time
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.doctorName,
        email: doctor.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};


// Update a doctor
const updateDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updates = req.body;

    // Check if new images were uploaded
    if (req.files) {
      // Handle doctor image
      if (req.files.doctorImage) {
        await cloudinary.uploader.destroy(doctor.doctorImage.public_id); // Remove old image
        const doctorImage = req.files.doctorImage[0];
        updates.doctorImage = {
          url: doctorImage.path,
          public_id: doctorImage.filename,
        };
      }

      // Handle doctor signature
      if (req.files.doctorSignature) {
        await cloudinary.uploader.destroy(doctor.doctorSignature.public_id); // Remove old signature
        const doctorSignature = req.files.doctorSignature[0];
        updates.doctorSignature = {
          url: doctorSignature.path,
          public_id: doctorSignature.filename,
        };
      }
    }

    // Update the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating doctor" });
  }
};



module.exports = { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor,loginDoctor };
