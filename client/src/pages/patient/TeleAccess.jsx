import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import {
  FaTrashAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarTimes,
  FaCalendarDay,
} from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import TeleConsultationCardPatient from "../../components/commonComponent/TeleConsultationCardPatient";
import CustomDateFilter from "../../components/commonComponent/CustomDateFilter";
import noRecordImage from "../../assets/images/nodoctor.png";

Modal.setAppElement("#root");

const TeleAccess = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  // State variables
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState("Select Date Range");
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Set up breadcrumb
  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Access", path: "/patient/tele-access" },
    ]);
    fetchAppointments();
  }, []);

  // Fetch appointments for the logged-in doctor
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const loggedInDoctorId = decodedToken.id;

      const response = await api.get("/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedAppointments = response.data.data;

      // Filter appointments for the logged-in doctor only
      const doctorAppointments = fetchedAppointments.filter(
        (appointment) => appointment.patientId === loggedInDoctorId
      );

      setAppointments(doctorAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Filter appointments based on active tab and date range
  const getCurrentAppointments = () => {
    const today = moment().startOf("day");
    let filteredAppointments;

    switch (activeTab) {
      case 0:
        filteredAppointments = appointments.filter(
          (app) => moment(app.appointmentDate).isSame(today, "day") && app.status !== "Cancelled"
        );
        break;
      case 1:
        filteredAppointments = appointments.filter((app) => moment(app.appointmentDate).isAfter(today));
        break;
      case 2:
        filteredAppointments = appointments.filter((app) => moment(app.appointmentDate).isBefore(today));
        break;
      case 3:
        filteredAppointments = appointments.filter((app) => app.status === "Cancelled");
        break;
      default:
        filteredAppointments = appointments;
    }

    // Apply date filter if selected
    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = moment(filterDates.fromDate).startOf("day");
      const toDate = moment(filterDates.toDate).endOf("day");

      return filteredAppointments.filter((appointment) =>
        moment(appointment.appointmentDate).isBetween(fromDate, toDate, null, "[]")
      );
    }

    return filteredAppointments;
  };

  const currentAppointments = getCurrentAppointments();

  // Handlers for date filter and modal
  const handleApplyDateFilter = (fromDate, toDate) => {
    setDateRange(`${new Date(fromDate).toLocaleDateString()} - ${new Date(toDate).toLocaleDateString()}`);
    setFilterDates({ fromDate, toDate });
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setDateRange("Select Date Range");
    setOpenCustomDateModal(false);
  };

  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAppointmentToCancel(null);
  };

  const handleCancelAppointment = async () => {
    setLoading(true);
    try {
      await api.patch(`/appointments/cancel/${appointmentToCancel.id}`);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentToCancel.id ? { ...appointment, status: "Cancelled" } : appointment
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white m-6 rounded-xl">
      {/* Tabs for appointment categories */}
      <div className="flex space-x-4 border-b border-gray-300 pb-2 mb-6">
        {[
          { label: "Today Appointment", icon: FaCalendarDay },
          { label: "Upcoming Appointment", icon: FaCalendarCheck },
          { label: "Previous Appointment", icon: FaCalendarAlt },
          { label: "Cancelled Appointment", icon: FaCalendarTimes },
        ].map((tab, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-md focus:outline-none ${
              activeTab === index
                ? "bg-customBlue text-white font-semibold"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <tab.icon className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date range display and filter button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Teleconsultation Access</h2>
        <button
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
          onClick={() => setOpenCustomDateModal(true)}
        >
          <FaCalendarAlt className="mr-2" />
          {dateRange}
        </button>
      </div>

      {/* Appointment Cards or No Record Image */}
      {currentAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAppointments.map((appointment, index) => (
            <TeleConsultationCardPatient
              key={index}
              patient={appointment}
              activeTab={activeTab}
              openCancelModal={openCancelModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8">
          <img
            src={noRecordImage}
            alt="No Appointments Found"
            className="w-96 mb-4"
          />
        </div>
      )}

      {/* Date Filter Modal */}
      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto my-20 border-t-4 border-red-500"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
      >
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">
            <FaTrashAlt />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cancel {appointmentToCancel?.appointmentType} Appointment?
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to cancel this appointment?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-100"
              onClick={closeModal}
            >
              No
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
              onClick={handleCancelAppointment}
            >
              {loading ? "Canceling..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeleAccess;
