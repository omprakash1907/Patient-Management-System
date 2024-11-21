import React, { useContext, useState } from "react";
import RightBanner from "../commonComponent/RightBanner";
import axios from "axios"; // For API request
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { authError, requestOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    let validationErrors = {};
    if (!email) {
      validationErrors.email = "Email or Phone is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        localStorage.setItem("email", email);
        await requestOtp({ email });
        Swal.fire({
          icon: "success",
          title: "OTP sent to your email/phone!!",
          text: "Your operation was successful.",
          confirmButtonText: "OK",
        });
        navigate("/enter-otp");
      } catch (error) {
        setErrors({ email: authError });
        Swal.fire({
          icon: "error",
          title: "Invalid Email/Phone ",
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
          <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
          <p className="mb-4 text-sm text-gray-500">
            Enter your email and we'll send you an otp to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email or Phone Input */}
            <div className="relative mb-6">
              <input
                type="text"
                id="email"
                name="email"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium  transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Email or Phone<span className="text-red-500">*</span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-200 block text-center text-gray-500 font-semibold rounded-md hover:bg-customBlue hover:text-white transition duration-200"
            >
              Get OTP
            </button>
          </form>
          <p className="text-center mt-2 text-sm">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <RightBanner />
    </div>
  );
};

export default ForgotPassword;
