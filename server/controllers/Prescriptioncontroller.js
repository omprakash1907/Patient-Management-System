const Prescription = require('../models/Prescription');
const Patient = require('../models/patient'); // Import Patient model
const Bill = require('../models/bill');
const mongoose = require('mongoose');

// Add Prescription
// exports.CreatePrescription = async (req, res) => {
//     const { medicines, discount, insuranceCompany, insurancePlan, claimAmount } = req.body;
//     const { patientId } = req.params; // From URL params
//     const doctorId = req.user._id; // Ensure this is set

//     try {
//         // Validate if the patientId is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(patientId)) {
//             return res.status(400).json({ error: 'Invalid patient ID format' });
//         }

//         // Fetch patient details from the database
//         const patient = await Patient.findById(patientId);
//         if (!patient) {
//             return res.status(404).json({ error: 'Patient not found' });
//         }

//         // Calculate total price of medicines
//         let totalPrice = 0;
//         medicines.forEach(medicine => {
//             // Assuming medicine.price is a string, convert it to number
//             totalPrice += parseFloat(medicine.price) * (medicine.quantity || 1); // Default quantity to 1 if not provided
//         });

//         // Create the prescription
//         const prescription = new Prescription({
//             patientId,
//             patientName: `${patient.firstName} ${patient.lastName}`,
//             age: patient.age,
//             gender: patient.gender,
//             medicines,
//             doctorId,
//             discount,
//             insuranceCompany,
//             insurancePlan,
//             claimAmount,
//             totalPrice // Add total price to the prescription
            
//         });

//         await prescription.save();

//         res.status(201).json({
//             message: 'Prescription added successfully',
//             prescription
//         });
//     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Server error' });
    //     }
    // };
    
    // Import the Bill model
    
    exports.CreatePrescription = async (req, res) => {
        const { medicines, discount, insuranceCompany, insurancePlan, claimAmount } = req.body;
        const { patientId } = req.params; // From URL params
        const doctorId = req.user._id; // Ensure this is set
        
        try {
        // Validate if the patientId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID format' });
        }

      
        // Fetch patient details from the database
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Calculate total price of medicines
        let totalPrice = 0;
        medicines.forEach(medicine => {
            totalPrice += parseFloat(medicine.price) * (medicine.quantity || 1); // Default quantity to 1 if not provided
        });

        // Create the prescription
        const prescription = new Prescription({
            patientId,
            patientName: `${patient.firstName} ${patient.lastName}`,
            age: patient.age,
            gender: patient.gender,
            medicines,
            doctorId,
            discount,
            insuranceCompany,
            insurancePlan,
            claimAmount,
            totalPrice
        });

        await prescription.save();

        // Create a corresponding bill with status 'unpaid'
        const bill = new Bill({
            prescriptionId: prescription._id,
            patientId: patient._id,
            totalPrice: prescription.totalPrice,
            status: 'unpaid' // Default status
        });

        await bill.save();

        res.status(201).json({
            message: 'Prescription and bill added successfully',
            prescription,
            bill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
