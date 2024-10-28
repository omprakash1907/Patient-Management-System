import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientDashboard from "../pages/Patient/PatientDashboard";
import PatientEditProfile from "../pages/Patient/PatientEditProfile";
import PrescriptionPage from "../pages/Patient/PrescriptionPage";
import TestReportPage from "../pages/Patient/TestReportPage";
import MedicalHistoryPage from "../pages/Patient/MedicalHistoryPage";
import AppointmentBookingPage from "../pages/Patient/AppointmentBookingPage";
import PrescriptionAccessPage from "../pages/Patient/PrescriptionAccessPage";
import ChatPage from "../pages/Patient/ChatPage";
import BillPage from "../pages/Patient/BillPage";
import TeleAccess from "../pages/Patient/TeleAccess";
import CommonLayout from "../components/Layout/CommonLayout";
import BookAppointment from "../pages/Patient/BookAppointment";
import RescheduleAppointment from "../pages/Patient/RescheduleAppointment ";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route
        path="/patient-dashboard"
        element={
          <CommonLayout role="patient">
            <PatientDashboard />
          </CommonLayout>
        }
      />
      <Route
        path="/edit-patient-profile"
        element={
          <CommonLayout role="patient">
            <PatientEditProfile />
          </CommonLayout>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <CommonLayout role="patient">
            <PrescriptionPage />
          </CommonLayout>
        }
      />
      <Route
        path="/test-report"
        element={
          <CommonLayout role="patient">
            <TestReportPage />
          </CommonLayout>
        }
      />
      <Route
        path="/medical-history"
        element={
          <CommonLayout role="patient">
            <MedicalHistoryPage />
          </CommonLayout>
        }
      />
      <Route
        path="/appointment-booking"
        element={
          <CommonLayout role="patient">
            <AppointmentBookingPage />
          </CommonLayout>
        }
      />
      <Route
        path="/appointment-booking/book-appointment"
        element={
          <CommonLayout role="patient">
            <BookAppointment />
          </CommonLayout>
        }
      />
        <Route
        path="/reschedule-appointment"
        element={
          <CommonLayout role="patient">
            <RescheduleAppointment />
          </CommonLayout>
        }
      />
      <Route
        path="/prescription-access"
        element={
          <CommonLayout role="patient">
            <PrescriptionAccessPage />
          </CommonLayout>
        }
      />
      <Route
        path="/tele-access"
        element={
          <CommonLayout role="patient">
            <TeleAccess />
          </CommonLayout>
        }
      />
      <Route
        path="/chat"
        element={
          <CommonLayout role="patient">
            <ChatPage />
          </CommonLayout>
        }
      />
      <Route
        path="/bills"
        element={
          <CommonLayout role="patient">
            <BillPage />
          </CommonLayout>
        }
      />
    </Routes>
  );
};

export default PatientRoutes;
