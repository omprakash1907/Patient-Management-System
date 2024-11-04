import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaDownload, FaEye, FaImage, FaTimes } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import logo from "../../assets/images/logo.png";
import sign from "../../assets/images/sign.png";
import noRecordImage from "../../assets/images/norecord.png"; // Ensure this path is correct
import api from "../../api/api";
import PrescriptionModal from "../../components/PrescritionModal";
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
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

  const handleDownload = (prescription) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prescription", 10, 10);
    doc.addImage(logo, "PNG", 160, 10, 30, 10);
    doc.setFontSize(12);
    doc.text(`Dr. ${prescription.doctor.firstName} ${prescription.doctor.lastName}`, 10, 30);
    doc.text(`Specialty: ${prescription.doctor.specialty}`, 10, 40);
    doc.text(`Patient: ${prescription.patient.firstName} ${prescription.patient.lastName}`, 10, 60);
    doc.text(`Age: ${prescription.patient.age} Years`, 10, 70);
    doc.text(`Gender: ${prescription.patient.gender}`, 10, 80);
    doc.text(`Address: ${prescription.patient.address}`, 10, 90);
    doc.text(`Prescription Date: ${new Date(prescription.prescriptionDate).toLocaleDateString()}`, 10, 100);
    doc.text("Medicines:", 10, 120);
    let y = 130;

    prescription.medicines.forEach((med, index) => {
      doc.text(
        `${index + 1}. ${med.name} - ${med.strength}, Dose: ${med.dose}, Duration: ${med.duration}, When to Take: ${med.whenToTake}`,
        10,
        y
      );
      y += 10;
    });

    if (prescription.additionalNote) {
      doc.text("Additional Note:", 10, y + 10);
      doc.text(prescription.additionalNote, 10, y + 20);
    }

    doc.addImage(sign, "PNG", 10, y + 40, 50, 15);
    doc.text("Doctor's Signature", 10, y + 60);
    doc.save("prescription.pdf");
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const prescriptionDate = new Date(prescription.prescriptionDate);
    return (
      (!startDate || prescriptionDate >= startDate) &&
      (!endDate || prescriptionDate <= endDate)
    );
  });

  const resetDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescription Access</h2>
        <div className="relative flex items-center space-x-2">
          <FaCalendarAlt className="text-gray-500" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="border rounded-l-md px-2 py-1 focus:outline-none"
          />
          <span className="px-2">-</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="border rounded-r-md px-2 py-1 focus:outline-none"
          />
          {(startDate || endDate) && (
            <FaTimes
              onClick={resetDateFilter}
              className="text-red-500 cursor-pointer ml-2"
            />
          )}
        </div>
      </div>

      {/* Prescription Cards or No Records Message */}
      {filteredPrescriptions.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="border rounded-xl border-gray-100 bg-white transition"
            >
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold ">
                  Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
                </h4>
                <div className="flex gap-2">
                  <div
                    className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2"
                    onClick={() => handleDownload(prescription)}
                  >
                    <FaDownload />
                  </div>
                  <div
                    className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2 mr-2"
                    onClick={() => openModal(prescription)}
                  >
                    <FaEye />
                  </div>
                </div>
              </div>

              <div className="p-4 text-sm text-gray-700 space-y-1">
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Hospital Name</span> {prescription.appointmentId.hospital}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Disease Name</span> {prescription.medicines[0]?.name || "N/A"}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Date</span>
                  {new Date(prescription.prescriptionDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Time</span> {prescription.appointmentId.appointmentTime}
                </p>
              </div>

              <div className="flex items-center border-2 m-4 rounded-xl p-2">
                <div className="text-blue-500 rounded-xl p-4 text-3xl bg-gray-50">
                  <FaImage />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Prescription.jpg</p>
                  <p className="text-xs text-gray-500">5.09 MB</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <img src={noRecordImage} alt="No records found" />
        </div>
      )}

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

export default PrescriptionAccessPage;
