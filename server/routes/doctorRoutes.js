const express = require('express');
const { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor } = require('../controllers/doctorController');
const { protect, admin } = require('../middlewares/authmiddleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage config for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'doctor_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

const router = express.Router();

// Admin-protected routes
router.post('/register', protect, admin, upload.fields([
  { name: 'doctorImage', maxCount: 1 },
  { name: 'doctorSignature', maxCount: 1 },
]), registerDoctor);

router.get('/', protect, admin, viewAllDoctors); // View all doctors
router.delete('/:id', protect, admin, deleteDoctor); // Delete a doctor

router.put('/:id', protect, admin, upload.fields([
  { name: 'doctorImage', maxCount: 1 },
  { name: 'doctorSignature', maxCount: 1 },
]), updateDoctor); // Update a doctor

module.exports = router;
