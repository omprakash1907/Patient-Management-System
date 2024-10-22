// controllers/billController.js
const Bill = require('../models/bill'); // Import the Bill model
const mongoose = require('mongoose');

// Update Bill Status
exports.updateBillStatus = async (req, res) => {
    const { billId } = req.params;
    const { status } = req.body;

    try {
        // Validate if the billId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(billId)) {
            return res.status(400).json({ error: 'Invalid bill ID format' });
        }

        // Find the bill and update the status
        const bill = await Bill.findByIdAndUpdate(billId, { status }, { new: true });
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({
            message: 'Bill status updated successfully',
            bill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
