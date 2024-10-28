import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Install via npm: npm install react-modal
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import moment from 'moment';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

// Modal for Rescheduling Appointment
const RescheduleAppointmentModal = ({ open, onClose, appointment, timeSlots, onSave }) => {
    const [selectedDate, setSelectedDate] = useState(moment(appointment?.appointmentDate).format('YYYY-MM-DD'));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');

    if (!open || !appointment) return null;

    const handleSave = () => {
        onSave(selectedDate, selectedTimeSlot);
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-[420px] outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center"
        >
            <div className="flex justify-between items-center pb-2 mb-2 border-b">
                <h2 className="text-lg font-semibold ">Reschedule Appointment</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <AiOutlineClose size={24} />
                </button>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-600">Select Date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-600">Select Time</label>
                <select
                    className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                    {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between gap-3">
                <button onClick={onClose} className=" px-4 py-2 rounded-xl  w-full border">
                    Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-customBlue text-white rounded-xl w-full">
                    Save
                </button>
            </div>
        </Modal>
    );
};

const RescheduleAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const patientId = decodedToken.id;

                const response = await api.get("/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredAppointments = response.data.data.filter(
                    (appointment) => appointment.patientId === patientId && appointment.status !== 'Cancelled'
                );
                setAppointments(filteredAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        const generateTimeSlots = () => {
            const slots = [];
            for (let hour = 8; hour <= 20; hour++) {
                const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                slots.push(timeString);
            }
            setTimeSlots(slots);
        };

        fetchAppointments();
        generateTimeSlots();
    }, [appointments]);

    const handleOpenRescheduleModal = (appointment) => {
        setSelectedAppointment(appointment);
        setOpenRescheduleModal(true);
    };

    const handleSaveReschedule = async (newDate, newTimeSlot) => {
        try {
            await api.patch(`/appointments/reschedule/${selectedAppointment.id}`, {
                appointmentDate: newDate,
                appointmentTime: newTimeSlot,
            });

            setAppointments((prevAppointments) =>
                prevAppointments.map((appt) =>
                    appt.id === selectedAppointment.id
                        ? { ...appt, appointmentDate: newDate, appointmentTime: newTimeSlot }
                        : appt
                )
            );

            setOpenRescheduleModal(false);
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
        }
    };

    // Create a week grid based on the current week
    const weekDays = Array.from({ length: 7 }, (_, i) =>
        currentWeekStart.clone().add(i, 'days').format('YYYY-MM-DD')
    );

    const renderAppointmentGrid = () => {
        return (
            <table className="min-w-full table-auto ">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 border-gray-100 text-center text-customBlue">Time</th>
                        {weekDays.map((day, index) => (
                            <th key={index} className="border px-4 py-2 border-gray-100">
                                {moment(day).format('dddd, DD MMM')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time) => (
                        <tr key={time}>
                            <td className="border border-gray-100 px-4 py-2 text-customBlue font-medium text-center">{time}</td>
                            {weekDays.map((day, index) => {
                                const dayAppointments = appointments.filter(
                                    (appointment) =>
                                        moment(appointment.appointmentDate).format('YYYY-MM-DD') === day &&
                                        appointment.appointmentTime === time
                                );

                                return (
                                    <td key={index} className={`border border-gray-100 px-4 py-2 text-center ${dayAppointments.length > 0 ? 'bg-customBlue' : 'bg-gray-50'}`}>
                                        {dayAppointments.length > 0 ? (
                                            dayAppointments.map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="text-white mb-2 cursor-pointer"
                                                    onClick={() => handleOpenRescheduleModal(appointment)}
                                                >
                                                    <div className="font-semibold">{appointment.doctorName}</div> 
                                                    <div className="text-sm">{appointment.patientIssue}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-gray-400">No Schedule</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="p-6 bg-white rounded-xl m-6">
            <h2 className="text-2xl font-semibold m-6 ">Appointment Time Slot</h2>

            {/* Navigation buttons for previous/next week */}
            <div className="flex justify-center text-customBlue font-semibold bg-gray-100 rounded-tr-xl rounded-tl-xl">
                <div className="flex items-center my-3">
                    <span onClick={() => setCurrentWeekStart(currentWeekStart.clone().subtract(7, 'days'))} className="px-4 py-2 cursor-pointer">
                        <AiOutlineLeft />
                    </span>
                    <h3>{moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}</h3>
                    <span onClick={() => setCurrentWeekStart(currentWeekStart.clone().add(7, 'days'))} className="px-4 py-2  cursor-pointer">
                        <AiOutlineRight />
                    </span>
                </div>
            </div>
            {/* Render the Appointment Grid */}
            <div className="overflow-x-auto">
                {renderAppointmentGrid()}
            </div>

            {/* Reschedule Modal */}
            <RescheduleAppointmentModal
                open={openRescheduleModal}
                onClose={() => setOpenRescheduleModal(false)}
                appointment={selectedAppointment}
                timeSlots={timeSlots}
                onSave={handleSaveReschedule}
            />
        </div>
    );
};

export default RescheduleAppointment;
