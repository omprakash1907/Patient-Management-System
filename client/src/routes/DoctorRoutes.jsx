// src/routes/DoctorRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../components/Layout/CommonLayout";
import Profile from "../pages/Profile";
import EditProfile from "../components/Profile/EditProfile";

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
      {/* Add more doctor-specific routes here */}
    </Routes>
  );
};

export default DoctorRoutes;
