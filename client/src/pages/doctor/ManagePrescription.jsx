import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa'; // Eye icon for visibility
import { FaMale, FaFemale } from 'react-icons/fa'; // Male and Female icons
import api from "../../api/api"; // Assuming api.js is set up with the Axios instance
import PrescriptionModal from '../../components/Doctor/PrescriptionModal.jsx';

const ManagePrescription = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [todayPrescriptions, setTodayPrescriptions] = useState([]);
  const [olderPrescriptions, setOlderPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get('/prescription');
        const prescriptions = response.data.prescriptions;
        console.log(prescriptions)

        const today = new Date().setHours(0, 0, 0, 0);
        const todayData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) === today
        );
        const olderData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) < today
        );

        setTodayPrescriptions(todayData);
        setOlderPrescriptions(olderData);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleModalOpen = (prescriptionId) => {
    const prescription = todayPrescriptions.find((pres) => pres._id === prescriptionId) 
                      || olderPrescriptions.find((pres) => pres._id === prescriptionId);

    if (prescription) {
      setSelectedPrescription(prescription);
      setModalOpen(true);
    } else {
      console.error('Prescription not found.');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  const currentPrescriptions = activeTab === 0 ? todayPrescriptions : olderPrescriptions;

  const filteredPrescriptions = currentPrescriptions.filter(
    (prescription) =>
      prescription.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.phoneNumber.includes(searchTerm) ||
      prescription.patient.age.toString().includes(searchTerm)
  );

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      {/* Tabs */}
      <div className="flex border-b-2 mb-4">
        <button
          className={`px-4 py-2 outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab(0)}
        >
          Today's Prescriptions
        </button>
        <button
          className={`px-4 py-2 outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab(1)}
        >
          Older Prescriptions
        </button>
      </div>

      {/* Search Field */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Search Patient"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left font-semibold">Patient Name</th>
              <th className="p-4 text-left font-semibold">Phone Number</th>
              <th className="p-4 text-left font-semibold">Appointment Date</th>
              <th className="p-4 text-left font-semibold">Appointment Time</th>
              <th className="p-4 text-left font-semibold">Age</th>
              <th className="p-4 text-left font-semibold">Gender</th>
              <th className="p-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{prescription.patient.firstName} {prescription.patient.lastName}</td>
                <td className="p-4">{prescription.patient.phoneNumber}</td>
                <td className="p-4">{new Date(prescription.appointmentId.appointmentDate).toLocaleDateString()}</td>
                <td className="p-4">{prescription.appointmentId.appointmentTime}</td>
                <td className="p-4">{prescription.patient.age}</td>
                <td className="p-4">
                  {prescription.patient.gender === 'Male' ? (
                    <FaMale className="h-5 w-5 text-blue-500 inline" />
                  ) : (
                    <FaFemale className="h-5 w-5 text-red-500 inline" />
                  )}
                </td>
                <td className="p-4">
                  <button onClick={() => handleModalOpen(prescription._id)} className="text-blue-500 hover:text-blue-700">
                    <FaEye className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prescription Modal */}
      {selectedPrescription && (
        <PrescriptionModal
          open={modalOpen}
          handleClose={handleModalClose}
          prescriptionData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default ManagePrescription;
