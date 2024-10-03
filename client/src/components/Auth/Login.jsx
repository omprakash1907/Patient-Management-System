import React, { useState } from "react";
import logoBanner from "../../assets/images/loginBanner.png";
import logo from "../../assets/images/logo.png";
import vector1 from "../../assets/images/Vector1.png";
import vector2 from "../../assets/images/Vector2.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation logic
    let validationErrors = {};
    if (!email) {
      validationErrors.email = "Email or Phone is required.";
    }
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password !== "123456") {  // Dummy password check
      validationErrors.password = "Incorrect Password.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Perform successful login action here
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email or Phone Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email or Phone*
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password*</label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Registration
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <div className="w-1/2 bg-gray-100 relative flex justify-center items-center">
        {/* Vectors */}
        <img
          src={vector1}
          alt="Vector Top Left"
          className="absolute top-0 left-0 w-50 h-60"
        />
        <img
          src={vector2}
          alt="Vector Bottom Right"
          className="absolute bottom-0 right-0 w-50 h-60"
        />

        {/* Banner Content */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="mb-4 mx-auto w-60 h-30" />
          <img
            src={logoBanner}
            alt="Banner"
            className="w-full max-w-lg mx-auto"
          />
          <h2 className="text-4xl font-bold mt-4">Hospital</h2>
          <p className="text-gray-600 mt-2 font-semibold">
            You Can stay your Hospital and Contact<br /> With Your Facility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
