import React from 'react';

const ProfileForm = ({ formData, handleChange, errors, handleSubmit }) => {
return (
<form className="w-3/4 pl-8" onSubmit={handleSubmit}>
    <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
    <div className="grid grid-cols-3 gap-6">

    {/* First Name */}
    <div className="relative mb-4">
        <input
        type="text"
        name="firstName"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.firstName}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        First Name <span className="text-red-500">*</span>
        </label>
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
    </div>

    {/* Last Name */}
    <div className="relative mb-4">
        <input
        type="text"
        name="lastName"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.lastName}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Last Name <span className="text-red-500">*</span>
        </label>
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
    </div>

    {/* Email */}
    <div className="relative mb-4">
        <input
        type="email"
        name="email"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.email}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Email Address <span className="text-red-500">*</span>
        </label>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>

    {/* Phone Number */}
    <div className="relative mb-4">
        <input
        type="text"
        name="phoneNumber"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.phoneNumber}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Phone Number <span className="text-red-500">*</span>
        </label>
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
    </div>

    {/* Hospital Name */}
    <div className="relative mb-4">
        <input
        type="text"
        name="hospitalName"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.hospitalName}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Hospital Name <span className="text-red-500">*</span>
        </label>
        {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
    </div>

    {/* Gender */}
    <div className="relative mb-4">
        <select
        name="gender"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        value={formData.gender}
        onChange={handleChange}
        >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Gender <span className="text-red-500">*</span>
        </label>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
    </div>

    {/* City */}
    <div className="relative mb-4">
        <input
        type="text"
        name="city"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.city}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        City <span className="text-red-500">*</span>
        </label>
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
    </div>

    {/* State */}
    <div className="relative mb-4">
        <input
        type="text"
        name="state"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.state}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        State <span className="text-red-500">*</span>
        </label>
        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
    </div>

    {/* Country */}
    <div className="relative mb-4">
        <input
        type="text"
        name="country"
        className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder=" "
        value={formData.country}
        onChange={handleChange}
        />
        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
        Country <span className="text-red-500">*</span>
        </label>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
    </div>
    </div>

    <div className="flex justify-end gap-4 mt-6">
    <button
        type="button"
        className="px-6 py-2 rounded bg-gray-200 text-gray-700"
    >
        Cancel
    </button>
    <button
        type="submit"
        className="px-6 py-2 rounded bg-blue-500 text-white"
    >
        Save
    </button>
    </div>
</form>
);
};

export default ProfileForm;
