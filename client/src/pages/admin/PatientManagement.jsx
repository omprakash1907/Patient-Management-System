import React, { useEffect, useState } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import api from '../../api/api';
import PatientDetailModal from './PatientDetailModal';
import noRecordImage from "../../assets/images/nodoctor.png";

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all appointments based on active tab
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setAppointments(response.data.data);
        filterAppointments(response.data.data, activeTab, searchTerm);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [activeTab]);

  // Filter appointments by active tab and search term
  const filterAppointments = (appointmentsList, tab, search) => {
    const filteredList = appointmentsList
      .filter((appointment) => {
        const today = new Date().toISOString().split('T')[0];
        const appointmentDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];

        if (tab === 'today') {
          return appointmentDate === today;
        } else if (tab === 'upcoming') {
          return new Date(appointment.appointmentDate) > new Date(today);
        } else if (tab === 'previous') {
          return new Date(appointment.appointmentDate) < new Date(today);
        } else if (tab === 'cancel') {
          return appointment.status === 'Cancelled';
        }
        return true;
      })
      .filter((appointment) => 
        appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
        appointment.patientIssue.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredAppointments(filteredList);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterAppointments(appointments, tab, searchTerm);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    filterAppointments(appointments, activeTab, searchValue);
  };

  // Handle view details button click
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-4 rounded-lg h-full">
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          {['today', 'upcoming', 'previous', 'cancel'].map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 font-semibold ${activeTab === tab ? 'border-b-2 border-customBlue text-customBlue' : 'text-gray-700'}`}
              onClick={() => handleTabChange(tab)}
            >
              {`${tab.charAt(0).toUpperCase()}${tab.slice(1)} Appointment`}
            </button>
          ))}
        </div>

        {/* Header and Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Patient Management</h2>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by patient name or issue"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-100 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Patient Table */}
        <table className="w-full bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Patient Name</th>
              <th className="px-6 py-3 text-left">Patient Issue</th>
              <th className="px-6 py-3 text-left">Doctor Name</th>
              <th className="px-6 py-3 text-left">Disease Name</th>
              <th className="px-6 py-3 text-left">Appointment Time</th>
              <th className="px-6 py-3 text-left">Appointment Type</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tbody>
                <tr key={appointment.id} className="border-b">
                  <td className="px-6 py-4">{appointment.patientName}</td>
                  <td className="px-6 py-4">{appointment.patientIssue}</td>
                  <td className="px-6 py-4">{appointment.doctorName}</td>
                  <td className="px-6 py-4">{appointment.diseaseName}</td>
                  <td className="px-6 py-4">{appointment.appointmentTime}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full ${appointment.appointmentType === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {appointment.appointmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleViewDetails(appointment)} className="text-customBlue" title="View">
                      <FaEye />
                    </button>
                  </td>
                </tr>
     </tbody>
              ))
            ) : (
              <tbody>
              <tr>
                <td colSpan="8" className="text-center py-16">
                  <div className="flex flex-col items-center">
                    <img
                      src={noRecordImage}
                      alt="No Doctor Found"
                      className="w-96 mb-4"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
            )}
        </table>
      </div>

      {/* Patient Details Modal */}
      {isModalOpen && (
        <PatientDetailModal patient={selectedPatient} onClose={closeModal} />
      )}
    </div>
  );
};

export default PatientManagement;
