// routes/billRoutes.js
const express = require('express');
const { updateBillStatus } = require('../controllers/billController');
const { protect, admin } = require('../middlewares/authmiddleware');

const router = express.Router();

// Route to update bill status
router.put('/bill/:billId/status', protect, admin, updateBillStatus);

module.exports = router;
