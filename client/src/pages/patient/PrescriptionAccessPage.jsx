import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaCross,
  FaDownload,
  FaEye,
  FaImage,
} from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import logo from "../../assets/images/logo.png";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
    ]);
  }, [updateBreadcrumb]);

  const prescriptions = [
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Marcus Septimus",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Ahmad Arcand",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
  ];

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescription Access</h2>
        <button className="bg-customBlue text-white px-4 py-2 rounded flex items-center space-x-2">
          <FaCalendarAlt />
          <span>Date Range</span>
        </button>
      </div>

      {/* Prescription Cards */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {prescriptions.map((prescription, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md bg-white transition"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold ">{prescription.doctor}</h4>
              <div className="flex">
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2">
                  <FaDownload onClick={() => openModal(prescription)} />
                </div>
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2 mr-2">
                  <FaEye onClick={() => openModal(prescription)} />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Hospital Name</span>{" "}
                {prescription.hospital}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Disease Name</span>{" "}
                {prescription.disease}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Date</span> {prescription.date}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Time</span> {prescription.time}
              </p>
            </div>

            {/* Prescription File */}
            <div className="flex items-center border-2 m-4 rounded-lg p-2">
              <div className="text-customBlue rounded-lg p-4 text-3xl bg-gray-50">
                <FaImage />
              </div>
              <div className="ml-2">
                <p className=" font-semibold">{prescription.fileName}</p>
                <p className="text-xs text-gray-500">{prescription.fileSize}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Prescription</h2>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white rounded-full px-2 py-1 text-sm "
              >
                X
              </button>
            </div>

            {/* Header */}
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="py-2">
                  <img
                    src={logo}
                    alt="Hospital Logo"
                    className="w-48 mx-auto mb-4"
                  />
                </div>
                <div>
                  <p className="text-3xl font-bold text-customBlue">
                    Dr. Bharat Patel
                  </p>
                  <p className="text-gray-500 ">Obstetrics and Gynecology</p>
                </div>
              </div>

              <div className="grid gap-4 text-sm mb-4">
                {/* Row 1 */}
                <div className="flex justify-between items-center">
                  <p className="flex items-center">
                    <strong>Hospital Name :</strong>
                    <span className="ml-2 text-gray-600">Medical Center</span>
                  </p>
                  <p className="flex items-center">
                    <strong>Prescription Date :</strong>
                    <span className="ml-2 text-gray-600">2 Jan, 2022</span>
                  </p>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between items-center">
                  <p className="flex items-center">
                    <strong>Patient Name :</strong>
                    <span className="ml-2 text-gray-600">
                      Alabatros Bhujirao
                    </span>
                  </p>
                  <p className="flex items-center">
                    <strong>Age :</strong>
                    <span className="ml-2 text-gray-600">36 Years</span>
                  </p>
                </div>

                {/* Row 3 */}
                <div className="flex justify-between items-start">
                  <p className="flex items-center">
                    <strong>Gender :</strong>
                    <span className="ml-2 text-gray-600">Male</span>
                  </p>
                </div>

                {/* Row 4 */}
                <div>
                  <p className="flex items-start">
                    <strong>Address :</strong>
                    <span className="ml-2 text-gray-600">
                      B-105 Virat Bungalows, Punagam, Motavaracha, Jamnagar
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Prescription Details */}
            <div className="overflow-x-auto mb-4 rounded-lg">
              <table className="w-full text-left  rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 ">Medicine Name</th>
                    <th className="py-2 px-4 ">Strength</th>
                    <th className="py-2 px-4 ">Dose</th>
                    <th className="py-2 px-4 ">Duration</th>
                    <th className="py-2 px-4 ">When to Take</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Calcium carbonate",
                      strength: "100 mg",
                      dose: "1-0-1",
                      duration: "2 Days",
                      when: "Before Food",
                    },
                    {
                      name: "Cyclobenzaprine",
                      strength: "200 mg",
                      dose: "1-1-1",
                      duration: "4 Days",
                      when: "With Food",
                    },
                    {
                      name: "Fluticasone Almeterol",
                      strength: "150 mg",
                      dose: "1-0-0",
                      duration: "5 Days",
                      when: "Before Food",
                    },
                    {
                      name: "Hydrochlorothiazide",
                      strength: "250 mg",
                      dose: "0-0-1",
                      duration: "2 Days",
                      when: "After Food",
                    },
                    {
                      name: "Flonase Allergy Relief",
                      strength: "100 mg",
                      dose: "1-0-0",
                      duration: "1 Day",
                      when: "Before Food",
                    },
                  ].map((med, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="py-2 px-4 ">{med.name}</td>
                      <td className="py-2 px-4 ">{med.strength}</td>
                      <td className="py-2 px-4 ">{med.dose}</td>
                      <td className="py-2 px-4">
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full inline-block">
                          {med.duration}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block">
                          {med.when}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Note */}
            <div className="mt-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Additional Note</h3>
              <p className=" text-gray-600">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

            {/* Doctor Signature and Download Button */}
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-gray-500 text-sm italic">Doctor Signature</p>
                <img
                  src="path-to-signature-image.png"
                  alt="Doctor Signature"
                  className="mt-2"
                />
              </div>
              <button className="bg-customBlue text-white px-6 py-2 rounded flex items-center space-x-2">
                <FaDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionAccessPage;
