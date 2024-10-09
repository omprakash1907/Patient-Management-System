import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="w-3/5 p-6">
      <div className=" justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Change Password</h3>
        <p className="text-sm">
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters, it must also include at
          least one uppercase letter, one lowercase letter, one number, and one
          special character.
        </p>
      </div>
      <form className="space-y-6">
        {/* Current Password */}
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            placeholder="Enter Current Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword.current ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="Enter New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            New Password <span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => togglePasswordVisibility("new")}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword.new ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Enter Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
