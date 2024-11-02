import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye, FaSearch } from "react-icons/fa";

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("Month"); // Default filter to 'Month'
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Patient Record Access", path: "/doctor/patient-record-access" },
    ]);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        // Decode token to get the doctor ID
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        // Fetch appointments associated with this doctor
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAppointments = response.data.data || [];

        // Filter for only the completed appointments of the logged-in doctor
        const completedAppointments = allAppointments.filter((appointment) => {
          return (
            appointment.doctorId === doctorId &&
            appointment.status === "Completed"
          );
        });

        setAppointments(completedAppointments);
        setFilteredAppointments(completedAppointments); // Initially show all completed appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter patients based on search term and date filter
  const getFilteredPatients = () => {
    const today = new Date();
    let filteredList = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);

      // Apply date filter logic
      if (dateFilter === "Day") {
        return appointmentDate.toDateString() === today.toDateString();
      } else if (dateFilter === "Week") {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return appointmentDate >= lastWeek && appointmentDate <= today;
      } else if (dateFilter === "Month") {
        const lastMonth = new Date(today);
        lastMonth.setDate(today.getDate() - 30);
        return appointmentDate >= lastMonth && appointmentDate <= today;
      }

      return true;
    });

    // Apply search term filtering
    if (searchTerm) {
      filteredList = filteredList.filter(
        (appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.diseaseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (appointment.patientIssue &&
            appointment.patientIssue
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    return filteredList;
  };

  // Update filtered appointments whenever search term or date filter changes
  useEffect(() => {
    setFilteredAppointments(getFilteredPatients());
  }, [searchTerm, dateFilter, appointments]);

  const handleFilterChange = (filter) => {
    setDateFilter(filter);
    setAnchorEl(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl m-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Patient Record Access</h2>

        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="relative w-full max-w-xs">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Quick Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className="bg-gray-100 px-4 py-2 rounded-lg flex items-center text-gray-600  shadow-sm"
            >
              {dateFilter}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={`absolute mt-2 w-32 rounded-lg shadow-lg bg-white border z-10 ${
                anchorEl ? "block" : "hidden"
              }`}
              onMouseLeave={() => setAnchorEl(null)}
            >
              <div
                onClick={() => handleFilterChange("Day")}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                Day
              </div>
              <div
                onClick={() => handleFilterChange("Week")}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                Week
              </div>
              <div
                onClick={() => handleFilterChange("Month")}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                Month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Completed Appointments */}
      <div className="overflow-y-auto custom-scroll  rounded-lg ">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Patient Name
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Disease Name
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Patient Issue
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Last Appointment Date
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Last Appointment Time
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Age
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Gender
              </th>
              <th className="p-4 text-left  font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4  text-gray-700">
                    {appointment.patientName}
                  </td>
                  <td className="p-4  text-gray-700">
                    {appointment.diseaseName}
                  </td>
                  <td className="p-4  text-gray-700">
                    {appointment.patientIssue}
                  </td>
                  <td className="p-4  text-gray-700">
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td className="p-4 text-blue-600 ">
                    <span className="py-1 px-2 bg-blue-100 rounded-full">
                      {appointment.appointmentTime}
                    </span>
                  </td>
                  <td className="p-4  text-gray-700">
                    {appointment.patientAge} Years
                  </td>
                  <td className="p-4 text-center text-gray-500 text-lg">
                    <span className="bg-gray-100 rounded-full px-2 py-1">
                      {appointment.patientGender === "Male" ? "♂" : "♀"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="text-customBlue bg-gray-100 p-1 rounded-lg"
                      onClick={() =>
                        navigate(
                          `/doctor/patient-detail/${appointment.patientId}`
                        )
                      }
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No completed appointments found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecordAccess;
