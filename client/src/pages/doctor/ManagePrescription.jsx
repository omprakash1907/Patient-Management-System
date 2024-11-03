import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaMale,
  FaFemale,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../api/api";
import PrescriptionModal from "../../components/PrescritionModal.jsx";
import { useBreadcrumb } from "../../context/BreadcrumbContext.jsx";
import noRecordImage from "../../assets/images/nodoctor.png"; // Importing the no record image

const ManagePrescription = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [todayPrescriptions, setTodayPrescriptions] = useState([]);
  const [olderPrescriptions, setOlderPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Tool", path: "/doctor/manage-prescription" },
      { label: "Manage", path: "/doctor/manage-prescription" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription");
        const prescriptions = response.data.prescriptions;

        const today = new Date().setHours(0, 0, 0, 0);
        const todayData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) === today
        );
        const olderData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) < today
        );

        setTodayPrescriptions(todayData);
        setOlderPrescriptions(olderData);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleModalOpen = (prescriptionId) => {
    const prescription =
      todayPrescriptions.find((pres) => pres._id === prescriptionId) ||
      olderPrescriptions.find((pres) => pres._id === prescriptionId);

    if (prescription) {
      setSelectedPrescription(prescription);
      setModalOpen(true);
    } else {
      console.error("Prescription not found.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  const currentPrescriptions =
    activeTab === 0 ? todayPrescriptions : olderPrescriptions;

  const filteredPrescriptions = currentPrescriptions.filter(
    (prescription) =>
      prescription.patient.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.patient.phoneNumber.includes(searchTerm) ||
      prescription.patient.age.toString().includes(searchTerm)
  );

  return (
    <div className="p-8 bg-white m-6 rounded-lg">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 outline-none font-medium ${
            activeTab === 0
              ? "border-b-2 border-customBlue text-customBlue"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Today's Prescriptions
        </button>
        <button
          className={`px-4 py-2 outline-none font-medium ${
            activeTab === 1
              ? "border-b-2 border-customBlue text-customBlue"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Older Prescriptions
        </button>
      </div>

      {/* Heading, Search, and Date Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Details</h2>

        {/* Search Bar */}
        <div className="flex">
          <div className="relative flex-1 mx-4 max-w-md ">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Patient"
              className="w-full pl-10 pr-4 py-2  rounded-full bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Filter */}
          <button className="flex items-center px-4 py-2 rounded-xl border border-gray-200">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span>Any Date</span>
          </button>
        </div>
      </div>

      {/* Table or No Record Image */}
      <div className="overflow-x-auto rounded-lg">
        {filteredPrescriptions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left font-semibold">Patient Name</th>
                <th className="p-4 text-left font-semibold">Phone Number</th>
                <th className="p-4 text-left font-semibold">
                  Appointment Date
                </th>
                <th className="p-4 text-left font-semibold">
                  Appointment Time
                </th>
                <th className="p-4 text-left font-semibold">Age</th>
                <th className="p-4 text-left font-semibold">Gender</th>
                <th className="p-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.map((prescription, index) => (
                <tr key={index} className="border-b ">
                  <td className="p-4">
                    {prescription.patient.firstName}{" "}
                    {prescription.patient.lastName}
                  </td>
                  <td className="p-4">{prescription.patient.phoneNumber}</td>
                  <td className="p-4">
                    {new Date(
                      prescription.appointmentId.appointmentDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-500 px-2 rounded-full py-1">
                      {prescription.appointmentId.appointmentTime}
                    </span>
                  </td>
                  <td className="p-4">{prescription.patient.age}</td>
                  <td className="p-4">
                    {prescription.patient.gender === "Male" ? (
                      <FaMale className="h-7 w-7 text-customBlue bg-gray-100 p-1 rounded-lg inline" />
                    ) : (
                      <FaFemale className="h-7 w-7 text-red-500 bg-gray-100 p-1 rounded-lg inline" />
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleModalOpen(prescription._id)}
                      className="text-customBlue bg-gray-100 p-1 rounded-lg "
                    >
                      <FaEye className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <img src={noRecordImage} alt="No records found" />
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {selectedPrescription && (
        <PrescriptionModal
          open={modalOpen}
          handleClose={handleModalClose}
          prescriptionData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default ManagePrescription;
