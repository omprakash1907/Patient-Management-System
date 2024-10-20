import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const ProfileView = ({ onEdit }) => {
    const { updateBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        const userRole = localStorage.getItem("role");

        console.log(userRole)
        // Navigate dynamically based on the user's role
        if (userRole === "admin") {
            updateBreadcrumb([
                { label: "Profile Setting", path: "/admin/profile-setting" },
            ]);
        } else if (userRole === "doctor") {
            updateBreadcrumb([
                { label: "Profile Setting", path: "/doctor/profile-setting" },
            ]);
        } else {
            console.error("Invalid user role");
        }
        
    }, [updateBreadcrumb]);

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        hospitalName: "",
        gender: "",
        city: "",
        state: "",
        country: "",
    });

    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get("/users/profile"); // Adjust the endpoint as needed
                setProfileData(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleEditProfile = () => {
        // Get user role from local storage (assuming it's stored there after login)
        const userRole = localStorage.getItem("role");

        console.log(userRole)
        // Navigate dynamically based on the user's role
        if (userRole === "admin") {
            navigate("/admin/edit-profile");
        } else if (userRole === "doctor") {
            navigate("/doctor/edit-profile");
        } else {
            console.error("Invalid user role");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Profile</h3>
                <button
                    onClick={handleEditProfile}
                    className="border text-white bg-customBlue px-4 py-2 rounded-lg font-medium flex items-center"
                >
                    <FaEdit className="mr-2" />
                    Edit Profile
                </button>
            </div>

            <form className="grid grid-cols-3 gap-4">
                <div className="relative mb-4 ">
                    <input
                        type="text"
                        disabled
                        id="firstName"
                        name="firstName"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter First Name"
                        value={profileData.firstName}
                    />
                    <label
                        htmlFor="firstName"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        First Name <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="lastName"
                        name="lastName"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Last Name"
                        value={profileData.lastName}
                    />
                    <label
                        htmlFor="lastName"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Last Name <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="email"
                        disabled
                        id="email"
                        name="email"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Email Address"
                        value={profileData.email}
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Email Address <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="phoneNumber"
                        name="phoneNumber"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Phone Number"
                        value={profileData.phoneNumber}
                    />
                    <label
                        htmlFor="phoneNumber"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="hospitalName"
                        name="hospitalName"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Hospital Name"
                        value={profileData.hospitalName}
                    />
                    <label
                        htmlFor="hospitalName"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Hospital Name <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="gender"
                        name="gender"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Gender"
                        value={profileData.gender}
                    />
                    <label
                        htmlFor="gender"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Gender <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="city"
                        name="city"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter City"
                        value={profileData.city}
                    />
                    <label
                        htmlFor="city"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        City <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="state"
                        name="state"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter State"
                        value={profileData.state}
                    />
                    <label
                        htmlFor="state"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        State <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        disabled
                        id="country"
                        name="country"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 bg-white"
                        placeholder="Enter Country"
                        value={profileData.country}
                    />
                    <label
                        htmlFor="country"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                    >
                        Country <span className="text-red-500">*</span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default ProfileView;
