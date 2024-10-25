// src/routes/DoctorRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../components/Layout/CommonLayout";
import Profile from "../pages/Profile";
import EditProfile from "../components/Profile/EditProfile";
import AppointmentManagement from "../pages/doctor/AppointmentManagement";
import AppointmentTimeSlot from "../pages/doctor/AppointmentTimeSlot";
import EditAppointment from "../pages/doctor/EditAppointment";

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
      {/* Add more doctor-specific routes here */}
    </Routes>
  );
};

export default DoctorRoutes;
