import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    bloodGroup: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Example validations
    if (!formData.email.includes("@")) {
      validationErrors.email = "Incorrect email address.";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit logic here
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">First Name*</label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Last Name*</label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email Address*</label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Age*</label>
              <input
                type="text"
                name="age"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Height (cm)*</label>
              <input
                type="text"
                name="height"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Weight (Kg)*</label>
              <input
                type="text"
                name="weight"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Gender*</label>
              <select
                name="gender"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Blood Group*</label>
              <input
                type="text"
                name="bloodGroup"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date of Birth*</label>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Country*</label>
              <select
                name="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">State*</label>
              <select
                name="state"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City*</label>
              <input
                type="text"
                name="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1">Address*</label>
              <input
                type="text"
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password*</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Checkbox for Terms and Conditions */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              I agree to all the <a href="#" className="text-blue-500 hover:underline">T&C</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policies</a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
