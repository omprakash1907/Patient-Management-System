// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminSignup from './components/Auth/AdminSignup';
import Layout from './components/Layout';
import CreateDoctor from './pages/admin/CreateDoctor';
import DoctorProfile from './pages/doctor/DoctorProfile';
import Otp from './components/Auth/Otp';
import ResetPassword from './components/Auth/ResetPassword';
import AdminLayout from './components/Admin/AdminLayout';
import DoctorLayout from './components/Doctor/DoctorLayout';
import PatientLayout from './components/Patient/PatientLayout';
import PatientDashboard from './pages/Patient/PatientDashboard';
import PatientEditProfile from './pages/Patient/PatientEditProfile';
import PrescriptionPage from './pages/Patient/PrescriptionPage';

const App = () => {

  const userRole = 'patient';

  const getLayout = (children) => {
    switch (userRole) {
      case 'admin':
        return <AdminLayout>{children}</AdminLayout>;
      case 'doctor':
        return <DoctorLayout>{children}</DoctorLayout>;
      case 'patient':
        return <PatientLayout>{children}</PatientLayout>;
      default:
        return <Login />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/create-doctor" element={<Layout><CreateDoctor /></Layout>} />
        {userRole === 'patient' && (
          <Route
            path="/patient-dashboard"
            element={<PatientLayout><PatientDashboard /></PatientLayout>}
          />
        )}
        {userRole === 'patient' && (
          <Route
            path="/edit-patient-profile"
            element={<PatientLayout><PatientEditProfile /></PatientLayout>}
          />
        )}
        {userRole === 'patient' && (
          <Route
            path="/prescriptions"
            element={<PatientLayout><PrescriptionPage /></PatientLayout>}
          />
        )}
        <Route path="/doctor-profile" element={<Layout><DoctorProfile /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
