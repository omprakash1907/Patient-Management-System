import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    password: "", // New password field
  });

  console.log(formData)

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSignatureUpload = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePhoto) data.append("profileImage", profilePhoto);
    if (signature) data.append("signatureImage", signature);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/users/add-doctor",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Server error:", error);
        alert(`Error: ${error.message}`);
        return;
      }

      const result = await response.json();
      console.log("Doctor added:", result);
      alert("Doctor added successfully");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col w-full px-4 py-4 bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg px-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

          <div className="flex justify-between gap-8">
            <div className="flex flex-col w-1/6">
              <div className="relative mb-4 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={URL.createObjectURL(profilePhoto)} alt="Profile" className="rounded-full w-full h-full" />
                  ) : (
                    <AiOutlineCamera className="text-gray-400 text-3xl" />
                  )}
                </div>
                <label className="mt-2 text-blue-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="profile"
                    onChange={handlePhotoUpload}
                  />
                  Choose Photo
                </label>
              </div>

              <div className="mb-4">
                <label className="text-gray-700 text-sm font-medium">Upload Signature</label>
                <div className="flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-10 w-full mt-2">
                  <div className="flex align-middle justify-center">
                    <FiUpload className="text-gray-500 text-2xl" />
                  </div>
                  <div className="text-center">
                    <label className="text-blue-500 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="signature"
                        onChange={handleSignatureUpload}
                      />
                      Upload a file
                    </label>
                    <p className="text-xs text-gray-400">PNG Up To 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-10/12 grid grid-cols-3 gap-4">
              <InputField id="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} />
              <InputField id="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} />
              <InputField id="doctorQualification" label="Doctor Qualification" value={formData.doctorQualification} onChange={handleInputChange} />
              <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
              <SelectField id="gender" label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleInputChange} />
              <SelectField id="workOn" label="Work On" options={["Online", "Onsite", "Both"]} value={formData.workOn} onChange={handleInputChange} />
              <InputField id="specialtyType" label="Specialty Type" value={formData.specialtyType} onChange={handleInputChange} />
              <InputFieldWithIcon id="workingTime" label="Working Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.workingTime} onChange={handleInputChange} />
              <InputFieldWithIcon id="checkUpTime" label="Check-Up Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.checkUpTime} onChange={handleInputChange} />
              <InputFieldWithIcon id="breakTime" label="Break Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.breakTime} onChange={handleInputChange} />
              <InputField id="experience" label="Experience" value={formData.experience} onChange={handleInputChange} />
              <InputField id="age" label="Age" value={formData.age} onChange={handleInputChange} />
              <InputField id="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
              <InputField id="doctorEmail" label="Doctor Email" type="email" value={formData.doctorEmail} onChange={handleInputChange} />
              <SelectField id="country" label="Country" options={["India", "USA"]} value={formData.country} onChange={handleInputChange} />
              <SelectField id="state" label="State" options={["Gujarat", "New York"]} value={formData.state} onChange={handleInputChange} />
              <SelectField id="city" label="City" options={["Surat", "Celifonia"]} value={formData.city} onChange={handleInputChange} />
              <InputField id="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleInputChange} />
              <InputField id="doctorAddress" label="Doctor Address" value={formData.doctorAddress} onChange={handleInputChange} />
              <InputField id="description" label="Description" value={formData.description} onChange={handleInputChange} />
              <InputField id="onlineConsultationRate" label="Online Consultation Rate" placeholder="₹ 0000" value={formData.onlineConsultationRate} onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <InputField id="doctorCurrentHospital" label="Doctor Current Hospital" value={formData.doctorCurrentHospital} onChange={handleInputChange} />
            <InputField id="hospitalName" label="Hospital Name" value={formData.hospitalName} onChange={handleInputChange} />
            <InputField id="hospitalAddress" label="Hospital Address" value={formData.hospitalAddress} onChange={handleInputChange} />
            <InputField id="hospitalWebsite" label="Hospital Website Link" value={formData.hospitalWebsite} onChange={handleInputChange} />
            <InputField id="emergencyContact" label="Emergency Contact Number" value={formData.emergencyContact} onChange={handleInputChange} />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// InputField component
const InputField = ({ id, label, type = "text", placeholder = "", value, onChange }) => (
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
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">
      {label}
    </label>
  </div>
);

// SelectField component
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
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">
      {label}
    </label>
  </div>
);

// InputFieldWithIcon component
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
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">
      {label}
    </label>
    {icon}
  </div>
);

export default AddDoctor;
