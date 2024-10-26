import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api"; // Adjust the path according to your project structure
import { FaSearch, FaEye } from 'react-icons/fa'; // Replacing Material UI Icons with FontAwesome

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        // Decode token to get the doctor ID
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        // Fetch appointments associated with this doctor
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const allAppointments = response.data.data || [];

        // Filter for only the completed appointments of the logged-in doctor
        const completedAppointments = allAppointments.filter(appointment => {
          return appointment.doctorId === doctorId && appointment.status === 'Completed';
        });

        console.log('Filtered completed appointments:', completedAppointments); // Debugging
        setAppointments(completedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter patients based on search term
  const filteredPatients = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (appointment.patientIssue && appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Completed Appointments</h2>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Table of Completed Appointments */}
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Age</th>
              <th className="p-3 text-left text-sm font-semibold">Gender</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((appointment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{appointment.patientName}</td>
                  <td className="p-3">{appointment.diseaseName}</td>
                  <td className="p-3">{appointment.patientIssue}</td>
                  <td className="p-3">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td className="p-3 text-blue-600">{appointment.appointmentTime}</td>
                  <td className="p-3">{appointment.patientAge} Years</td>
                  <td className="p-3">
                    <span className={appointment.patientGender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                      {appointment.patientGender === 'Male' ? '♂' : '♀'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/doctor/patient-detail/${appointment.patientId}`)}
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No completed appointments found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecordAccess;
