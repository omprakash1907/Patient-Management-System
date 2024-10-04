import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import ProfileCard from "../../components/ProfileCard";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfileHeader from "../../components/ProfileHeader";
import { FiEdit } from "react-icons/fi"; // Importing the Edit Icon

const DoctorProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [formData, setFormData] = useState({
    firstName: "Lincoln",
    lastName: "Philips",
    email: "Lincon@gmail.com",
    phoneNumber: "99130 53222",
    hospitalName: "Silver Park Medical Center",
    gender: "Male",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    setIsEditing(false); // Go back to the profile view after saving
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enter edit mode
  };

  const sections = {
    profile: isEditing ? (
      <ProfileForm
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    ) : (
      <div className="w-3/4 pl-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Profile</h3>
          <button
            onClick={handleEditClick}
            className="px-6 py-2 rounded bg-blue-500 text-white flex items-center"
          >
            <FiEdit className="mr-2" />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              First Name
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.firstName}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Last Name
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.lastName}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Email Address
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.email}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Phone Number
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.phoneNumber}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Hospital Name
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.hospitalName}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Gender
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.gender}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              City
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.city}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              State
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.state}
            </p>
          </div>
          <div className="relative mb-4">
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3">
              Country
            </label>
            <p
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
            >
              {formData.country}
            </p>
          </div>
        </div>
      </div>
    ),
    password: (
      <ProfileCard
        title="Change Password"
        content={<p>To change your password, fill in the fields below:</p>}
      />
    ),
    terms: <ProfileCard title="Terms & Condition" content="Lorem ipsum..." />,
    privacy: <ProfileCard title="Privacy Policy" content="Lorem ipsum..." />,
  };

  return (
    <div className="relative py-16 px-24">
      <ProfileHeader title="Profile Setting" />
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex mt-8">
        <ProfileSidebar
          name="Lincoln Philips"
          image="https://via.placeholder.com/150"
          setActiveSection={setActiveSection}
          isEditing={isEditing} // Pass the editing state
        />
        {sections[activeSection]}
      </div>
    </div>
  );
};

export default DoctorProfile;
