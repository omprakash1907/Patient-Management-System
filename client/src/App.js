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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/create-doctor" element={<Layout><CreateDoctor /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
