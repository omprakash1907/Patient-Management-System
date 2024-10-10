import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import PatientDetailModal from './PatientDetailModal'; // The modal component

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const patients = [
    { id: 1, name: 'Marcus Phillips', issue: 'Stomach Ache', doctor: 'Dr. Mathew Best', disease: 'Viral Infection', time: '4:30 PM', type: 'Online' },
    { id: 2, name: 'London Shaffer', issue: 'Feeling Tired', doctor: 'Dr. Annabella Porter', disease: 'Blood Pressure', time: '5:00 AM', type: 'Onsite' },
    // Add more dummy patients...
  ];

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-4 rounded-lg h-full">
        <h2 className="text-2xl font-semibold mb-4">Patient Management</h2>
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          {['Today Appointment', 'Upcoming Appointment', 'Previous Appointment', 'Cancel Appointment'].map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 font-semibold ${activeTab === tab.toLowerCase() ? 'border-b-2 border-customBlue text-customBlue' : ' text-gray-700'}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Patient Table */}
        <table className="w-full bg-white  rounded-lg">
          <thead className='bg-gray-100'>
            <tr >
              <th className="px-6 py-3 text-left">Patient Name</th>
              <th className="px-6 py-3 text-left">Patient Issue</th>
              <th className="px-6 py-3 text-left">Doctor Name</th>
              <th className="px-6 py-3 text-left">Disease Name</th>
              <th className="px-6 py-3 text-left">Appointment Time</th>
              <th className="px-6 py-3 text-left">Appointment Type</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4">{patient.issue}</td>
                <td className="px-6 py-4">{patient.doctor}</td>
                <td className="px-6 py-4">{patient.disease}</td>
                <td className="px-6 py-4">{patient.time}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full ${patient.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {patient.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleViewDetails(patient)} className="text-customBlue " title="View">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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

