// const express = require('express');
// const { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor } = require('../controllers/doctorController');
// const { protect, admin } = require('../middlewares/authmiddleware');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Cloudinary storage config for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'doctor_images',
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });

// const upload = multer({ storage });

// const router = express.Router();

// // Admin-protected routes
// router.post('/register', protect, admin, upload.fields([
//   { name: 'doctorImage', maxCount: 1 },
//   { name: 'doctorSignature', maxCount: 1 },
// ]), registerDoctor);

// router.get('/', protect, admin, viewAllDoctors); // View all doctors
// router.delete('/:id', protect, admin, deleteDoctor); // Delete a doctor

// router.put('/:id', protect, admin, upload.fields([
//   { name: 'doctorImage', maxCount: 1 },
//   { name: 'doctorSignature', maxCount: 1 },
// ]), updateDoctor); // Update a doctor

// module.exports = router;

const express = require('express');
const { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor,loginDoctor} = require('../controllers/doctorController');
const { protect, admin } = require('../middlewares/authmiddleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { login } = require('../controllers/authcontroller');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'doctor_images', // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

const router = express.Router();

// Doctor routes
router.post('/register', protect, admin, upload.fields([
  { name: 'doctorImage', maxCount: 1 },
  { name: 'doctorSignature', maxCount: 1 },
]), registerDoctor); // Register doctor (only admin, with image upload)

router.get('/viewall', protect, admin, viewAllDoctors); // View all doctors (only admin)

router.put('/update/:id', protect, admin, upload.fields([
  { name: 'doctorImage', maxCount: 1 },
  { name: 'doctorSignature', maxCount: 1 },
]), updateDoctor); // Update doctor (only admin, with image upload)

router.delete('/delete/:id', protect, admin, deleteDoctor);

router.post('/login', loginDoctor);

module.exports = router;

