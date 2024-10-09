import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import user from "../../assets/images/user.png";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Profile Setting Path */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-2">
        <span className="font-medium text-customBlue">Profile Setting</span>
      </div>

      {/* Right Side - Search, Notification, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar with Icon */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Quick Search"
            className="bg-gray-100 focus:outline-none w-full"
          />
          <AiOutlineDown className="text-gray-500" />
        </div>

        {/* Notification Icon */}
        <div className="relative rounded-full bg-gray-100 p-3">
          <FaBell className="text-gray-700" />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img src={user} alt="user" className="w-12 h-12 rounded-full" />
          <div>
            <span className="font-semibold text-sm">Lincoln Philips</span>
            <span className="block text-gray-500 text-xs">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
