const Hospital = require('../models/hospital');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerHospital = async (req, res) => {
  const { name, address, country, state, city, zipcode } = req.body;
  
  // Check if the Authorization header is present
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin user associated with the token
    const adminUser = await User.findById(decoded.id);
    if (!adminUser) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Create a new hospital
    const hospital = await Hospital.create({
      name,
      address,
      country,
      state,
      city,
      zipcode,
      admin: adminUser._id, // Attach the user as the admin
    });

    // Update the user's hospital reference
    adminUser.hospital = hospital._id;
    await adminUser.save();

    res.status(201).json({ message: 'Hospital registered successfully', hospital });
  } catch (error) {
    res.status(500).json({ error: 'Error registering hospital' });
  }
};

module.exports = { registerHospital };
