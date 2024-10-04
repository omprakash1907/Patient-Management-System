import React from 'react';
import { FiEdit } from 'react-icons/fi';

const PatientProfile = () => {
  return (
    <div className="relative p-8">
      {/* Gradient Background Header */}
      <div
        className="absolute top-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)',
        }}
      />

      {/* Profile Content */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex" style={{ marginTop: '6rem' }}>
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center w-1/4 border-r pr-8">
          <div className="relative w-32 h-32 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1">
              <FiEdit />
            </button>
          </div>
          <h3 className="text-lg font-medium">Marcus Philips</h3>
          <button className="text-blue-500 hover:underline mt-2">
            Change Profile
          </button>
        </div>

        {/* Right Side: Editable Profile Form */}
        <div className="w-3/4 pl-8">
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Form Fields */}
            <div className="col-span-1">
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="Marcus Philips"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600">Number</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="99130 44537"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="John@gmail.com"
              />
            </div>
            {/* Gender */}
            <div className="col-span-1">
              <label className="block text-gray-600">Gender</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="Male"
              />
            </div>

            {/* DOB */}
            <div className="col-span-1">
              <label className="block text-gray-600">DOB</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="2 Jan, 2022"
              />
            </div>

            {/* Age */}
            <div className="col-span-1">
              <label className="block text-gray-600">Age</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="20 Years"
              />
            </div>

            {/* Blood Group */}
            <div className="col-span-1">
              <label className="block text-gray-600">Blood Group</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="B+"
              >
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>

            {/* Height */}
            <div className="col-span-1">
              <label className="block text-gray-600">Height (Cm)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="160"
              />
            </div>

            {/* Weight */}
            <div className="col-span-1">
              <label className="block text-gray-600">Weight (Kg)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="50"
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-gray-600">Country</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="India"
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-gray-600">State</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="Gujarat"
              />
            </div>

            {/* City */}
            <div className="col-span-1">
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="Ahmedabad"
              />
            </div>

            {/* Address */}
            <div className="col-span-3">
              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue="B-408 Swastik society, mota varacha rajkot."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 rounded bg-gray-200 text-gray-700">Cancel</button>
            <button className="px-6 py-2 rounded bg-blue-500 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
