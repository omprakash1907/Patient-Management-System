// src/routes/AdminRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import CreateDoctor from "../pages/admin/CreateDoctor";
import AdminProfile from "../components/Admin/AdminProfile";
import AdminEditProfile from "../components/Profile/AdminEditProfile";
import DoctorManagement from "../pages/admin/DoctorManagement";
import EditDoctor from "../pages/admin/EditDoctor";
import AddDoctor from "../pages/admin/AddDoctor";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/create-doctor"
        element={
          <AdminLayout>
            <CreateDoctor />
          </AdminLayout>
        }
      />
      <Route
        path="/profile-setting/*"
        element={
          <AdminLayout>
            <AdminProfile />
          </AdminLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <AdminLayout>
            <AdminEditProfile />
          </AdminLayout>
        }
      />
      <Route
        path="/doctor-management"
        element={
          <AdminLayout>
            <DoctorManagement />
          </AdminLayout>
        }
      />
      <Route
        path="/doctor-management/add-doctor"
        element={
          <AdminLayout>
            <AddDoctor />
          </AdminLayout>
        }
      />
      <Route
        path="/doctor-management/edit/:id"
        element={
          <AdminLayout>
            <EditDoctor />
          </AdminLayout>
        }
      />
      {/* Add more admin-specific routes here */}
    </Routes>
  );
};

export default AdminRoutes;
