import React, { useEffect } from "react";
import PatientDetails from "../../components/Patient/PatientDetails";
import PrescriptionList from "../../components/Patient/PrescriptionList";
import TestReports from "../../components/Patient/TestReports";
import PatientStatus from "../../components/Patient/PatientStatus";
import MedicalHistory from "../../components/Patient/MedicalHistory";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const PatientDashboard = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
    ]);
  }, [updateBreadcrumb]);

  return (
    <div className="flex flex-col p-6"> 
      {/* Patient Details at the top */}
      <PatientDetails />

      {/* Grid Layout for Medical History, Prescriptions, Test Reports, and Patient Status */}
      <div className="grid grid-cols-8 gap-4 "> 
        {/* Left Column: Medical History */}
        <div className="col-span-5 flex flex-col">
          <MedicalHistory className="flex-1 h-full" />
        </div>

        {/* Right Column: Prescriptions */}
        <div className="col-span-3 flex flex-col">
          <PrescriptionList className="flex-1 h-full" />
        </div>
      </div>

      {/* Second row for Test Reports and Patient Status */}
      <div className="grid grid-cols-8 gap-4 flex-1 mt-4"> 
        {/* Test Reports */}
        <div className="col-span-5 flex flex-col">
          <TestReports className="flex-1 h-full" />
        </div>

        {/* Patient Status */}
        <div className="col-span-3 flex flex-col">
          <PatientStatus className="flex-1 h-full" />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
