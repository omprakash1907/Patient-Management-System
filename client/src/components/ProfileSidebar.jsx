import React from "react";
import { FiCamera, FiLock, FiFileText, FiShield } from "react-icons/fi";

const ProfileSidebar = ({ name, image, setActiveSection, isEditing }) => {
  return (
    <div className="flex flex-col items-center w-1/4 border-r pr-8">
      <div className="relative w-48 h-48 mb-4">
        <img
          src={image}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>

      {/* Show Change Profile button only in edit mode */}
      {isEditing && (
        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200">
          <FiCamera className="text-gray-500" />
          <span>Change Profile</span>
        </button>
      )}

      <div className="mt-6 w-full">
        <button
          onClick={() => setActiveSection("profile")}
          className="flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-100"
        >
          <FiFileText />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveSection("password")}
          className="flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-100"
        >
          <FiLock />
          <span>Change Password</span>
        </button>
        <button
          onClick={() => setActiveSection("terms")}
          className="flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-100"
        >
          <FiFileText />
          <span>Terms & Condition</span>
        </button>
        <button
          onClick={() => setActiveSection("privacy")}
          className="flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-100"
        >
          <FiShield />
          <span>Privacy Policy</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
