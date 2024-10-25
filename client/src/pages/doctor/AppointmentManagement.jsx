import { useState, useEffect } from 'react';
import { FaTrashAlt, FaCalendarTimes, FaCalendarCheck, FaSearch, FaCalendarAlt } from 'react-icons/fa'; // Import FontAwesome icons
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api/api"; // Assuming you have an API setup
import { jwtDecode } from "jwt-decode";
import moment from 'moment';
import DatePicker from "react-datepicker";
import noRecordImage from "../../assets/images/nodoctor.png";
import "react-datepicker/dist/react-datepicker.css";

// Modal for Payment Return Confirmation (second image)
const PaymentReturnModal = ({ open, onClose, onConfirm }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center ${open ? 'block' : 'hidden'} bg-black bg-opacity-50 `}>
            <div className="bg-white rounded-lg shadow-lg w-[420px] border-t-8 border-red-500 p-2">
                {/* Red Header with Icon */}
                <div className='flex justify-center'>
                    <span className='bg-red-500 rounded-full p-4'>
                        <FaCalendarAlt className="text-white text-2xl" />
                    </span>
                </div>
                <div className="p-4">
                    {/* Title and Message */}
                    <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">Cancel Onsite Appointment?</h2>
                    <p className="text-center text-gray-600 mb-4">Do you want to cancel this appointment?</p>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-2">
                        <button onClick={onClose} className="border border-gray-300 bg-white text-gray-700 font-semibold py-2 px-6 rounded-md w-1/2">
                            No
                        </button>
                        <button onClick={onConfirm} className="bg-customBlue text-white font-semibold py-2  rounded-md w-1/2">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Success Modal
const SuccessModal = ({ open, onClose }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center ${open ? 'block' : 'hidden'} bg-black bg-opacity-50`}>
            <div className="bg-white rounded-lg shadow-lg w-[420px] p-4 border-t-8 border-green-700">
                <div className="flex justify-center items-center mb-4">
                    <FaCalendarAlt className="text-green-500 text-4xl" />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Appointment Cancle Successfully!</h2>
                <p className="text-center text-gray-600 mb-4">The appoinment is successfully cancelled.</p>
                <div className="flex justify-center">
                    <button onClick={onClose} className="bg-green-700 text-white px-6 py-2 rounded-md w-full">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal for Cancel Online Appointment (first image)
const CancelAppointmentModal = ({ open, onClose, onProceed }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center ${open ? 'block' : 'hidden'} bg-black bg-opacity-50 `}>
            <div className="bg-white rounded-lg shadow-lg w-[420px] border-t-8 border-red-500 p-2">
                {/* Red Header with Icon */}
                <div className='flex justify-center'>
                    <span className='bg-red-500 rounded-full p-4'>
                        <FaCalendarAlt className="text-white text-2xl" />
                    </span>
                </div>
                <div className="p-4">
                    {/* Title and Message */}
                    <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Cancel Online Appointment?</h2>
                    <p className="text-center text-gray-600 mb-4">If you cancel the appointment, you have to return the payment.</p>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-2">
                        <button onClick={onClose} className="border border-gray-300 bg-white text-gray-700 font-semibold py-2 px-6 rounded-md w-1/2">
                            No
                        </button>
                        <button onClick={onProceed} className="bg-customBlue text-white font-semibold py-2  rounded-md w-1/2">
                            Payment Return
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal for Rescheduling Appointment (similar to EditSlotModal)
const RescheduleAppointmentModal = ({ open, onClose, appointment, timeSlots, onSave }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');

    if (!open || !appointment) return null;

    return (
        <div className={`fixed inset-0 flex justify-center items-center ${open ? 'block' : 'hidden'} bg-black bg-opacity-50`}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
                <h2 className="text-xl font-bold mb-4">Edit Slot</h2>
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
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-md mr-2">Cancel</button>
                    <button onClick={() => onSave(selectedTimeSlot)} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </div>
        </div>
    );
};

const AppointmentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Today Appointment');
    const [openCancelAppointmentModal, setOpenCancelAppointmentModal] = useState(false);
    const [openPaymentReturnModal, setOpenPaymentReturnModal] = useState(false);
    const [openRescheduleModal, setOpenRescheduleModal] = useState(false); // For rescheduling modal
    const [openSuccessModal, setOpenSuccessModal] = useState(false); // Success modal state
    const [timeSlots, setTimeSlots] = useState([]); // For time slots
    const [appointments, setAppointments] = useState({
        today: [],
        upcoming: [],
        previous: [],
        canceled: []
    });
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [appointmentToReschedule, setAppointmentToReschedule] = useState(null); // For rescheduling
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date

    const navigate = useNavigate();

    useEffect(() => {
        const generateTimeSlots = () => {
            const slots = [];
            for (let hour = 8; hour <= 20; hour++) {
                const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                slots.push(timeString);
            }
            setTimeSlots(slots);
        };
        generateTimeSlots();

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
                const today = new Date().toISOString().split("T")[0];
                const doctorAppointments = appointmentsData.filter(
                    (appointment) => appointment.doctorId === doctorId
                );
                const todayAppointments = doctorAppointments.filter(appointment =>
                    appointment.appointmentDate.startsWith(today)
                );
                const upcomingAppointments = doctorAppointments.filter(appointment =>
                    new Date(appointment.appointmentDate) > new Date(today)
                );
                const previousAppointments = doctorAppointments.filter(appointment =>
                    new Date(appointment.appointmentDate) < new Date(today)
                );

                setAppointments({
                    today: todayAppointments,
                    upcoming: upcomingAppointments,
                    previous: previousAppointments,
                    canceled: doctorAppointments.filter(app => app.status === "Cancelled")
                });
            } catch (error) {
                console.error("Error fetching doctor's appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const getAppointments = () => {
        switch (activeTab) {
            case 'Today Appointment':
                return appointments.today.filter(app => app.status !== 'Cancelled');
            case 'Upcoming Appointment':
                return appointments.upcoming.filter(app => app.status !== 'Cancelled');
            case 'Previous Appointment':
                return appointments.previous.filter(app => app.status !== 'Cancelled');
            case 'Cancel Appointment':
                return appointments.canceled;
            default:
                return [];
        }
    };

    const filteredAppointments = getAppointments().filter((appointment) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            appointment.patientName.toLowerCase().includes(lowerSearchTerm) ||
            appointment.diseaseName.toLowerCase().includes(lowerSearchTerm) ||
            (appointment.patientIssue && appointment.patientIssue.toLowerCase().includes(lowerSearchTerm))
        );
    });

    const handleOpenCancelAppointmentModal = (appointment) => {
        setAppointmentToCancel(appointment);
        setOpenCancelAppointmentModal(true);
    };


    const handleConfirmPaymentReturn = () => {
        setOpenPaymentReturnModal(false); // Close Payment Return Modal
        setOpenSuccessModal(true); // Open Success Modal
    };

    const handleSaveReschedule = async (newTimeSlot) => {
        try {
            const response = await api.patch(`/appointments/reschedule/${appointmentToReschedule.id}`, {
                appointmentTime: newTimeSlot,
            });

            if (response.status === 200) {
                setAppointments((prevAppointments) => ({
                    ...prevAppointments,
                    upcoming: prevAppointments.upcoming.map((appt) =>
                        appt.id === appointmentToReschedule.id
                            ? { ...appt, appointmentTime: newTimeSlot }
                            : appt
                    ),
                }));
                setOpenRescheduleModal(false);
            }
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
        }
    };

    const handleConfirmCancelAppointment = async () => {
        try {
            await api.patch(`/appointments/cancel/${appointmentToCancel.id}`, {
                status: "Cancelled",
            });
            setAppointments((prevAppointments) => ({
                ...prevAppointments,
                today: prevAppointments.today.filter(app => app.id !== appointmentToCancel.id),
                upcoming: prevAppointments.upcoming.filter(app => app.id !== appointmentToCancel.id),
                previous: prevAppointments.previous.filter(app => app.id !== appointmentToCancel.id),
                canceled: [...prevAppointments.canceled, { ...appointmentToCancel, status: "Cancelled" }]
            }));
        } catch (error) {
            console.error("Error cancelling the appointment:", error);
        } finally {
            setOpenPaymentReturnModal(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg  m-6 ">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-8  font-semibold text-gray-500">
                    {['Today Appointment', 'Upcoming Appointment', 'Previous Appointment', 'Cancel Appointment'].map((tab) => (
                        <button
                            key={tab}
                            className={`pb-2 ${activeTab === tab ? 'text-customBlue border-b-2 border-customBlue' : 'text-gray-400'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-4 ">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Quick Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-100 focus:outline-none w-full"
                        />
                    </div>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="bg-white border border-gray-300 text-sm text-gray-600 px-4 py-2 rounded-md z-10"
                        placeholderText="Any Date"
                        isClearable
                    />
                    <button
                        className="bg-customBlue text-sm text-white px-4 py-2 rounded-md flex items-center"
                        onClick={() => navigate('/doctor/appointment-timeslot')}
                    >
                        <FaCalendarCheck className='me-2' />
                        Appointment Time Slot
                    </button>
                </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto custom-scroll h-full">
                <table className="w-full bg-white rounded-lg overflow-hidden ">
                    <thead className="sticky top-0 bg-gray-100 z-1  ">
                        <tr>
                            <th className="p-3 text-left  font-semibold">Patient Name</th>
                            <th className="p-3 text-left  font-semibold">Disease Name</th>
                            <th className="p-3 text-left  font-semibold">Patient Issue</th>
                            <th className="p-3 text-left  font-semibold">Appointment Date</th>
                            <th className="p-3 text-left  font-semibold">Appointment Time</th>
                            <th className="p-3 text-left  font-semibold">Appointment Type</th>
                            <th className="p-3 text-left  font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3 text-gray-500 font-medium">{appointment.patientName}</td>
                                    <td className="p-3 text-gray-500 font-medium">{appointment.diseaseName}</td>
                                    <td className="p-3 text-gray-500 font-medium">{appointment.patientIssue}</td>
                                    <td className="p-3 text-gray-500 font-medium ">{moment(appointment.appointmentDate).format('D, MMM YYYY')}</td>
                                    <td className="p-3 text-gray-500 font-medium ">
                                        <span className='py-1 px-3  text-sm font-medium rounded-full bg-blue-100 text-blue-600'>{appointment.appointmentTime}</span></td>
                                    <td className="p-3 ">
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.appointmentType === 'Online' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {appointment.appointmentType}
                                        </span>
                                    </td>
                                    <td className="p-3 flex space-x-2 items-center align-middle">
                                        {/* Cancel Appointment */}
                                        <button onClick={() => handleOpenCancelAppointmentModal(appointment)} className="text-red-500 bg-gray-100 p-2 rounded">
                                            <FaCalendarTimes className="text-xl" />
                                        </button>

                                        {/* Reschedule Appointment */}
                                        <Link to='/doctor/edit-appointment'>
                                            <button className="text-blue-600 flex items-center bg-gray-100 p-2 rounded">
                                                <FaCalendarCheck className="text-xl" />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-16 ">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={noRecordImage}
                                            alt="No Doctor Found"
                                            className="w-96 mb-4"
                                        />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <CancelAppointmentModal
               open={openCancelAppointmentModal}
               onClose={() => setOpenCancelAppointmentModal(false)}
               onProceed={() => {
                   setOpenCancelAppointmentModal(false);
                   setOpenPaymentReturnModal(true); // Open Payment Return Modal when proceeding
               }}
            />

            <PaymentReturnModal
                open={openPaymentReturnModal}
                onClose={() => setOpenPaymentReturnModal(false)}
                onConfirm={handleConfirmPaymentReturn}
            />

            <SuccessModal
                open={openSuccessModal}
                onClose={() => setOpenSuccessModal(false)}
            />

            {/* Reschedule Modal */}
            <RescheduleAppointmentModal
                open={openRescheduleModal}
                onClose={() => setOpenRescheduleModal(false)}
                appointment={appointmentToReschedule}
                timeSlots={timeSlots}
                onSave={handleSaveReschedule}
            />
        </div>
    );
};

export default AppointmentManagement;
