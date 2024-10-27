import React, { useState, useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaCalendarAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar";
import noRecord from "../../assets/images/norecord.png";
import api from "../../api/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AppointmentBookingPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Appointment Booking", path: "/patient/appointment-booking" },
    ]);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");
        console.log("API Response:", response.data); // Log to check the response structure
        setAppointments(response.data.data || []); // Set to an empty array if data is undefined
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = Array.isArray(appointments)
    ? activeTab === "Scheduled"
      ? appointments // Show all appointments if "Scheduled" is active
      : appointments.filter((appointment) => appointment.status === activeTab)
    : [];

  const handleViewDetails = (appointment) => {
    setSelectedDoctor(appointment);
    setIsSidebarVisible(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const response = await api.patch(`/appointments/cancel/${appointmentId}`);
        console.log("Cancel response:", response.data);

        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: "Cancelled" }
              : appointment
          )
        );

        Swal.fire({
          icon: "success",
          title: "Cancelled",
          text: "Your appointment has been cancelled.",
        });
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue cancelling the appointment. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl m-6 ">
      <div className="flex space-x-4 border-b mb-4">
        {["Scheduled", "Previous", "Cancelled", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 focus:outline-none font-medium ${
              activeTab === tab
                ? "border-b-4 border-customBlue text-customBlue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Appointment
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Appointment</h2>
        <Link to={"/patient/appointment-booking/book-appointment"} className="flex items-center space-x-2 bg-customBlue text-white px-4 py-2 rounded-lg">
          <FaCalendarAlt />
          <span>Book Appointment</span>
        </Link>
      </div>

      {/* Appointment List or No Records Message */}
      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border-gray-100 border rounded-xl bg-white transition"
            >
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold">
                  {appointment.doctorName || "Doctor Name"}
                </h4>
                <div
                  className="text-customBlue p-2 rounded-lg bg-white cursor-pointer"
                  onClick={() => handleViewDetails(appointment)}
                >
                  <FaEye />
                </div>
              </div>
              <div className="p-4 text-sm text-gray-700 space-y-1">
                <p className="flex justify-between items-center text-yellow-500 pb-2">
                  <span className="font-semibold text-gray-500">
                    Appointment Type
                  </span>
                  {appointment.appointmentType}
                </p>
                <p className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-gray-500">
                    Hospital Name
                  </span>
                  {appointment.hospitalName}
                </p>
                <p className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-gray-500">
                    Appointment Date
                  </span>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <p className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-gray-500">
                    Appointment Time
                  </span>
                  {appointment.appointmentTime}
                </p>
                <p className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-gray-500">Patient Issue</span>
                  {appointment.diseaseName || "Not specified"}
                </p>
              </div>
              <div className="flex justify-between space-x-2 p-4 bg-white rounded-b-lg">
                {(activeTab === "Scheduled" || activeTab === "Pending") && (
                  <>
                    <button
                      className="flex items-center justify-center space-x-1 border px-3 py-2 rounded-lg font-medium text-gray-600 w-1/2"
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      <FaTrashAlt />
                      <span>Cancel</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1 hover:bg-customBlue bg-gray-100 transition-all px-3 py-2 rounded-lg font-medium hover:text-white w-1/2">
                      <FaCalendarAlt />
                      <span>Reschedule</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <img src={noRecord} alt="No Records Found" className=" mb-4" />
        </div>
      )}

      {selectedDoctor && (
        <DoctorDetailsSidebar
          doctor={selectedDoctor}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default AppointmentBookingPage;
