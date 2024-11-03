import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddRecordPage from "./AddRecordPage";
import api from "../../api/api";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye, FaPlus } from "react-icons/fa";
import PrescriptionModal from "../../components/PrescritionModal";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for the add record modal
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false); // State for the prescription modal
  const [selectedPrescription, setSelectedPrescription] = useState(null); // Selected appointment data
  const { updateBreadcrumb } = useBreadcrumb();
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Patient Record Access", path: "/doctor/patient-record-access" },
      { label: "Patient Details", path: `/doctor/patient-detail/${id}` },
    ]);
  }, [id, updateBreadcrumb]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken?.id || null);
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const patientAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );
        setAppointments(patientAppointments);

        if (patientAppointments.length > 0) {
          const firstAppointment = patientAppointments[0];
          setPatientData({
            firstName: firstAppointment.patientName,
            lastName: firstAppointment.patientLastName || "",
            phoneNumber: firstAppointment.patientPhoneNumber,
            email: firstAppointment.email,
            age: firstAppointment.patientAge,
            gender: firstAppointment.patientGender,
            dateOfBirth: firstAppointment.dateOfBirth
              ? new Date(firstAppointment.dateOfBirth).toLocaleDateString()
              : "N/A",
            bloodGroup: firstAppointment.bloodGroup,
            height: firstAppointment.height,
            weight: firstAppointment.weight,
            country: firstAppointment.country,
            state: firstAppointment.state,
            city: firstAppointment.city,
            address: firstAppointment.patientAddress,
            lastAppointmentDate: firstAppointment.appointmentDate.split("T")[0],
            lastAppointmentTime: firstAppointment.appointmentTime,
            doctorName: firstAppointment.doctorName,
            profileImage: firstAppointment.profileImage,
          });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [id]);

  const handleViewClick = async (appointment) => {
    try {
      const response = await api.get(`/prescription/${appointment.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedPrescription(response.data.prescription); // Set prescription data
      setPrescriptionModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  };

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-6 bg-white rounded-xl m-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patient Details</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center px-4 py-2 bg-customBlue text-white rounded-lg"
          >
            <FaPlus className="mr-2" />
            Add Record
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:8000/${patientData.profileImage}`}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex-grow ml-6 mt-4">
            <div className="grid grid-cols-7 gap-x-12 gap-y-4">
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Name</p>{" "}
                {`${patientData.firstName} ${patientData.lastName}`}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Number</p>{" "}
                {patientData.phoneNumber}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Email</p> {patientData.email}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Gender</p> {patientData.gender}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">DOB</p> {patientData.dateOfBirth}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Age</p> {patientData.age} Years
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Blood Group</p>{" "}
                {patientData.bloodGroup}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Height (cm)</p>{" "}
                {patientData.height}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Weight (Kg)</p>{" "}
                {patientData.weight}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Country</p> {patientData.country}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">State</p> {patientData.state}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">City</p> {patientData.city}
              </div>
              <div className="col-span-2 font-semibold leading-5">
                <p className="text-gray-400">Address</p> {patientData.address}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* All Appointments Section */}
      <div className="p-6 bg-white rounded-xl m-6">
        <h3 className="text-lg font-semibold mb-4">All Appointments</h3>
        <table className="min-w-full table-auto overflow-hidden rounded-lg custom-scroll">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">
                Disease Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Patient Issue
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Appointment Date
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Appointment Time
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Appointment Type
              </th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{appointment.diseaseName}</td>
                <td className="p-3">{appointment.patientIssue || "N/A"}</td>
                <td className="p-3">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-blue-600 ">
                  <span className="rounded-full py-1 px-2 bg-blue-100">
                    {appointment.appointmentTime}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      appointment.appointmentType === "Online"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {appointment.appointmentType}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="text-customBlue p-1 text-lg bg-gray-100 rounded-lg"
                    onClick={() => handleViewClick(appointment)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Record Modal */}
      <AddRecordPage
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={id}
        doctorId={doctorId}
        onSuccess={() => {
          console.log("Record added successfully");
          setModalOpen(false);
        }}
      />

      {/* Prescription Modal */}
      {prescriptionModalOpen && selectedPrescription && (
        <PrescriptionModal
          open={prescriptionModalOpen}
          handleClose={() => setPrescriptionModalOpen(false)}
          prescriptionData={selectedPrescription}
        />
      )}
    </>
  );
};

export default PatientDetailPage;
