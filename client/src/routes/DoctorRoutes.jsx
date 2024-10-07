// src/routes/DoctorRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorLayout from "../components/Doctor/DoctorLayout";
import DoctorProfile from "../pages/doctor/DoctorProfile";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/doctor/doctor-profile"
        element={
          <DoctorLayout>
            <DoctorProfile />
          </DoctorLayout>
        }
      />
      {/* Add more doctor-specific routes here */}
    </Routes>
  );
};

export default DoctorRoutes;
