import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaLock, FaFileContract, FaShieldAlt } from "react-icons/fa";
import user from '../../assets/images/user.png';

const ProfileSidebar = () => {
  return (
    <div className="p-6 text-center">
      <img
        src={user}
        alt="Profile"
        className="w-48 h-48 mx-auto rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold">Lincoln Philips</h3>

      {/* Navigation Links */}
      <div className="mt-8 space-y-3">
        <h6 className="text-l font-semibold text-start">Menu</h6>
        
        <NavLink
          to=""
          end
          className={({ isActive }) => 
            `flex items-center p-2 rounded-lg ${isActive ? "text-customBlue bg-blue-100 font-semibold" : "text-gray-700 bg-gray-100"}`
          }
        >
          <FaUser className="inline-block w-5 h-5 mr-2" />
          Profile
        </NavLink>

        <NavLink
          to="change-password"
          className={({ isActive }) => 
            `flex items-center p-2 rounded-lg ${isActive ? "text-customBlue bg-blue-100 font-semibold" : "text-gray-700 bg-gray-100"}`
          }
        >
          <FaLock className="inline-block w-5 h-5 mr-2" />
          Change Password
        </NavLink>

        <NavLink
          to="terms-and-conditions"
          className={({ isActive }) => 
            `flex items-center p-2 rounded-lg ${isActive ? "text-customBlue bg-blue-100 font-semibold" : "text-gray-700 bg-gray-100"}`
          }
        >
          <FaFileContract className="inline-block w-5 h-5 mr-2" />
          Terms & Condition
        </NavLink>

        <NavLink
          to="privacy-policy"
          className={({ isActive }) => 
            `flex items-center p-2 rounded-lg ${isActive ? "text-customBlue bg-blue-100 font-semibold" : "text-gray-700 bg-gray-100"}`
          }
        >
          <FaShieldAlt className="inline-block w-5 h-5 mr-2" />
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;