const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2; // Cloudinary
const authRoutes = require('./routes/authrouts');
const hospitalrots = require('./routes/hospitalrouts');
const doctorRoutes = require('./routes/doctorRoutes'); // Import doctor routes
const patientRoutes = require('./routes/patientrouts');
const appointmentRouts=require('./routes/appointmentRoutes')
const PrescriptionRouts=require('./routes/PrescriptionRouts')
const paymentRoutes = require('./routes/paymentRoutes');


dotenv.config(); // Load environment variables

console.log('PayPal Client ID:', process.env.PAYPAL_CLIENT_ID);
console.log('PayPal Client Secret:', process.env.PAYPAL_CLIENT_SECRET);

connectDB(); // Connect to the database

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware for parsing
app.use(express.urlencoded({ extended: true  }));
app.use(express.json());

// Routes
 app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalrots);
app.use('/api/doctor', doctorRoutes);  
app.use('/api/patients', patientRoutes); 
app.use('/api/appointments', appointmentRouts); 
app.use('/api/prescription',  PrescriptionRouts); 
app.use('/api/payment', paymentRoutes);

// Error handling for invalid routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// General error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
