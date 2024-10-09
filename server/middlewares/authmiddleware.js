const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Patient = require('../models/patient');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
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
      // Check if the Authorization header is present
      const authHeader = req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Authorization token required' });
      }

      // Extract the token from the header
      const token = authHeader.replace('Bearer ', '');

      // Verify the token
      const decoded = jwt.verify(token, process.env.EMAIL_PATIENTUSER);
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
module.exports = { protect, admin,authenticatePatient};
