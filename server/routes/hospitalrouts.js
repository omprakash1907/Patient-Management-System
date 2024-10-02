const express = require('express');
const { registerHospital } = require('../controllers/hospitalragistration');
const router = express.Router();

router.post('/register-hospital', registerHospital);

module.exports = router;
