import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode'; // Ensure you're importing jwt-decode correctly
import api from "../../api/api"; // Assuming you have an API setup
import {  FaBook,  FaClock,  FaTrash } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useBreadcrumb } from '../../context/BreadcrumbContext';

const WriteNoteModal = ({ show, onClose, appointment, onSaveNote }) => {
    const [note, setNote] = useState(""); // Track the note content

    if (!show || !appointment) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg">
                <h2 className="text-xl font-bold pb-2 mb-2 border-b-2">Not Available</h2>
                <p className='flex items-center mb-2'><FaClock className='mr-2' /><span>{moment(appointment.appointmentDate).format('dddd, DD MMMM YYYY')}</span> {appointment.appointmentTime}</p>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Add Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="4"
                ></textarea>
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 border-2 text-gray-500 rounded-lg mr-2 w-1/2">Cancel</button>
                    <button onClick={() => onSaveNote(note)} className="px-4 py-2 bg-customBlue text-white rounded-lg w-1/2">Disable</button>
                </div>
            </div>
        </div>
    );
};

// "Not Available" Modal with Edit/Delete buttons
const NotAvailableModal = ({ show, appointment, note, onEdit, onDelete }) => {
    if (!show || !appointment) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg">
                <h2 className="text-xl font-bold mb-2 pb-2 border-b-2">Not Available</h2>
                <p className='flex items-center'><FaClock className='mr-2' />{moment(appointment.appointmentDate).format('dddd, DD MMMM YYYY')} {appointment.appointmentTime}</p>
                <p className="mt-2 mb-4 flex items-center"><FaBook className='mr-2' />{note}</p>
                <div className="flex justify-end">
                    <button onClick={onEdit} className="px-4 py-2 bg-green-700 text-white rounded-lg mr-2 w-1/2">Edit</button>
                    <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg w-1/2">Delete</button>
                </div>
            </div>
        </div>
    );
};

// Modal for editing and rescheduling the time slot
const EditSlotModal = ({ show, appointment, timeSlots, onClose, onSave }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');
    const [note, setNote] = useState(""); // Track the note content

    if (!show || !appointment) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg">
                <h2 className="text-xl font-bold mb-2 pb-2 border-b-2">Edit Slot</h2>
                <label className="block mb-2">Select Time Slot</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                    {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Add Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="4"
                ></textarea>
                <div className="flex justify-end">
                    <button onClick={onClose} className="w-1/2 px-4 py-2 text-gray-500 border-2 rounded-lg mr-2">Cancel</button>
                    <button onClick={() => onSave(selectedTimeSlot)} className="w-1/2 px-4 py-2 bg-customBlue text-white rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ show, onConfirmDelete, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg text-center">
                <div className='flex justify-center mb-4'>
                    <span className='bg-red-500 rounded-full p-4'>
                        <FaTrash className="text-white text-2xl" />
                    </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Delete Time Slot ?</h3>
                <p>This slot is to be deleted ?</p>
                <div className="flex justify-center mt-4">
                    <button onClick={onCancel} className="px-4 py-2 w-1/2 border-2 rounded-lg mr-4">No</button>
                    <button onClick={onConfirmDelete} className="px-4 py-2 w-1/2 bg-customBlue  text-white rounded-lg">Yes</button>
                </div>
            </div>
        </div>
    );
};

// Main Appointment Time Slot Component
const AppointmentTimeSlot = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));
    const [appointments, setAppointments] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showNotAvailableModal, setShowNotAvailableModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [disabledSlots, setDisabledSlots] = useState([]);
    const [noteContent, setNoteContent] = useState("");

    const { updateBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        updateBreadcrumb([
            { label: "Appointment Time Slot", path: "/doctor/appointment-timeslot" },
        ]);
    }, []);

    // Fetch appointments for the logged-in doctor
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const doctorId = decodedToken.id;

                const response = await api.get("/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const appointmentsData = response.data.data || [];
                const doctorAppointments = appointmentsData.filter(
                    (appointment) => appointment.doctorId === doctorId
                );

                setAppointments(doctorAppointments);
            } catch (error) {
                console.error("Error fetching doctor's appointments:", error);
            }
        };

        fetchAppointments();
    }, [currentWeekStart]);

    // Helper function to generate time slots dynamically (e.g., 8 AM to 8 PM)
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour <= 20; hour++) {
            const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
            slots.push(timeString);
        }
        setTimeSlots(slots);
    };

    useEffect(() => {
        generateTimeSlots();
    }, []);

    // Helper function to get appointments for a specific time slot and day
    const getAppointmentsForSlot = (day, timeSlot) => {
        return appointments.filter(
            (appointment) =>
                moment(appointment.appointmentDate).format('YYYY-MM-DD') === day &&
                appointment.appointmentTime === timeSlot &&
                appointment.status !== 'Cancelled'
        );
    };

    const handleSaveNote = (note) => {
        setNoteContent(note);
        setDisabledSlots([...disabledSlots, selectedAppointment.id]);
        setShowNoteModal(false);
        setShowNotAvailableModal(true);
    };

    const handleEdit = () => {
        setShowNotAvailableModal(false);
        setShowEditModal(true);
    };

    const handleSaveTimeSlot = async (newTimeSlot) => {
        try {
            const response = await api.patch(`/appointments/reschedule/${selectedAppointment.id}`, {
                appointmentTime: newTimeSlot,
            });

            if (response.status === 200) {
                const updatedAppointments = appointments.map((appt) =>
                    appt.id === selectedAppointment.id
                        ? { ...appt, appointmentTime: newTimeSlot }
                        : appt
                );

                setAppointments(updatedAppointments);
                setShowEditModal(false);
                alert("Appointment rescheduled successfully");
            }
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await api.patch(`/appointments/cancel/${selectedAppointment.id}`, {
                status: "Cancelled",
            });

            setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
            setShowDeleteModal(false);
            setSelectedAppointment(null);
        } catch (error) {
            console.error("Error cancelling the appointment:", error);
        }
    };


    return (
        <div className="p-6 bg-white rounded-lg  m-6">
            {/* Heading */}
            <h1 className="text-2xl font-bold mb-4">Appointment Time Slot</h1>

            {/* Week Navigation */}
            <div className="flex justify-center  bg-gray-100 py-2 rounded-tl-lg rounded-tr-lg">
                <div className='flex items-center'>
                    <button
                        className="px-4 py-1 text-customBlue font-bold"
                        onClick={() => setCurrentWeekStart(moment(currentWeekStart).subtract(7, 'days'))}
                    >
                        <AiOutlineLeft />
                    </button>
                    <h1 className="text-lg font-semibold text-customBlue">
                        {moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}
                    </h1>
                    <button
                        className="px-4 py-2 text-customBlue font-bold"
                        onClick={() => setCurrentWeekStart(moment(currentWeekStart).add(7, 'days'))}
                    >
                       <AiOutlineRight />
                    </button>
                </div>
            </div>

            {/* Time Slot Table */}
            <table className="min-w-full table-auto bg-white  rounded-lg">
                <thead>
                    <tr>
                        <th className="border border-gray-100 px-4 py-2 text-customBlue">Time</th>
                        {Array.from({ length: 7 }, (_, i) => moment(currentWeekStart).add(i, 'days').format('ddd D')).map((day) => (
                            <th key={day} className="border border-gray-100 px-4 py-2 text-gray-700">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time) => (
                        <tr key={time}>
                            <td className="border border-gray-100 px-4 py-2 text-center text-customBlue">{time}</td>
                            {Array.from({ length: 7 }, (_, i) => moment(currentWeekStart).add(i, 'days').format('YYYY-MM-DD')).map((day) => {
                                const appointmentsForSlot = getAppointmentsForSlot(day, time);

                                return (
                                    <td key={day} className={`border border-gray-100 px-4 py-2 text-center `}>
                                        {appointmentsForSlot.length > 0 ? (
                                            appointmentsForSlot.map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className=" mb-2 cursor-pointer "
                                                    onClick={() => {
                                                        setSelectedAppointment(appointment);
                                                        setShowNoteModal(true);
                                                    }}
                                                >
                                                    <div className='text-customBlue text-start'>{appointment.patientName}</div>
                                                    <div className='text-start'>{appointment.diseaseName}</div>
                                                    <div className='flex items-center '><FaClock />{appointment.appointmentTime}</div>
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

            {/* Write Note Modal */}
            <WriteNoteModal
                show={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                appointment={selectedAppointment}
                onSaveNote={handleSaveNote}
            />

            {/* Not Available Modal */}
            <NotAvailableModal
                show={showNotAvailableModal}
                appointment={selectedAppointment}
                note={noteContent}
                onEdit={handleEdit}
                onDelete={() => setShowDeleteModal(true)}
            />

            {/* Edit Slot Modal for Rescheduling */}
            <EditSlotModal
                show={showEditModal}
                appointment={selectedAppointment}
                timeSlots={timeSlots}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveTimeSlot}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onConfirmDelete={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
};

export default AppointmentTimeSlot;
