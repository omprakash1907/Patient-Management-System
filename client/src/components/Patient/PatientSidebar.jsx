import { NavLink } from "react-router-dom";
import {
  FaFileMedical,
  FaPills,
  FaCalendarAlt,
  FaCommentDots,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../../assets/images/logo.png";
import appointment from "../../assets/images/appointment.png";

const PatientSidebar = ({ onMenuClick }) => {
  return (
    <div className="w-72 bg-white h-full shadow-lg flex flex-col justify-between ">
      {/* Logo */}
      <div className="py-2">
        <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
      </div>

      {/* Menu Items */}
      <div className="border-t border-gray-200 mx-5"></div>
      <ul className="mt-5 flex-grow">
        {/* Personal Health Record */}
        <li>
          <NavLink
            to="/patient-dashboard"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Personal Health Record")}
          >
            <FaFileMedical className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Personal Health Record</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>

        {/* Appointment Booking */}
        <li>
          <NavLink
            to="/appointment-booking"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Appointment Booking")} // Update active menu
          >
            <FaCalendarAlt className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Appointment Booking</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>

        {/* Prescription Access */}
        <li>
          <NavLink
            to="/prescription-access"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Prescription Access")} // Update active menu
          >
            <FaPills className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Prescription Access</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>

        {/* Teleconsultation Access */}
        <li>
          <NavLink
            to="/teleconsultation-access"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Teleconsultation Access")} // Update active menu
          >
            <FaCommentDots className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Teleconsultation Access</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>

        {/* Chat */}
        <li>
          <NavLink
            to="/chat"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Chat")} // Update active menu
          >
            <FaCommentDots className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Chat</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>

        {/* Bills */}
        <li>
          <NavLink
            to="/bills"
            className="relative flex items-center px-4 py-4 text-gray-700 font-semibold hover:text-customBlue group"
            onClick={() => onMenuClick("Bills")} // Update active menu
          >
            <FaFileInvoiceDollar className="mr-3 group-hover:text-customBlue text-gray-500 transition duration-300 z-20 relative" />
            <span className="z-20 relative">Bills</span>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r to-white from-[#E0F3FB] opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>

            {/* ClipPath Button on the right side */}
            <div className="absolute top-50 right-0 h-10 bg-customBlue group-hover:w-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-0 transition-all duration-300 clip-button z-10"></div>
          </NavLink>
        </li>
      </ul>

      {/* Appointment Section */}
      <div className="relative px-5 m-5 bg-gray-100 rounded-2xl">
        {/* Image Container - Positioned Half Inside, Half Outside */}
        <div className="flex justify-center mb-4 relative z-10">
          <img
            src={appointment}
            alt="appointment"
            className="w-48 h-48 -mt-32"
          />
        </div>

        {/* Appointment Info Box */}
        <div className=" pb-5 text-center relative z-0">
          <h4 className="mb-2 font-semibold text-lg">Hospital appointment</h4>
          <p className="text-sm text-gray-500 mb-4">
            You have to fill up the form to be admitted to the Hospital.
          </p>
          <button className="w-full bg-customBlue text-white py-2 rounded-md">
            Appointment
          </button>
        </div>
      </div>

      {/* Logout Section */}
      <div className="mb-5">
        <NavLink
          to="/logout"
          className="flex items-center justify-start  py-3 text-red-500 font-semibold bg-red-100 px-5"
        >
          <HiOutlineLogout className="mr-2 text-lg" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default PatientSidebar;
