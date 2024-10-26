import { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api/api"; // Adjust the path according to your project structure
import { jwtDecode } from 'jwt-decode'; // Ensure proper import of jwtDecode
import CreatePrescription from '../../components/Doctor/CreatePrescription';
import noRecordImage from "../../assets/images/nodoctor.png";

const CreatePrescriptionPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                // Decode the token to get the doctor ID
                const decodedToken = jwtDecode(token);
                const doctorId = decodedToken.id;

                // Fetch all appointments
                const response = await api.get('/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Filter for appointments based on selected date and doctor ID
                const filteredAppointments = response.data.data.filter(appointment => {
                    const appointmentDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];
                    const selectedDateString = selectedDate.toISOString().split('T')[0];
                    return appointment.doctorId === doctorId &&
                        appointmentDate === selectedDateString &&
                        appointment.status !== 'Completed';
                });

                setAppointments(filteredAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [selectedDate]);

    // Filter appointments based on search term
    const filteredAppointments = appointments.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="m-6 p-6 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Today's Appointments</h1>
                <div className="flex space-x-4">
                    {/* Search Bar */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Patient"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="d MMMM, yyyy"
                            className="bg-transparent focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Appointments Grid */}
            {/* Appointments Grid */}
            {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAppointments.map((appointment) => (
                        <CreatePrescription
                            key={appointment.id}
                            id={appointment.id}
                            patientid={appointment.patientId}
                            name={appointment.patientName}
                            age={appointment.patientAge}
                            gender={appointment.patientGender}
                            appointmentType={appointment.appointmentType}
                            time={appointment.appointmentTime}
                            status={appointment.status} // Pass the status to the component
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full ">
                    <img
                        src={noRecordImage}
                        alt="No Doctor Found"
                        className="mb-4 max-w-full"
                    />
                </div>
            )}


        </div>
    );
};

export default CreatePrescriptionPage;
