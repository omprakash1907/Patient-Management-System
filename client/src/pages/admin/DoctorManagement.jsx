import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DoctorOffCanvas from "../../components/Admin/DoctorOffCanvas";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Marcus Philips",
      gender: "Male",
      qualification: "MBBS",
      specialty: "Internal Medicine",
      workingTime: "6 Hour",
      checkUpTime: "4 Hour",
      breakTime: "1 Hour",
    },
    {
      id: 2,
      name: "Dr. Haylie Schleifer",
      gender: "Female",
      qualification: "BDS",
      specialty: "Anesthesiology",
      workingTime: "5 Hour",
      checkUpTime: "4 Hour",
      breakTime: "2 Hour",
    },
    {
      id: 3,
      name: "Dr. Roger Carder",
      gender: "Male",
      qualification: "B.U.M.S.",
      specialty: "Surgery",
      workingTime: "8 Hour",
      checkUpTime: "5 Hour",
      breakTime: "2 Hour",
    },
    {
      id: 4,
      name: "Dr. Wilson Culhane",
      gender: "Male",
      qualification: "MBBS",
      specialty: "Physical Therapy",
      workingTime: "2 Hour",
      checkUpTime: "1 Hour",
      breakTime: "1 Hour",
    },
    {
      id: 5,
      name: "Dr. Jaxon Levin",
      gender: "Male",
      qualification: "M.D.",
      specialty: "Psychiatry",
      workingTime: "3 Hour",
      checkUpTime: "2 Hour",
      breakTime: "1 Hour",
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const handleViewClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Doctor Management</h2>
          <Link
            to="add-doctor"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Doctor
          </Link>
        </div>

        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Qualification
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Working Time
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Patient Check Up Time
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Break Time
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-b">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Doctor"
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{doctor.name}</span>
                </td>
                <td className="px-6 py-4">{doctor.gender}</td>
                <td className="px-6 py-4">{doctor.qualification}</td>
                <td className="px-6 py-4">{doctor.specialty}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {doctor.workingTime}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {doctor.checkUpTime}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {doctor.breakTime}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-4 flex items-center justify-center">
                  <button
                    onClick={() => handleViewClick(doctor)}
                    className="text-blue-500 hover:text-blue-600"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <Link
                    to={`/admin/doctor-management/edit/${doctor.id}`}
                    className="text-green-500 hover:text-green-600 mx-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => console.log("Delete doctor:", doctor.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OffCanvas Component */}
      <DoctorOffCanvas
        doctor={selectedDoctor}
        isOpen={isOffCanvasOpen}
        onClose={handleCloseOffCanvas}
      />
    </div>
  );
};

export default DoctorManagement;
