// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminSignup from "./components/Auth/AdminSignup";
import Otp from "./components/Auth/Otp";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Layout";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";

const App = () => {
  const userRole = "doctor"; // This should be dynamically set based on the logged-in user

  return (
    <BreadcrumbProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<Otp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/dashboard" element={<Layout><Home /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />

          {/* Role-Based Routes */}
          {userRole === "admin" && <Route path="/admin/*" element={<AdminRoutes />} />}
          {userRole === "doctor" && <Route path="/doctor/*" element={<DoctorRoutes />} />}
          {userRole === "patient" && <Route path="/patient/*" element={<PatientRoutes />} />}
        </Routes>
      </Router>
    </BreadcrumbProvider>
  );
};

export default App;
