const Appointment = require('../models/Appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient')
// Helper function to convert "HH:MM" or "HH:MM AM/PM" to minutes
const timeToMinutes = (time) => {
    if (!time) {
        throw new Error('Invalid time value');
    }
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to convert "9 AM - 5 PM" format to "09:00-17:00"
const convertHumanReadableTime = (timeRange) => {
    const [startTime, endTime] = timeRange.split('-').map(t => t.trim());

    const convertTo24HourFormat = (time) => {
        const [timePart, period] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (!minutes) minutes = 0; // Handle case where minutes are not provided (e.g., "9 AM")
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0; // Handle midnight case

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const start24Hour = convertTo24HourFormat(startTime);
    const end24Hour = convertTo24HourFormat(endTime);

    return `${start24Hour}-${end24Hour}`;
};

// Book appointment function
// exports.bookAppointment = async (req, res) => {
//     console.log(req.body);

//     try {
//         const { 
//             appointmentDate, appointmentTime, appointmentType, patientIssue, 
//             diseaseName, country, state, city, hospital, doctorId 
//         } = req.body;

//         const patientId = req.user._id; // From authenticatePatient middleware (JWT token)
//         const patientName=req.user.name; 
//         // Find the doctor
//         const {doctor} = await Doctor.findById(doctorId);
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }

//         // Log doctor timings for debugging
//         // console.log('Doctor workingTime:', doctor.workingTime);
//         // console.log('Doctor checkupTime:', doctor.checkupTime);
//         // console.log('Doctor breakTime:', doctor.breakTime);

//         // Convert workingTime to 24-hour format
//         const workingTimeFormatted = convertHumanReadableTime(doctor.workingTime);
//         // console.log('Formatted workingTime:', workingTimeFormatted);

//         // Ensure doctor timings exist and are valid
//         if (!doctor.workingTime || !doctor.checkupTime || !doctor.breakTime) {
//             return res.status(400).json({ message: 'Doctor availability times are not set properly' });
//         }

//         const appointmentHourMinutes = timeToMinutes(appointmentTime);

//         // Extract doctor timings
//         const workingStart = timeToMinutes(workingTimeFormatted.split('-')[0]);
//         const workingEnd = timeToMinutes(workingTimeFormatted.split('-')[1]);

//         // Check if appointment falls within doctor's working hours
//         if (appointmentHourMinutes < workingStart || appointmentHourMinutes > workingEnd) {
//             return res.status(400).json({ message: 'Doctor is not available at this time' });
//         }

//         // For simplicity, let's assume checkupTime and breakTime are being standardized elsewhere in your logic
//         // Check if another appointment exists for the same doctor at the same date and time
//         const existingAppointment = await Appointment.findOne({
//             doctorId,
//             appointmentDate,
//             appointmentTime
//         });

//         if (existingAppointment) {
//             return res.status(400).json({ message: 'The doctor already has an appointment at this time' });
//         }

//         // Create appointment
//         const appointment = new Appointment({
//             patientId,
//             doctorId,
//             patientName,
//             appointmentDate,
//             appointmentTime,
//             appointmentType,
//             patientIssue,
//             diseaseName,
//             country,
//             state,
//             city,
//             hospital
//         });

//         await appointment.save();
//         res.status(201).json({ message: 'Appointment booked successfully', appointment });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


exports.bookAppointment = async (req, res) => {
    console.log(req.user);

    try {
        const {
            appointmentDate,
            appointmentTime,
            appointmentType,
            patientIssue,
            diseaseName,
            country,
            state,
            city,
            hospital,
            doctorId
        } = req.body;

        const patientId = req.user._id; // Get the patient's ID from req.user
        const patientName = req.user.firstName + req.user.lastName; // Fetch patient's name from req.user
        // console.log(req.user.firstName+req.user.lastName);

        // Find the doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure doctor's working time is valid
        if (!doctor.workingTime || !doctor.checkupTime || !doctor.breakTime) {
            return res.status(400).json({ message: 'Doctor availability times are not set properly' });
        }

        // Convert workingTime to 24-hour format
        const workingTimeFormatted = convertHumanReadableTime(doctor.workingTime);

        // Check if the appointment falls within the doctor's working hours
        const appointmentHourMinutes = timeToMinutes(appointmentTime);
        const workingStart = timeToMinutes(workingTimeFormatted.split('-')[0]);
        const workingEnd = timeToMinutes(workingTimeFormatted.split('-')[1]);

        if (appointmentHourMinutes < workingStart || appointmentHourMinutes > workingEnd) {
            return res.status(400).json({ message: 'Doctor is not available at this time' });
        }

        // Check for existing appointments at the same time
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate,
            appointmentTime
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'The doctor already has an appointment at this time' });
        }

        // Create appointment
        const appointment = new Appointment({
            patientId,
            doctorId,
            patientName, // Use name from req.user
            appointmentDate,
            appointmentTime,
            appointmentType,
            patientIssue,
            diseaseName,
            country,
            state,
            city,
            hospital,
            roomID,// Add the generated room ID to the appointment
        });

        // Save the appointment
        await appointment.save();

        // Update the patient's record to include the new appointment ID
        await Patient.findByIdAndUpdate(
            patientId,
            { $push: { appointments: appointment._id } }, // Push the appointment ID to the appointments array
            { new: true } // Return the updated patient document
        );
        await Doctor.findByIdAndUpdate(
            doctorId,
            { $addToSet: { patients: patientId } }, // Use $addToSet to avoid duplicate patient entries
            { new: true } // Return the updated doctor document
        );

        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateAppointment = async (req, res) => {
    // console.log(req.params);

    try {
        const appointmentId = req.params.id;
        const { newAppointmentDate, newAppointmentTime } = req.body;

        // Find the existing appointment
        const appointment = await Appointment.findById(appointmentId);
        console.log("appointment" + appointment);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const doctorId = appointment.doctorId;
        console.log("Doctor ID:", doctorId);
        // Find the doctor
        const doctor = await Doctor.findById(doctorId);
        console.log(doctor);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Convert doctor's working time to 24-hour format
        const workingTimeFormatted = convertHumanReadableTime(doctor.workingTime);
        const workingStart = timeToMinutes(workingTimeFormatted.split('-')[0]);
        const workingEnd = timeToMinutes(workingTimeFormatted.split('-')[1]);

        // Ensure doctor timings exist and are valid
        if (!doctor.workingTime || !doctor.checkupTime || !doctor.breakTime) {
            return res.status(400).json({ message: 'Doctor availability times are not set properly' });
        }

        const newAppointmentMinutes = timeToMinutes(newAppointmentTime);

        // Check if the new time falls within the doctor's working hours
        if (newAppointmentMinutes < workingStart || newAppointmentMinutes > workingEnd) {
            return res.status(400).json({ message: 'Doctor is not available at this time' });
        }

        // Check for overlapping appointments
        const overlappingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate: newAppointmentDate,
            appointmentTime: newAppointmentTime,
            _id: { $ne: appointmentId } // Exclude the current appointment
        });

        if (overlappingAppointment) {
            return res.status(400).json({ message: 'Another appointment exists at this time' });
        }

        // Update the appointment date and time
        appointment.appointmentDate = newAppointmentDate;
        appointment.appointmentTime = newAppointmentTime;

        await appointment.save();

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Find and delete the appointment
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};