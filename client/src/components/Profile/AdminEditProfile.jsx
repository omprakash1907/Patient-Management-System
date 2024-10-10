import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import { FiCamera } from "react-icons/fi";
import ProfileHeader from "../ProfileHeader";
import { Link, useNavigate } from "react-router-dom";

const AdminEditProfile = ({ onCancel }) => {
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode for testing
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({});

  const fileInputRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/profile");
        setProfileData(response.data);
        setFormData(response.data); // prefill the form with user data
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      await api.patch("/profile", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      navigate("/admin/profile-setting");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="relative bg-gray-100  py-16 px-36 pb-48 h-full">
      {/* Header */}
      <ProfileHeader title="Profile Setting" />
      <div className="flex flex-col md:flex-row w-full mt-8  mx-auto bg-white shadow-lg rounded-lg overflow-hidden z-10 relative h-full">
        <div className="w-1/4 p-6 text-center">
          <img
            src={user}
            alt="Profile"
            className="w-48 h-48 mx-auto rounded-full mb-4"
          />
          <div className="flex justify-center mb-">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200">
              <FiCamera className="text-gray-500" />
              <span>Change Profile</span>
            </button>
          </div>
        </div>
        <div className="w-3/4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">
              {isEditing ? "Edit Profile" : "Profile"}
            </h3>
          </div>

          <form className="grid grid-cols-3 gap-4">
            {[
              "First Name",
              "Last Name",
              "Email Address",
              "Phone Number",
              "Hospital Name",
              "Gender",
              "City",
              "State",
              "Country",
            ].map((field, index) => (
              <div key={index} className="relative mb-4">
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    defaultValue={
                      field === "First Name"
                        ? "Lincoln"
                        : field === "Last Name"
                        ? "Philips"
                        : field === "Email Address"
                        ? "lincoln@gmail.com"
                        : field === "Phone Number"
                        ? "99130 53222"
                        : field === "Hospital Name"
                        ? "Silver Park Medical Center"
                        : field === "Gender"
                        ? "Male"
                        : field === "City"
                        ? "Ahmedabad"
                        : field === "State"
                        ? "Gujarat"
                        : field === "Country"
                        ? "India"
                        : ""
                    }
                  >
                    <option>{field}</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    defaultValue={
                      field === "First Name"
                        ? "Lincoln"
                        : field === "Last Name"
                        ? "Philips"
                        : field === "Email Address"
                        ? "lincoln@gmail.com"
                        : field === "Phone Number"
                        ? "99130 53222"
                        : field === "Hospital Name"
                        ? "Silver Park Medical Center"
                        : field === "Gender"
                        ? "Male"
                        : field === "City"
                        ? "Ahmedabad"
                        : field === "State"
                        ? "Gujarat"
                        : field === "Country"
                        ? "India"
                        : ""
                    }
                    disabled={!isEditing}
                  />
                )}
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                  {field} <span className="text-red-500">*</span>
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProfile;
