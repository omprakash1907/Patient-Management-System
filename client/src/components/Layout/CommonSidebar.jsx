import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUserInjured,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCalendarAlt,
  FaPills,
  FaCommentDots,
  FaFileMedical,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../../assets/images/logo.png";
import appointmentImg from "../../assets/images/appointment.png"; // Import your appointment image here
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CommonSidebar = ({ role, isCollapsed, toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState("");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [prescriptionSubmenuOpen, setPrescriptionSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const adminMenu = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaChartBar },
    { label: 'Doctor Management', path: '/admin/doctor-management', icon: FaUserMd },
    { label: 'Patient Management', path: '/admin/patient-management', icon: FaUserInjured },
    {
      label: 'Billing And Payments',
      icon: FaFileInvoiceDollar,
      submenu: [
        { label: 'Monitor Billing', path: '/admin/monitor-billing' },
        { label: 'Insurance Claims', path: '/admin/insurance-claims' },
        { label: 'Payment Process', path: '/admin/payment-process' },
      ],
    },
    { label: 'Reporting And Analytics', path: '/admin/report-analysis', icon: FaChartBar },
  ];

  const patientMenu = [
    { label: 'Personal Health Record', path: '/patient/patient-dashboard', icon: FaFileMedical },
    { label: 'Appointment Booking', path: '/patient/appointment-booking', icon: FaCalendarAlt },
    { label: 'Prescription Access', path: '/patient/prescription-access', icon: FaPills },
    { label: 'Teleconsultation Access', path: '/patient/tele-access', icon: FaCommentDots },
    { label: 'Chat', path: '/patient/chat', icon: FaCommentDots },
    { label: 'Bills', path: '/patient/bills', icon: FaFileInvoiceDollar },
  ];

  const doctorMenu = [
    { label: 'Appointement Management', path: '/doctor/appointment-management', icon: FaChartBar },
    { label: 'Patient Records Access', path: '/doctor/patient-record-access', icon: FaFileMedical },
    {
      label: 'Prescription Tools',
      icon: FaPills,
      submenu: [
        { label: 'Create', path: '/doctor/create-prescription' },
        { label: 'Manage', path: '/doctor/manage-prescription' },
      ],
    },
    { label: 'Teleconsultation Module', path: '/doctor/teleconsultation', icon: FaCommentDots },
    { label: 'Chat', path: '/doctor/doctor-chat', icon: FaCommentDots },
  ];

  // Function to get menu items based on role
  const getMenuItems = () => {
    if (role === "admin") return adminMenu;
    if (role === "patient") return patientMenu;
    return doctorMenu;
  };

  // Set the first tab as the active tab when the component mounts
  useEffect(() => {
    const defaultTab = getMenuItems()[0]?.label;
    setActiveTab(defaultTab);
  }, [role]);

  // Handle menu click and submenu toggle
  const handleMenuClick = (label) => {
    setActiveTab(label);
    if (label === "Billing And Payments") {
      setSubmenuOpen(!submenuOpen);
    } else {
      setSubmenuOpen(false);
    }

    if (label === "Prescription Tools") {
      setPrescriptionSubmenuOpen(!prescriptionSubmenuOpen);
    } else {
      setPrescriptionSubmenuOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white  transition-transform transform ${
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      } lg:translate-x-0 lg:relative w-72 flex flex-col justify-between z-50`}
    >
      {/* Close Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-gray-500 text-2xl focus:outline-none"
      >
        <IoClose />
      </button>
      <div className="py-4">
        <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
      </div>

      <ul className="flex-grow">
        {getMenuItems().map((item) => (
          <li className="py-2" key={item.label}>
            <NavLink
              to={item.path}
              className={`relative flex items-center px-6 py-4 text-gray-700 font-semibold ${
                activeTab === item.label
                  ? "text-customBlue"
                  : "hover:text-customBlue"
              } group`}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon
                className={`mr-4 transition duration-300 z-20 relative ${
                  activeTab === item.label ? "text-customBlue" : "text-gray-500"
                }`}
              />
              <span className="z-20 relative">{item.label}</span>

              {item.submenu && (
                <span className="ml-auto text-gray-500 z-20">
                  {activeTab === item.label &&
                  (submenuOpen || prescriptionSubmenuOpen) ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${
                  activeTab === item.label
                    ? "opacity-100"
                    : "group-hover:opacity-100"
                } transition duration-300 z-10`}
              ></div>

              <div
                className={`absolute top-50 right-0 h-10 bg-customBlue ${
                  activeTab === item.label
                    ? "w-2 opacity-100"
                    : "group-hover:w-2 opacity-0"
                } rounded-tl-lg rounded-bl-lg transition-all duration-300 clip-button z-10`}
              ></div>
            </NavLink>

            {item.submenu &&
              activeTab === item.label &&
              (submenuOpen || prescriptionSubmenuOpen) && (
                <ul className="ml-12">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.label} className="py-2">
                      <NavLink
                        to={subItem.path}
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-customBlue font-medium"
                      >
                        <span className="z-20 relative">{subItem.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>

      {role === "patient" && (
        <div className="flex flex-col items-center p-4 pt-20 bg-gray-100 mx-6 my-4 rounded-xl relative">
          <img
            src={appointmentImg}
            alt="Appointment"
            className="w-30 mb-2 absolute top-[-100px]"
          />
          <p className="font-medium">Hospital appointment</p>
          <p className="text-center text-gray-700 mb-3 text-sm font-medium">
            You have to fill up the form to be admitted to the hospital.
          </p>
          <NavLink
            to="/patient/appointment-booking"
            className="bg-customBlue flex justify-center items-center gap-4 text-white py-2 px-4 rounded-xl w-full font-semibold"
          >
            <FaCalendarAlt />
            Appointment
          </NavLink>
        </div>
      )}

      <div className="mb-5 p-0">
        <button
          onClick={handleLogout}
          className="flex items-center justify-start py-3 text-red-500 font-semibold bg-red-100 px-6 w-full"
        >
          <HiOutlineLogout className="mr-2 text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CommonSidebar;
