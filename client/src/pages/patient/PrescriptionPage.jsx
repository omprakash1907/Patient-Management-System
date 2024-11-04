import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/PrescritionModal";
import api from "../../api/api";
import noRecordImage from "../../assets/images/nodoctor.png"; // Importing the no record image

const PrescriptionPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        setPrescriptions(response.data.prescriptions || []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  // Filter prescriptions based on the search term
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const doctorName = `${prescription.doctor.firstName} ${prescription.doctor.lastName}`.toLowerCase();
    const hospitalName = prescription.appointmentId.hospital.toLowerCase();
    const diseaseName = (prescription.medicines[0]?.name || "").toLowerCase();

    return (
      doctorName.includes(searchTerm.toLowerCase()) ||
      hospitalName.includes(searchTerm.toLowerCase()) ||
      diseaseName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-white p-6 rounded-xl m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-3xl p-2 pr-10 w-64 bg-gray-50"
          />
          <FaSearch className="absolute top-2/4 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Grid Layout for Prescriptions */}
      {filteredPrescriptions.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 overflow-y-auto custom-scroll">
          {filteredPrescriptions.map((prescription, index) => (
            <div
              key={prescription._id || index}
              className="border border-gray-100 rounded-xl transition"
            >
              {/* Card header with doctor name and eye icon */}
              <div className="flex justify-between items-center p-2  bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold">
                  Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
                </h4>
                <div
                  className="text-customBlue text-xl p-2 rounded-lg bg-white cursor-pointer"
                  onClick={() => openModal(prescription)}
                >
                  <FaEye />
                </div>
              </div>

              {/* Hospital, Disease, and Date Information */}
              <div className="p-2">
                <div className="flex justify-between items-center py-1">
                  <p className="text-gray-500">Hospital Name</p>
                  <p className="text-gray-900 font-medium text-right">
                    {prescription.appointmentId.hospital}
                  </p>
                </div>
                <div className="flex justify-between items-center py-1">
                  <p className="text-gray-500">Disease Name</p>
                  <p className="text-gray-900 font-medium text-right">
                    {prescription.medicines[0]?.name || "N/A"}
                  </p>
                </div>
                <div className="flex justify-between items-center py-1">
                  <p className="text-gray-500">Date</p>
                  <p className="flex justify-end font-semibold">
                    {new Date(prescription.prescriptionDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display No Record Image if no prescriptions match the search term
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={noRecordImage} alt="No Records Found"  />
          <p className="text-gray-500 mt-4">No records found</p>
        </div>
      )}

      {/* Prescription Modal */}
      {showModal && selectedPrescription && (
        <PrescriptionModal
          open={showModal}
          handleClose={closeModal}
          prescriptionData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default PrescriptionPage;
