import React from "react";
import { FaTimes } from "react-icons/fa";

const PatientDetailModal = ({ patient, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 px-6 w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold ">Patient Details</h3>
          <button className=" rounded-full bg-red-500 p-1 text-white" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ul className="space-y-2 ">
          <li className="flex justify-between py-1">
            <strong>Appointment Type</strong><span className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-600">{patient.type}</span> 
          </li>
          <li className="flex justify-between py-1">
            <strong>Patient Name</strong> {patient.name}
          </li>
          <li className="flex justify-between py-1">
            <strong>Patient Issue</strong> {patient.issue}
          </li>
          <li className="flex justify-between py-1">
            <strong>Doctor Name</strong> {patient.doctor}
          </li>
          <li className="flex justify-between py-1">
            <strong>Disease Name</strong> {patient.disease}
          </li>
          <li className="flex justify-between py-1">
            <strong>Appointment Time</strong> {patient.time}
          </li>
          <li className="flex justify-between py-1">
            <strong>Patient Address</strong> 123 Main St, City
          </li>
          {/* Add more details as necessary */}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetailModal;
