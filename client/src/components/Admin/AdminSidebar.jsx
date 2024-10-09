import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserMd,
  FaUserInjured,
  FaFileInvoiceDollar,
  FaChartBar,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../../assets/images/logo.png";

const AdminSidebar = () => {
  // State to track the active menu item
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: FaChartBar },
    { label: "Doctor Management", path: "/admin/doctor-management", icon: FaUserMd },
    { label: "Patient Management", path: "/admin/patient-management", icon: FaUserInjured },
    { label: "Billing And Payments", path: "/admin/billing", icon: FaFileInvoiceDollar },
    { label: "Reporting And Analytics", path: "/admin/reporting", icon: FaChartBar },
  ];

  const handleMenuClick = (label) => {
    setActiveTab(label); // Set the active tab
  };

  return (
    <div className="w-72 bg-white h-full shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div className="py-4">
        <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
      </div>

      {/* Menu Items */}
      <ul className="flex-grow">
        {menuItems.map((item) => (
          <li className="py-2" key={item.label}>
            <NavLink
              to={item.path}
              className={`relative flex items-center px-6 py-4 text-gray-700 font-semibold  ${
                activeTab === item.label
                  ? "text-customBlue"
                  : "hover:text-customBlue"
              } group`}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon
                className={`mr-4 transition duration-300 z-20 relative ${
                  activeTab === item.label ? "text-customBlue" : "text-gray-500"
                }`}
              />
              <span className="z-20 relative">{item.label}</span>

              {/* Background Gradient and Clip Path for Active Tab */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${
                  activeTab === item.label
                    ? "opacity-100"
                    : "group-hover:opacity-100"
                } transition duration-300 z-10`}
              ></div>

              <div
                className={`absolute top-0 right-0 h-10 bg-customBlue ${
                  activeTab === item.label
                    ? "w-2 opacity-100"
                    : "group-hover:w-2 opacity-0"
                } rounded-tl-lg rounded-bl-lg transition-all duration-300 clip-button z-10`}
              ></div>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Section */}
      <div className="mb-5">
        <NavLink
          to="/logout"
          className="flex items-center justify-start py-3 text-red-500 font-semibold bg-red-100 px-6"
        >
          <HiOutlineLogout className="mr-2 text-lg" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
