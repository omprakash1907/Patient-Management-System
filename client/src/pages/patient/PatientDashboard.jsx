import React from "react";
import PatientDetails from "../../components/Patient/PatientDetails";
import PrescriptionList from "../../components/Patient/PrescriptionList";
import TestReports from "../../components/Patient/TestReports";
import PatientStatus from "../../components/Patient/PatientStatus";
import MedicalHistory from "../../components/Patient/MedicalHistory";

const PatientDashboard = () => {
  return (
    <div className="">
      {/* Patient Details at the top */}
      <PatientDetails />

      {/* Grid Layout for Medical History, Prescriptions, Test Reports, and Patient Status */}
      <div className="grid grid-cols-8 gap-6">
        {/* Medical History on the left */}
        <div className="col-span-5">
          <MedicalHistory />
        </div>

        {/* Prescriptions on the right */}
        <div className="col-span-3">
          <PrescriptionList />
        </div>

        {/* Test Reports across two columns below Medical History */}
        <div className="col-span-5">
          <TestReports />
        </div>

        {/* Patient Status on the right below Prescriptions */}
        <div className="col-span-3">
          <PatientStatus />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
