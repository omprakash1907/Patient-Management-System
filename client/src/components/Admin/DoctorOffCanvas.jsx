import React from "react";
import { FaTimes } from "react-icons/fa";
import mask from "../../assets/images/offcanvas.png";
import userImage from "../../assets/images/user.png";
import { AiOutlineLeft } from "react-icons/ai";

const DoctorOffCanvas = ({ doctor, isOpen, onClose }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div className="w-1/4 bg-white p-6 h-full overflow-y-auto">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <AiOutlineLeft onClick={onClose}/>
          <h2 className="text-xl font-semibold">Doctor Management</h2>
        </div>

        {/* Doctor Details Card */}
        <div className="relative p-4 bg-gradient-to-br from-[#4C49ED] to-[#020067] rounded-lg shadow-lg mb-6">
          <div className="flex items-center mb-4">
            <img
              src={doctor.profileImage ? `https://patient-management-system-1-8zui.onrender.com/${doctor.profileImage}` : userImage}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-white pb-2">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
                  {doctor.gender}
                </span>
              
              </div>
            </div>
          </div>
          <img
            src={mask}
            alt="Background"
            className="absolute top-0 right-0 h-full opacity-25 z-0"
          />
        </div>

        {/* Doctor Details Information */}
        <div className="relative z-10 text-gray-700 bg-gray-50 p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-500">Doctor Qualification:</strong>
              <span className="block">{doctor.doctorDetails.qualification || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Years Of Experience:</strong>
              <span className="block">{doctor.doctorDetails.experience} Years</span>
            </p>
            <p>
              <strong className="text-gray-500">Specialty Type:</strong>
              <span className="block">{doctor.doctorDetails.specialtyType || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Working Time:</strong>
              <span className="block">{doctor.doctorDetails.workingHours.workingTime || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Patient Check-Up Time:</strong>
              <span className="block">{doctor.doctorDetails.workingHours.checkupTime || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Break Time:</strong>
              <span className="block">{doctor.doctorDetails.workingHours.breakTime || "N/A"}</span>
            </p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <strong className="text-gray-500">Description:</strong>
            <p className="mt-1">{doctor.doctorDetails.description || "No description provided"}</p>
          </div>

          {/* Signature */}
          <div className="mt-4">
            <strong className="text-gray-500 font-semibold pb-2">Signature:</strong>
            <img
              src={doctor.signatureImage ? `https://patient-management-system-1-8zui.onrender.com/${doctor.signatureImage}` : ""}
              alt="Doctor Signature"
              className="w-full h-24 object-contain bg-white rounded border-gray-200"
            />
          </div>

          {/* Contact and Additional Information */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <p>
              <strong className="text-gray-500">Age:</strong>
              <span className="block">{doctor.age || "N/A"} Years</span>
            </p>
            <p>
              <strong className="text-gray-500">Email:</strong>
              <span className="block">{doctor.email || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Phone:</strong>
              <span className="block">{doctor.phoneNumber || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Online Consultation Rate:</strong>
              <span className="block">₹ {doctor.doctorDetails.onlineConsultationRate || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Country:</strong>
              <span className="block">{doctor.country || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">State:</strong>
              <span className="block">{doctor.state || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">City:</strong>
              <span className="block">{doctor.city || "N/A"}</span>
            </p>
            <p>
              <strong className="text-gray-500">Hospital Address:</strong>
              <span className="block">{doctor.doctorDetails.hospital.hospitalAddress || "N/A"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOffCanvas;
