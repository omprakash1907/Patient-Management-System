import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../../api/api";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import TeleConsultationCard from "../../components/commonComponent/TeleConsultationCard";
import CustomDateFilter from "../../components/commonComponent/CustomDateFilter";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import noRecordImage from "../../assets/images/nodoctor.png"; // Import the "No records" image

const TeleConsultationScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState("2 March, 2022 - 13 March, 2022");
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({
    fromDate: null,
    toDate: null,
  });
  const [appointments, setAppointments] = useState([]);

  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Module", path: "/doctor/teleconsultation" },
    ]);
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const loggedInDoctorId = decodedToken.id;

      const response = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedAppointments = response.data.data;

      const doctorAppointments = fetchedAppointments.filter(
        (appointment) => appointment.doctorId === loggedInDoctorId
      );

      setAppointments(doctorAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getCurrentAppointments = () => {
    const today = moment().startOf("day");
    let filteredAppointments;

    switch (activeTab) {
      case 0:
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isSame(today, "day")
        );
        break;
      case 1:
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isAfter(today)
        );
        break;
      case 2:
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isBefore(today)
        );
        break;
      case 3:
        filteredAppointments = appointments.filter(
          (app) => app.status === "Cancelled"
        );
        break;
      default:
        filteredAppointments = appointments;
    }

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
      setDateRange(
        `${new Date(fromDate).toLocaleDateString()} - ${new Date(
          toDate
        ).toLocaleDateString()}`
      );
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setDateRange("2 Jan, 2022 - 13 Jan, 2022");
    setOpenCustomDateModal(false);
  };

  return (
    <div className="p-6 bg-white m-6 rounded-xl">
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

      {currentAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentAppointments.map((patient, index) => (
            <TeleConsultationCard key={index} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <img src={noRecordImage} alt="No records found"  />
        </div>
      )}

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
