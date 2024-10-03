import React, { useState } from "react";
import logoBanner from "../../assets/images/loginBanner.png";
import logo from "../../assets/images/logo.png";
import vector1 from "../../assets/images/Vector1.png";
import vector2 from "../../assets/images/Vector2.png";
import { Link } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    hospital: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Simple form validation logic
    if (!formData.firstName)
      validationErrors.firstName = "First Name is required.";
    if (!formData.lastName)
      validationErrors.lastName = "Last Name is required.";
    if (!formData.email) validationErrors.email = "Email Address is required.";
    if (!formData.phone) validationErrors.phone = "Phone Number is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.city) validationErrors.city = "City is required.";
    if (!formData.hospital)
      validationErrors.hospital = "Hospital selection is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";
    if (!formData.agreeToTerms)
      validationErrors.agreeToTerms =
        "You must agree to the Terms & Conditions.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data Submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="relative mb-4">
                <select
                  id="country"
                  name="country"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="Country1">Country1</option>
                  <option value="Country2">Country2</option>
                </select>
                <label
                  htmlFor="country"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Country<span className="text-red-500">*</span>
                </label>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div className="relative mb-4">
                <select
                  id="state"
                  name="state"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                </select>
                <label
                  htmlFor="state"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  State<span className="text-red-500">*</span>
                </label>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div className="relative mb-4">
                <select
                  id="city"
                  name="city"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  <option value="City1">City1</option>
                  <option value="City2">City2</option>
                </select>
                <label
                  htmlFor="city"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  City<span className="text-red-500">*</span>
                </label>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Select Hospital */}
            <div className="relative mb-4">
              <select
                id="hospital"
                name="hospital"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${
                  errors.hospital ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.hospital}
                onChange={handleChange}
              >
                <option value="">Select Hospital</option>
                <option value="Hospital1">Hospital1</option>
                <option value="Hospital2">Hospital2</option>
              </select>
              <label
                htmlFor="hospital"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Hospital<span className="text-red-500">*</span>
              </label>
              {errors.hospital && (
                <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>
              )}
            </div>

            {/* Password and Confirm Password */}
            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Password<span className="text-red-500">*</span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center ">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm">
                I agree to all the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  T&C
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policies
                </a>
                .
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mb-4">{errors.agreeToTerms}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <div className="w-1/2 bg-gray-100 relative flex justify-center items-center">
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

        <div className="text-center">
          <img src={logo} alt="Logo" className="mb-4 mx-auto w-60 h-30" />
          <img
            src={logoBanner}
            alt="Banner"
            className="w-full max-w-lg mx-auto"
          />
          <h2 className="text-4xl font-bold mt-4">Hospital</h2>
          <p className="text-gray-600 mt-2 font-semibold">
            Stay connected with your hospital and manage your appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
