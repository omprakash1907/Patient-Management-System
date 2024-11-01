const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Patient = require('../models/patient');
const Doctor=require('../models/doctor');


const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      console.log(2);
      
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' });
  }
};




const authenticatePatient = async (req, res, next) => {
  try {
    console.log(1);
    
      // Check if the Authorization header is present
      const authHeader = req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Authorization token required' });
      }

      // Extract the token from the header
      const token = authHeader.replace('Bearer ', '');

      // Verify the token
      const decoded = jwt.verify(token, process.env.PATIENT_JWT_SECRET);
      const patient = await Patient.findById(decoded.id);

      if (!patient) {
          return res.status(401).json({ message: 'Invalid token or patient does not exist' });
      }

      req.user = patient; // Attach patient info to the request object
      next();
  } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
  }
};


// const doctorAuth = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//       return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//       const decoded = jwt.verify(token, process.env.DOCTOR_JWT_SECRET);
//       req.user = decoded;  // Set doctor ID to req.user
//       next();
//   } catch (err) {
//     console.log(err);
//       res.status(401).json({ message: 'Token is not valid' });
//   }
// };

const doctorAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.DOCTOR_JWT_SECRET);
      
      // Fetch the doctor details from the database
      req.user = await Doctor.findById(decoded.id).select('-password'); // Assuming you have a Doctor model

      if (!req.user) {
          return res.status(404).json({ message: 'Doctor not found' });
      }
      next();
  } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
  }
};



module.exports = { protect, admin,authenticatePatient,doctorAuth};
