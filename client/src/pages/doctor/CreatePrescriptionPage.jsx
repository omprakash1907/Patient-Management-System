import { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api/api";
import {jwtDecode} from 'jwt-decode'; // Correct import syntax for jwtDecode
import CreatePrescription from '../../components/Doctor/CreatePrescription';
import noRecordImage from "../../assets/images/nodoctor.png";
import { useBreadcrumb } from '../../context/BreadcrumbContext';

const CreatePrescriptionPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { updateBreadcrumb } = useBreadcrumb();

    useEffect(() => {
      updateBreadcrumb([
        { label: "Prescription Tool", path: "/doctor/create-prescription" },
        { label: "Create", path: "/doctor/create-prescription" },
      ]);
    }, []);

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
          console.log("Decoded Token:", decodedToken); // Debugging log
          const doctorId = decodedToken.id;

          // Fetch all appointments
          const response = await api.get('/appointments', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log("All Appointments from API:", response.data.data); // Debugging log

          // Get appointments associated with the logged-in doctor
          const doctorAppointments = response.data.data.filter(
            appointment => appointment.doctorId === doctorId
          );

          setAppointments(doctorAppointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }, []);

    return (
        <div className="m-6 p-6 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Appointments</h1>
                <div className="flex space-x-4">
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
            {appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {appointments.map((appointment) => (
                        <CreatePrescription
                            key={appointment.id}
                            id={appointment.id}
                            patientid={appointment.patientId}
                            name={appointment.patientName}
                            age={appointment.patientAge}
                            gender={appointment.patientGender}
                            appointmentType={appointment.appointmentType}
                            time={appointment.appointmentTime}
                            status={appointment.status}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
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
