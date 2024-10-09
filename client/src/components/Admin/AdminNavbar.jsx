import React from "react";
import { FaSearch, FaBell, FaHome } from "react-icons/fa";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const AdminNavbar = () => {
  const { breadcrumb } = useBreadcrumb();

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Breadcrumb Path */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-2">
        <Link to={"/admin/dashboard"}>
          <FaHome className="text-gray-500 text-lg" />
        </Link>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <AiOutlineRight className="text-gray-400 text-sm" />
            <Link
              to={item.path}
              className="pro-text-color font-medium text-customBlue"
            >
              {item.label}
            </Link>
          </React.Fragment>
        ))}
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

        {/* User Profile with Profile Setting Link */}
        <Link to="/admin/profile-setting" className="flex items-center space-x-2">
          <img src={user} alt="user" className="w-12 h-12 rounded-full" />
          <div>
            <span className="font-semibold text-sm">Lincoln Philips</span>
            <span className="block text-gray-500 text-xs">Admin</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
