import React from "react";
import { FaTimes } from "react-icons/fa";

const PatientDetailModal = ({ patient, onClose }) => {
  if (!patient) return null; // Prevents rendering if no patient data is provided

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 px-6 w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Patient Details</h3>
          <button className="rounded-full bg-red-500 p-1 text-white" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between py-1">
            <strong>Appointment Type</strong>
            <span className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-600">{patient.appointmentType}</span> 
          </li>
          <li className="flex justify-between py-1">
            <strong>Patient Name</strong> 
            <span>{patient.patientName || 'N/A'}</span>
          </li>
          <li className="flex justify-between py-1">
            <strong>Patient Issue</strong> 
            <span>{patient.patientIssue || 'N/A'}</span>
          </li>
          <li className="flex justify-between py-1">
            <strong>Doctor Name</strong> 
            <span>{patient.doctorName || 'N/A'}</span>
          </li>
          <li className="flex justify-between py-1">
            <strong>Disease Name</strong> 
            <span>{patient.diseaseName || 'N/A'}</span>
          </li>
          <li className="flex justify-between py-1">
            <strong>Appointment Time</strong> 
            <span>{patient.appointmentTime || 'N/A'}</span>
          </li>
          <li className=" py-1">
            <strong className="block">Patient Address</strong> 
            <span>{patient.patientAddress || 'N/A'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDetailModal;
