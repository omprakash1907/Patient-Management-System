const Appointment = require('../models/Appointment');
const Doctor = require('../models/doctor');

// Helper function to convert "HH:MM" to minutes
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Book appointment function
exports.bookAppointment = async (req, res) => {
    console.log(req.body);
    
    // try {
    //     const { 
    //         patientName, appointmentDate, appointmentTime, appointmentType, patientIssue, 
    //         diseaseName, country, state, city, hospital, doctorId 
    //     } = req.body;

    //     const patientId = req.user._id; // From authenticatePatient middleware (JWT token)

    //     // Find the doctor
    //     const doctor = await Doctor.findById(doctorId);
    //     if (!doctor) {
    //         return res.status(404).json({ message: 'Doctor not found' });
    //     }

    //     const appointmentHourMinutes = timeToMinutes(appointmentTime);

    //     // Extract doctor timings
    //     const workingStart = timeToMinutes(doctor.workingTime.split('-')[0]);
    //     const workingEnd = timeToMinutes(doctor.workingTime.split('-')[1]);
    //     const checkupStart = timeToMinutes(doctor.checkupTime.split('-')[0]);
    //     const checkupEnd = timeToMinutes(doctor.checkupTime.split('-')[1]);
    //     const breakStart = timeToMinutes(doctor.breakTime.split('-')[0]);
    //     const breakEnd = timeToMinutes(doctor.breakTime.split('-')[1]);

    //     // Check if appointment falls within doctor's working hours
    //     if (appointmentHourMinutes < workingStart || appointmentHourMinutes > workingEnd) {
    //         return res.status(400).json({ message: 'Doctor is not available at this time' });
    //     }

    //     // Check if the appointment falls within checkup or break time
    //     if (appointmentHourMinutes >= checkupStart && appointmentHourMinutes <= checkupEnd) {
    //         return res.status(400).json({ message: 'Doctor is available for checkups during this time' });
    //     }

    //     if (appointmentHourMinutes >= breakStart && appointmentHourMinutes <= breakEnd) {
    //         return res.status(400).json({ message: 'Doctor is on break during this time' });
    //     }

    //     // Check if another appointment exists for the same doctor at the same date and time
    //     const existingAppointment = await Appointment.findOne({
    //         doctorId,
    //         appointmentDate,
    //         appointmentTime
    //     });

    //     if (existingAppointment) {
    //         return res.status(400).json({ message: 'The doctor already has an appointment at this time' });
    //     }

    //     // Create appointment
    //     const appointment = new Appointment({
    //         patientId,
    //         doctorId,
    //         patientName,
    //         appointmentDate,
    //         appointmentTime,
    //         appointmentType,
    //         patientIssue,
    //         diseaseName,
    //         country,
    //         state,
    //         city,
    //         hospital
    //     });

    //     await appointment.save();
    //     res.status(201).json({ message: 'Appointment booked successfully', appointment });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    // }
};
