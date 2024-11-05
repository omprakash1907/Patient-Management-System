const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getPrescriptionById,
  getAllPrescriptionsByUser, // Import the new function
} = require("../controllers/Prescriptioncontroller");
const { protect } = require("../middleware/authMiddleware");

// Route to create a prescription
router.post("/", protect, createPrescription);

// Route to get a prescription by ID
router.get("/:id", protect, getPrescriptionById);

// Route to get all prescriptions for the logged-in user
router.get("/", protect, getAllPrescriptionsByUser);

module.exports = router;