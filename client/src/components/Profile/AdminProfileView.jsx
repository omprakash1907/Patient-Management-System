import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminProfileView = ({ onEdit }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Profile</h3>
        <Link
          to="/admin/edit-profile"
          className="border text-white bg-customBlue px-4 py-2 rounded-lg font-medium flex items-center "
        >
          <FaEdit className="mr-2" />
           Edit Profile
        </Link>
      </div>

      <form className="grid grid-cols-3 gap-4">
        {[
          "First Name",
          "Last Name",
          "Email Address",
          "Phone Number",
          "Hospital Name",
          "Gender",
          "City",
          "State",
          "Country",
        ].map((field, index) => (
          <div key={index} className="relative mb-4">
            <input
              type="text"
              disabled
              id={field.replace(/\s+/g, "-").toLowerCase()}
              name={field.replace(/\s+/g, "-").toLowerCase()}
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-400 ${
                index === 0 ? "border-gray-300" : ""
              }`}
              placeholder={`Enter ${field}`}
              defaultValue={
                field === "First Name"
                  ? "Lincoln"
                  : field === "Last Name"
                  ? "Philips"
                  : field === "Email Address"
                  ? "lincoln@gmail.com"
                  : field === "Phone Number"
                  ? "99130 53222"
                  : field === "Hospital Name"
                  ? "Silver Park Medical Center"
                  : field === "Gender"
                  ? "Male"
                  : field === "City"
                  ? "Ahmedabad"
                  : field === "State"
                  ? "Gujarat"
                  : field === "Country"
                  ? "India"
                  : ""
              }
            />
            <label
              htmlFor={field.replace(/\s+/g, "-").toLowerCase()}
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
            >
              {field} <span className="text-red-500">*</span>
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default AdminProfileView;
