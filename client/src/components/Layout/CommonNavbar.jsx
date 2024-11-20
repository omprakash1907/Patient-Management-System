import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FaBars, FaBell, FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const CommonNavbar = ({ role, onSearch, toggleSidebar }) => {
  const { breadcrumb } = useBreadcrumb();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(`${decoded.firstName} ${decoded.lastName}`);
        setUserRole(decoded.role);

        // Fetch user profile using the token
        axios
          .get(
            "https://patient-management-system-1-8zui.onrender.com/api/users/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            const userData = response.data;
            setProfileImage(
              `https://patient-management-system-1-8zui.onrender.com/${userData.profileImage}`
            );
          })
          .catch((error) =>
            console.error("Error fetching user profile:", error)
          );
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Set greeting based on time of day
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning");
    else if (currentHour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleFilterSelect = (option) => {
    setFilterOption(option);
    setDropdownOpen(false);
    onSearch(searchQuery, option); // Update search whenever filter changes
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, filterOption); // Call the parent onSearch callback
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 text-lg lg:hidden"
      >
        <FaBars />
      </button>

      {/* Breadcrumb Path */}
      <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-2">
        <Link to={`/${role.toLowerCase()}/dashboard`}>
          <FaHome className="text-gray-500 text-lg" />
        </Link>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <AiOutlineRight className="text-gray-400 text-sm" />
            <Link to={item.path} className="text-customBlue font-medium">
              {item.label}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Right Side - Greeting, Search, Notification, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Greeting */}
        <div className="text-gray-700 hidden lg:flex flex-col items-center space-x-2">
          <h1 className="text-lg font-bold">
            {greeting}, {userName.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 text-sm">Hope you have a good day</p>
        </div>

        {/* Conditionally render search bar only if userRole is "admin" */}
        {userRole === "admin" && (
          <div className="relative hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Quick Search"
              className="bg-gray-100 focus:outline-none w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-gray-500 mx-2">{filterOption}</span>
              <AiOutlineDown className="text-gray-500" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-32 z-10">
                <div
                  onClick={() => handleFilterSelect("All")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  All
                </div>
                <div
                  onClick={() => handleFilterSelect("Doctor")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Doctor
                </div>
                <div
                  onClick={() => handleFilterSelect("Patient")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Patient
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notification Icon */}
        <div className="relative rounded-full bg-gray-100 p-3">
          <FaBell className="text-gray-700" />
        </div>

        {/* User Profile */}
        <Link
          to={`/${role.toLowerCase()}/profile-setting`}
          className="flex items-center space-x-2"
        >
          <img
            src={
              profileImage ||
              "https://patient-management-system-1-8zui.onrender.com/default-profile.png"
            }
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden lg:block">
            <span className="font-semibold text-sm">{userName}</span>
            <span className="block text-gray-500 text-xs">{userRole}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CommonNavbar;
