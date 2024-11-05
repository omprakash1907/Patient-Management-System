import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import api from "../../api/api";
import Swal from "sweetalert2";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PatientEditProfile = () => {
  const [hasError, setHasError] = useState(false);
  const { updateBreadcrumb } = useBreadcrumb();
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
    bloodGroup: "",
    height: "",
    weight: "",
    country: "",
    state: "",
    city: "",
    address: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    updateBreadcrumb([
      { label: "Profile Setting", path: "/patient/edit-patient-profile" },
    ]);

    const fetchProfile = async (attempt = 0, maxAttempts = 3) => {
      try {
        const response = await api.get("/users/profile");
        const patient = response.data;
        setFormData({
          firstName: patient.firstName,
          lastName: patient.lastName,
          number: patient.phoneNumber,
          email: patient.email,
          gender: patient.gender,
          dob: patient.dateOfBirth,
          age: patient.age,
          bloodGroup: patient.bloodGroup,
          height: patient.height,
          weight: patient.weight,
          country: patient.country,
          state: patient.state,
          city: patient.city,
          address: patient.address,
          profileImage: patient.profileImage,
        });

        setProfileImagePreview(`https://patient-management-system-1-8zui.onrender.com/${patient.profileImage}`);
      } catch (error) {
        console.error("Failed to fetch patient profile:", error);
        if (attempt < maxAttempts) {
          setTimeout(() => fetchProfile(attempt + 1), 2000);
        } else {
          alert("Failed to load profile after multiple attempts. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, profileImage: file }));
      setProfileImagePreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation for required fields
    if (!formData.firstName) validationErrors.firstName = "First name is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.number) validationErrors.number = "Phone number is required.";
    if (!formData.age) validationErrors.age = "Age is required.";
    if (!formData.height) validationErrors.height = "Height is required.";
    if (!formData.weight) validationErrors.weight = "Weight is required.";
    if (!formData.gender) validationErrors.gender = "Gender is required.";
    if (!formData.bloodGroup) validationErrors.bloodGroup = "Blood group is required.";
    if (!formData.dob) validationErrors.dob = "Date of birth is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.city) validationErrors.city = "City is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const formDataToSend = new FormData();
        // Append text fields
        Object.keys(formData).forEach((key) => {
          if (key !== "profileImage" && formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        });

        // Append profile image if selected
        if (formData.profileImage) {
          formDataToSend.append("profileImage", formData.profileImage);
        }

        await api.patch("/users/profile", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }, // Important for sending files
        });

        Swal.fire({
          icon: "success",
          title: "Profile updated successfully.",
          confirmButtonText: "OK",
        });
        navigate('/patient/patient-dashboard')
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div className="relative py-16 px-24">
      <div className="absolute top-0 left-0 right-0 h-64" style={{
        background: "linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)",
      }}
      />
      <h2 className="absolute top-12 left-18 text-3xl font-semibold text-white z-20">
        Profile Setting
      </h2>

      <div className="relative z-10 bg-white shadow-lg rounded-lg  flex mt-8">
        <div className="flex flex-col items-center w-1/5 border-r p-8">
          <div className="relative w-48 h-48 mb-4">
            <img
              src={profileImagePreview ? profileImagePreview : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-300"
            />
          </div>
          <label className="flex items-center space-x-2 font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200 cursor-pointer">
            <AiOutlineCamera/>
            <span>Change Profile</span>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="w-4/5 p-8" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "number", label: "Phone Number" },
              { name: "email", label: "Email" },
              { name: "gender", label: "Gender" },
              { name: "dob", label: "Date of Birth" },
              { name: "age", label: "Age" },
              {
                name: "bloodGroup",
                label: "Blood Group",
                type: "select",
                options: ["A+", "B+", "O+", "AB+"],
              },
              { name: "height", label: "Height (Cm)" },
              { name: "weight", label: "Weight (Kg)" },
              { name: "country", label: "Country" },
              { name: "state", label: "State" },
              { name: "city", label: "City" },
              { name: "address", label: "Address", colSpan: 2 },
            ].map(({ name, label, type = "text", options, colSpan = 1 }) => (
              <div
                key={name}
                className={`relative mb-4 ${colSpan === 3 ? "col-span-3" : ""}`}
              >
                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    className="peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none"
                    value={formData[name]}
                    onChange={handleChange}
                  >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder=" "
                    value={formData[name]}
                    onChange={handleChange}
                  />
                )}
                <label
                  htmlFor={name}
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
                >
                  {label}
                  {["firstName", "lastName", "number", "email", "age", "height", "weight", "gender", "bloodGroup", "dob", "country", "state", "city"].includes(name) && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-10 py-2 rounded-xl border text-gray-700"
              onClick={() => setFormData({})} // Clear form on cancel (optional)
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2 rounded-xl bg-customBlue text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEditProfile;