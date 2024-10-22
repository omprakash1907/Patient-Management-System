import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import ProfileHeader from "../ProfileHeader";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Ensure to import your Axios instance
import userImage from "../../assets/images/user.png";
import Swal from "sweetalert2";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const EditProfile = ({ onCancel }) => {
    const { updateBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        // Navigate dynamically based on the user's role
        if (userRole === "admin") {
            updateBreadcrumb([
                { label: "Edit Profile", path: "/admin/edit-profile" },
            ]);
        } else if (userRole === "doctor") {
            updateBreadcrumb([
                { label: "Edit Profile", path: "/doctor/edit-profile" },
            ]);
        } else {
            console.error("Invalid user role");
        }

    }, [updateBreadcrumb]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        doctorDetails: {
            hospital: {
                hospitalName: "",
            },
        },
        gender: "Male", // Default selection
        city: "",
        state: "",
        country: "",
        profileImage: null,
    });

    const [hospitals, setHospitals] = useState([]);
    const fileInputRef = React.useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get("/users/profile");
                const { doctorDetails, ...otherData } = response.data;

                setFormData({
                    ...otherData,
                    doctorDetails: {
                        hospital: {
                            hospitalName: doctorDetails?.hospital?.hospitalName || "",
                        },
                    },
                    profileImage: response.data.profileImage ? response.data.profileImage : null
                });
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        const fetchHospitals = async () => {
            try {
                const response = await api.get("/hospitals");
                if (response.data && Array.isArray(response.data.data)) {
                    setHospitals(response.data.data);
                } else {
                    console.error("Data is not an array");
                    setHospitals([]);
                }
            } catch (error) {
                console.error("Failed to load hospitals.", error);
                setHospitals([]);
            }
        };

        fetchProfileData();
        fetchHospitals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "doctorDetails.hospital.hospitalName") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                doctorDetails: {
                    ...prevFormData.doctorDetails,
                    hospital: {
                        hospitalName: value,
                    },
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                profileImage: file, // Store the file object for FormData
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();

        // Add main fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "doctorDetails") {
                formDataObj.append("doctorDetails.hospital.hospitalName", value.hospital.hospitalName);
            } else {
                formDataObj.append(key, value);
            }
        });

        // Add profile image only if it's a File object (i.e., user selected a new file)
        if (formData.profileImage instanceof File) {
            formDataObj.append("profileImage", formData.profileImage);
        }

        const userRole = localStorage.getItem("role");

        try {
            await api.patch("/users/profile", formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                icon: "success",
                title: "Profile Updated successfully!!",
                confirmButtonText: "OK",
            });
            if (userRole === "admin") {
                navigate("/admin/profile-setting");
            } else if (userRole === "doctor") {
                navigate("/doctor/profile-setting");
            } else {
                console.error("Invalid user role");
            }
        } catch (error) {
            console.error("Error updating profile", error);
            Swal.fire({
                icon: "error",
                title: "Update failed",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="relative bg-gray-100 py-16 px-36 pb-48 h-full">
            <ProfileHeader title="Profile Setting" />
            <div className="flex flex-col md:flex-row w-full mt-8 mx-auto bg-white shadow-lg rounded-lg overflow-hidden z-10 relative h-full">
            <div className="w-1/4 p-12 text-center border-r">
                    <img
                        src={
                            formData.profileImage && !(formData.profileImage instanceof File)
                                ? `http://localhost:8000/${formData.profileImage}`
                                : userImage
                        }
                        alt="Profile"
                        className="w-48 h-48 mx-auto rounded-full mb-4"
                    />
                    <div className="flex justify-center">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200"
                        >
                            <FiCamera className="text-gray-500" />
                            <span>Change Profile</span>
                        </button>
                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleFileChange}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>
                </div>
                <div className="w-3/4 p-6">
                    <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                placeholder="First Name"
                            />
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                First Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                placeholder="Last Name"
                            />
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                placeholder="Email Address"
                            />
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                placeholder="Phone Number"
                            />
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <select
                                name="doctorDetails.hospital.hospitalName"
                                value={formData.doctorDetails.hospital.hospitalName || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="">Select Hospital</option>
                                {hospitals.map((hospital) => (
                                    <option key={hospital._id} value={hospital.name}>
                                        {hospital.name}
                                    </option>
                                ))}
                            </select>
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Hospital Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Gender <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="Surat">Surat</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                City <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="Gujarat">Gujarat</option>
                                <option value="Maharashtra">Maharashtra</option>
                            </select>
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                State <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative mb-4">
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                            </select>
                            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                                Country <span className="text-red-500">*</span>
                            </label>
                        </div>
                    </form>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-customBlue text-white rounded-md font-medium"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
