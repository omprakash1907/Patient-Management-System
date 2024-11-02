import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../../api/api"; // Import the Axios instance from api.js
import moment from "moment"; // For handling date comparisons
import { jwtDecode } from "jwt-decode"; // To decode the token and extract doctorId
import TeleConsultationCard from "../../components/commonComponent/TeleConsultationCard";
import CustomDateFilter from "../../components/commonComponent/CustomDateFilter";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const TeleConsultationScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState("2 March, 2022 - 13 March, 2022");
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({
    fromDate: null,
    toDate: null,
  });
  const [appointments, setAppointments] = useState([]); // State to store appointments

  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Module", path: "/doctor/teleconsultation" },
    ]);
  }, []);

  // Fetch the appointments for the logged-in doctor
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Decode the token to get the doctorId
      const loggedInDoctorId = decodedToken.id; // Assuming the token has the doctor's ID as "id"

      const response = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedAppointments = response.data.data;
      // Filter appointments for the logged-in doctor only
      const doctorAppointments = fetchedAppointments.filter(
        (appointment) => appointment.doctorId === loggedInDoctorId
      );

      setAppointments(doctorAppointments); // Set only the logged-in doctor's appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when the component mounts
  }, []);

  // Function to get data based on active tab and appointment status
  const getCurrentAppointments = () => {
    const today = moment().startOf("day"); // Start of today for comparison
    let filteredAppointments;

    switch (activeTab) {
      case 0: // Today Appointment
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isSame(today, "day")
        );
        break;
      case 1: // Upcoming Appointment
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isAfter(today)
        );
        break;
      case 2: // Previous Appointment
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isBefore(today)
        );
        break;
      case 3: // Cancelled Appointment
        filteredAppointments = appointments.filter(
          (app) => app.status === "Cancelled"
        );
        break;
      default:
        filteredAppointments = appointments;
    }

    // If filter dates are selected, filter the appointments by date range
    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = moment(filterDates.fromDate).startOf("day");
      const toDate = moment(filterDates.toDate).endOf("day");

      return filteredAppointments.filter((appointment) => {
        const appointmentDate = moment(appointment.appointmentDate);
        return appointmentDate.isBetween(fromDate, toDate, null, "[]");
      });
    }

    return filteredAppointments;
  };

  const currentAppointments = getCurrentAppointments();

  const handleApplyDateFilter = (fromDate, toDate) => {
    if (fromDate && toDate) {
      // Update the date range display
      setDateRange(
        `${new Date(fromDate).toLocaleDateString()} - ${new Date(
          toDate
        ).toLocaleDateString()}`
      );
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false); // Close modal after applying filter
  };

  // Handler for resetting the date filter
  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null }); // Clear the filter dates
    setDateRange("2 Jan, 2022 - 13 Jan, 2022"); // Reset to default date range
    setOpenCustomDateModal(false); // Close modal
  };

  return (
    <div className="p-6 bg-white m-6 rounded-xl">
      {/* Tabs for different types of appointments */}
      <div className="flex space-x-4 border-b border-gray-300 pb-2 mb-6">
        {[
          "Today Appointment",
          "Upcoming Appointment",
          "Previous Appointment",
          "Cancel Appointment",
        ].map((label, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeTab === index
                ? "bg-white text-customBlue font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Date range display */}
      <div className="mt-4 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teleconsultation Module</h2>
        <button
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
          onClick={() => setOpenCustomDateModal(true)}
        >
          <FaCalendarAlt className="mr-2" />
          {dateRange}
        </button>
      </div>

      {/* Grid of Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentAppointments.map((patient, index) => (
          <TeleConsultationCard key={index} patient={patient} />
        ))}
      </div>

      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />
    </div>
  );
};

export default TeleConsultationScreen;
