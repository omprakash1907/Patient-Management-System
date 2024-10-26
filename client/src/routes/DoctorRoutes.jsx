// src/routes/DoctorRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../components/Layout/CommonLayout";
import Profile from "../pages/Profile";
import EditProfile from "../components/Profile/EditProfile";
import AppointmentManagement from "../pages/doctor/AppointmentManagement";
import AppointmentTimeSlot from "../pages/doctor/AppointmentTimeSlot";
import EditAppointment from "../pages/doctor/EditAppointment";
import PatientRecordAccess from "../pages/doctor/PatientRecordAccess";
import CreatePrescriptionPage from "../pages/doctor/CreatePrescriptionPage";
import CreatePrescriptionForm from "../pages/doctor/CreatePrescriptionForm";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/profile-setting/*"
        element={
          <CommonLayout role="doctor">
            <Profile />
          </CommonLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <CommonLayout role="doctor">
            <EditProfile />
          </CommonLayout>
        }
      />
      <Route
        path="/appointment-management"
        element={
          <CommonLayout role="doctor">
            <AppointmentManagement />
          </CommonLayout>
        }
      />
      <Route
        path="/appointment-timeslot"
        element={
          <CommonLayout role="doctor">
            <AppointmentTimeSlot />
          </CommonLayout>
        }
      />
      <Route
        path="/edit-appointment"
        element={
          <CommonLayout role="doctor">
            <EditAppointment />
          </CommonLayout>
        }
      />
      <Route
        path="/patient-record-access"
        element={
          <CommonLayout role="doctor">
            <PatientRecordAccess />
          </CommonLayout>
        }
      />
      <Route
        path="/create-prescription"
        element={
          <CommonLayout role="doctor">
            <CreatePrescriptionPage />
          </CommonLayout>
        }
      />
      <Route
        path="/create-prescription/:id"
        element={
          <CommonLayout role="doctor">
            <CreatePrescriptionForm />
          </CommonLayout>
        }
      />
      {/* Add more doctor-specific routes here */}
    </Routes>
  );
};

export default DoctorRoutes;
