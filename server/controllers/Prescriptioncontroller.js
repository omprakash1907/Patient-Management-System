const Prescription = require('../models/Prescription');

// Add Prescription
exports.CreatePrescription = async (req, res) => {
    const { patientName, age, gender, medicines } = req.body;
    const { patientId } = req.params;  // From URL params
    const doctorId = req.user._id;  // Assuming doctor token middleware sets req.user

    try {
        const prescription = new Prescription({
            patientId,
            patientName,
            age,
            gender,
            medicines,
            doctorId,
        });

        await prescription.save();

        res.status(201).json({
            message: 'Prescription added successfully',
            prescription
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
