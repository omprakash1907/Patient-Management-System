import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";

const PrescriptionPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // Full prescription data
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Prescriptions", path: "/patient/prescriptions" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription");
        setPrescriptions(response.data.prescriptions || []); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = async (prescriptionId) => {
    try {
      // Fetch the full details of the selected prescription using the prescriptionId
      const response = await api.get(`/prescription/${prescriptionId}`);
      setSelectedPrescription(response.data); // Set the full prescription data
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching prescription details:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Here"
            className="rounded-3xl py-2 px-4 pr-10 w-64 bg-gray-50 bottom-0"
          />
          <FaSearch className="absolute top-2/4 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Grid Layout for Prescriptions */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {prescriptions.map((prescription, index) => (
          <div
            key={prescription._id || index} // Use prescription ID if available, otherwise fallback to index
            className="border rounded-lg transition"
          >
            {/* Card header with doctor name and eye icon */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg ">
              <h4 className="font-semibold">
                Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
              </h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow cursor-pointer">
                <FaEye onClick={() => openModal(prescription._id)} />
              </div>
            </div>

            {/* Hospital, Disease, and Date Information */}
            <div className="grid grid-cols-2 gap-2 py-4 px-2 text-sm ">
              <p className="text-gray-500">Hospital Name</p>
              <p className="text-gray-900 font-medium text-end">
                {prescription.appointmentId.hospital}
              </p>

              <p className="text-gray-500">Disease Name</p>
              <p className="text-gray-900 font-medium text-end">
                {prescription.medicines[0]?.name || "N/A"}
              </p>

              <p className="text-gray-500">Date</p>
              <p className="text-gray-900 font-medium text-end">
                {new Date(prescription.prescriptionDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescription && (
        <PrescriptionModal
          closeModal={closeModal}
          prescriptionData={selectedPrescription} // Pass the full prescription data
        />
      )}
    </div>
  );
};

export default PrescriptionPage;
