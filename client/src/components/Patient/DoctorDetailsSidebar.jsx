import React from "react";
import { FaMale, FaTimes } from "react-icons/fa";
import mask from "../../assets/images/offcanvas.png";
import user from "../../assets/images/user.png";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMale } from 'react-icons/io5';

const DoctorDetailsSidebar = ({ doctor, isVisible, onClose }) => {
  console.log(doctor)
  return (
    <div
      className={`fixed inset-y-0 right-0 w-1/4 bg-white  transform ${isVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 ">
        <AiOutlineLeft onClick={onClose} />
        <h2 className="text-xl font-semibold"> Doctor Management</h2>
      </div>

      {/* Sidebar Body */}
      <div className="relative p-6 bg-white w-full">
        {/* Doctor Details */}
        <div className="relative z-10 px-4 py-2 bg-gradient-to-br from-[#4C49ED] to-[#020067]  rounded-lg shadow-lg mb-6">
          <div className="flex items-center my-2">
            <img
              src={user}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {doctor.doctorName}
              </h3>
              <div className="block">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm flex items-center">
                  <IoMale size={16} className="mr-2"/>Male
                </span>
              </div>
            </div>
          </div>
          {/* Background Image and Overlay */}
          <img
            src={mask}
            alt="Background"
            className="absolute top-0 right-0 h-full opacity-70 z-0"
          />
        </div>

        {/* Doctor Details Information */}
        <div className="relative z-10 text-gray-700 bg-gray-50 p-4 rounded-xl w-full">
          {/* First 3 rows with two columns */}
          <div className="grid grid-cols-1 gap-4">
            <p className="flex">
              <strong className="text-gray-500">Hospital Name :</strong>{" "}
              <span className="block ml-2">{doctor.hospitalName}</span>
            </p>
            <p className="flex">
              <strong className="text-gray-500">Doctor Qualification :</strong>{" "}
              <span className="block ml-2">{doctor.doctorQualification}</span>
            </p>

            <p className="flex">
              <strong className="text-gray-500">Years Of Experience :</strong>{" "}
              <span className="block ml-2">{doctor.doctorExperience}+</span>
            </p>
            <p className="flex">
              <strong className="text-gray-500">
                Emergency Contact Number :
              </strong>{" "}
              <span className="block ml-2">{doctor.contactNumber}9913138325</span>
            </p>
          </div>

          {/* Last 2 rows with single column */}
          <div className="mt-4 space-y-3">
            <p>
              <strong className="text-gray-500">Specialty Type : </strong>{" "}
              {doctor.doctorSpecialty}
            </p>
            <p className="flex">
              <strong className="text-gray-500">Description : </strong>{" "}
              <span className="block ml-2">Lorem ipsum..</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsSidebar;
