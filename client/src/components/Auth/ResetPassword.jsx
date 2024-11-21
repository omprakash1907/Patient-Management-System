import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RightBanner from "../commonComponent/RightBanner";
import logo from "../../assets/images/logo.png";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const { resetPassword, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation logic
    let validationErrors = {};
    if (!newPassword) {
      validationErrors.newPassword = "New Password is required.";
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const email = localStorage.getItem("email");
        await resetPassword({ password: newPassword, email });
        Swal.fire({
          icon: "success",
          title: "Password reset successful!!",
          text: "Something went wrong!",
          confirmButtonText: "OK",
        });
        localStorage.removeItem("email");
        navigate("/");
      } catch {
        setErrors({ confirmPassword: authError });
        Swal.fire({
          icon: "error",
          title: "Password reset failed",
          text: "Something went wrong!",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <img
        src={logo}
        alt="Logo"
        className="md:hidden flex mt-4 mx-auto w-60 h-30"
      />
      {/* Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6 md:p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="relative mb-6">
              <input
                type={showNewPassword ? "password" : "text"} // Conditionally set the type
                id="newPassword"
                name="newPassword"
                className={`peer w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label
                htmlFor="newPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium  transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                New Password<span className="text-red-500">*</span>
              </label>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}

              {/* Eye Icon for toggling password visibility */}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "password" : "text"} // Conditionally set the type
                id="confirmPassword"
                name="confirmPassword"
                className={`peer w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium  transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}

              {/* Eye Icon for toggling confirm password visibility */}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-200 text-gray-500 font-semibold rounded-md hover:bg-customBlue hover:text-white transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <RightBanner />
    </div>
  );
};

export default ResetPassword;
