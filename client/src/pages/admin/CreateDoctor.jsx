import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorQualification: "",
    specialtyType: "",
    checkUpTime: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    onlineConsultationRate: "",
    gender: "",
    workOn: "",
    state: "",
    city: "",
    doctorAddress: "",
    description: "",
    experience: "",
    workingTime: "",
    breakTime: "",
    age: "",
    doctorEmail: "",
    hospitalName: "",
    hospitalAddress: "",
    emergencyContact: "",
    hospitalWebsite: "",
    doctorCurrentHospital: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col w-full px-4 py-4 bg-white rounded-lg shadow-md ">
        <div className="border border-gray-300 rounded-lg px-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

          {/* Flex container for Profile, Signature, and Doctor Fields */}
          <div className="flex justify-between gap-8">
            {/* Left side (Profile photo and Upload Signature) */}
            <div className="flex flex-col w-1/6">
              {/* Profile Photo */}
              <div className="relative mb-4 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                  <AiOutlineCamera className="text-gray-400 text-3xl" />
                </div>
                <label className="mt-2 text-blue-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="profile"
                    onChange={(e) => {}}
                  />
                  Choose Photo
                </label>
              </div>

              {/* Upload Signature */}
              <div className="mb-4">
                <label className="text-gray-700 text-sm font-medium">
                  Upload Signature
                </label>
                <div className=" flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-10 w-full mt-2">
                  <div className="flex align-middle justify-center">
                    <FiUpload className="text-gray-500 text-2xl" />
                  </div>
                  <div className=" text-center">
                    <label className="text-blue-500 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="signature"
                        onChange={(e) => {
                          // Handle file upload here
                        }}
                      />
                      Upload a file
                    </label>
                    <p className="text-xs text-gray-400">PNG Up To 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side (Doctor fields) */}
            <div className="w-10/12 grid grid-cols-3 gap-4">
              {/* Doctor Name */}
              <InputField
                id="doctorName"
                label="Doctor Name"
                value={formData.doctorName}
                onChange={handleChange}
              />

              {/* Doctor Qualification */}
              <InputField
                id="doctorQualification"
                label="Doctor Qualification"
                value={formData.doctorQualification}
                onChange={handleChange}
              />

              {/* Gender */}
              <SelectField
                id="gender"
                label="Gender"
                options={["Male", "Female", "Other"]}
                value={formData.gender}
                onChange={handleChange}
              />

              {/* Specialty Type */}
              <InputField
                id="specialtyType"
                label="Specialty Type"
                value={formData.specialtyType}
                onChange={handleChange}
              />

              {/* Work On */}
              <SelectField
                id="workOn"
                label="Work On"
                options={["Online", "Onsite", "Both"]}
                value={formData.workOn}
                onChange={handleChange}
              />

              {/* Working Time */}
              <InputFieldWithIcon
                id="workingTime"
                label="Working Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.workingTime}
                onChange={handleChange}
              />

              {/* Check-Up Time */}
              <InputFieldWithIcon
                id="checkUpTime"
                label="Check-Up Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.checkUpTime}
                onChange={handleChange}
              />

              {/* Break Time */}
              <InputFieldWithIcon
                id="breakTime"
                label="Break Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.breakTime}
                onChange={handleChange}
              />

              {/* Experience */}
              <InputField
                id="experience"
                label="Experience"
                value={formData.experience}
                onChange={handleChange}
              />

              {/* Age */}
              <InputField
                id="age"
                label="Age"
                value={formData.age}
                onChange={handleChange}
              />

              {/* Phone Number */}
              <InputField
                id="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              {/* Doctor Email */}
              <InputField
                id="doctorEmail"
                label="Doctor Email"
                type="email"
                value={formData.doctorEmail}
                onChange={handleChange}
              />

              {/* Country */}
              <SelectField
                id="country"
                label="Country"
                options={["India", "USA"]}
                value={formData.country}
                onChange={handleChange}
              />

              {/* State */}
              <SelectField
                id="state"
                label="State"
                options={["India", "USA"]}
                value={formData.state}
                onChange={handleChange}
              />

              {/* City */}
              <SelectField
                id="city"
                label="City"
                options={["India", "USA"]}
                value={formData.city}
                onChange={handleChange}
              />

              {/* Zip Code */}
              <InputField
                id="zipCode"
                label="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
              />

              {/* Doctor Address */}
              <InputField
                id="doctorAddress"
                label="Doctor Address"
                value={formData.doctorAddress}
                onChange={handleChange}
              />

              {/* Description */}
              <InputField
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />

              {/* Online Consultation Rate */}
              <InputField
                id="onlineConsultationRate"
                label="Online Consultation Rate"
                placeholder="₹ 0000"
                value={formData.onlineConsultationRate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Hospital fields below */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {/* Doctor Current Hospital */}
            <InputField
              id="doctorCurrentHospital"
              label="Doctor Current Hospital"
              value={formData.doctorCurrentHospital}
              onChange={handleChange}
            />

            {/* Hospital Name */}
            <InputField
              id="hospitalName"
              label="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
            />

            {/* Hospital Address */}
            <InputField
              id="hospitalAddress"
              label="Hospital Address"
              value={formData.hospitalAddress}
              onChange={handleChange}
            />

            {/* Hospital Website */}
            <InputField
              id="hospitalWebsite"
              label="Hospital Website Link"
              value={formData.hospitalWebsite}
              onChange={handleChange}
            />

            {/* Emergency Contact */}
            <InputField
              id="emergencyContact"
              label="Emergency Contact Number"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Input field component
const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => (
  <div className="relative mb-4">
    <input
      type={type}
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      placeholder={placeholder || `Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

// Select field component
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

// Input field with icon component
const InputFieldWithIcon = ({ id, label, icon, value, onChange }) => (
  <div className="relative mb-4">
    <input
      type="text"
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
    {icon}
  </div>
);

export default CreateDoctor;
