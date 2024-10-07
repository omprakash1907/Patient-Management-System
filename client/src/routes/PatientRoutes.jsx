// src/routes/PatientRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientLayout from "../components/Patient/PatientLayout";
import PatientDashboard from "../pages/Patient/PatientDashboard";
import PatientEditProfile from "../pages/Patient/PatientEditProfile";
import PrescriptionPage from "../pages/Patient/PrescriptionPage";
import TestReportPage from "../pages/Patient/TestReportPage";
import MedicalHistory from "../components/Patient/MedicalHistory";
import MedicalHistoryPage from "../pages/Patient/MedicalHistoryPage";
import AppointmentBookingPage from "../pages/Patient/AppointmentBookingPage";
import PrescriptionAccessPage from "../pages/Patient/PrescriptionAccessPage";
import ChatPage from "../pages/Patient/ChatPage";
import BillPage from "../pages/Patient/BillPage";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route
        path="/patient-dashboard"
        element={
          <PatientLayout>
            <PatientDashboard />
          </PatientLayout>
        }
      />
      <Route
        path="/edit-patient-profile"
        element={
          <PatientLayout>
            <PatientEditProfile />
          </PatientLayout>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <PatientLayout>
            <PrescriptionPage />
          </PatientLayout>
        }
      />
      <Route
        path="/test-report"
        element={
          <PatientLayout>
            <TestReportPage />
          </PatientLayout>
        }
      />
      <Route
        path="/medical-history"
        element={
          <PatientLayout>
            <MedicalHistoryPage />
          </PatientLayout>
        }
      />
      <Route
        path="/appointment-booking"
        element={
          <PatientLayout>
            <AppointmentBookingPage />
          </PatientLayout>
        }
      />
      <Route
        path="/prescription-access"
        element={
          <PatientLayout>
            <PrescriptionAccessPage />
          </PatientLayout>
        }
      />
      <Route
        path="/chat"
        element={
          <PatientLayout>
            <ChatPage />
          </PatientLayout>
        }
      />
      <Route
        path="/bills"
        element={
          <PatientLayout>
            <BillPage />
          </PatientLayout>
        }
      />
    </Routes>
  );
};

export default PatientRoutes;
