const express = require('express');
const { registerDoctor, viewAllDoctors, deleteDoctor, updateDoctor,loginDoctor,doctorsendOtp,doctorverifyOtp,doctorresetPassword,doctorchangePassword} = require('../controllers/doctorcontroller');
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

   // forgate-password //
router.post('/doctorforgot-password', doctorsendOtp); // Route to send OTP
router.post('/doctorverify-otp', doctorverifyOtp); // Route to verify OTP
router.post('/doctorreset-password', doctorresetPassword);

    //change-password //
router.put('/change-password/:id', doctorchangePassword);

    

module.exports = router;

