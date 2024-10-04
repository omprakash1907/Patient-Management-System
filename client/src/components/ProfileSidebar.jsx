import React from "react";
import { FiCamera, FiLock, FiFileText, FiShield, FiUser } from "react-icons/fi";

const ProfileSidebar = ({ name, image, setActiveSection, isEditing }) => {
  return (
    <div className="flex flex-col items-center w-1/4 border-r pr-8">
      <div className="relative w-32 h-32 mb-4">
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

      {/* Conditionally render these buttons only when not editing */}
      {!isEditing && (
        <div className="mt-6 w-full">
          <button
            onClick={() => setActiveSection("profile")}
            className="flex items-center space-x-2 w-full py-4 px-4 text-left bg-gray-100 mb-3 rounded-lg"
          >
            <FiUser />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveSection("password")}
            className="flex items-center space-x-2 w-full py-4 px-4 text-left bg-gray-100 mb-3 rounded-lg"
          >
            <FiLock />
            <span>Change Password</span>
          </button>
          <button
            onClick={() => setActiveSection("terms")}
            className="flex items-center space-x-2 w-full py-4 px-4 text-left bg-gray-100 mb-3 rounded-lg"
          >
            <FiFileText />
            <span>Terms & Condition</span>
          </button>
          <button
            onClick={() => setActiveSection("privacy")}
            className="flex items-center space-x-2 w-full py-4 px-4 text-left bg-gray-100 mb-3 rounded-lg"
          >
            <FiShield />
            <span>Privacy Policy</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
