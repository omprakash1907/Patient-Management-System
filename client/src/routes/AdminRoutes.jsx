// src/routes/AdminRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import CreateDoctor from "../pages/admin/CreateDoctor";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/create-doctor"
        element={
          <AdminLayout>
            <CreateDoctor />
          </AdminLayout>
        }
      />
      {/* Add more admin-specific routes here */}
    </Routes>
  );
};

export default AdminRoutes;
