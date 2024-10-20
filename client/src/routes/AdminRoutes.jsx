import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateDoctor from "../pages/admin/CreateDoctor";
import DoctorManagement from "../pages/admin/DoctorManagement";
import EditDoctor from "../pages/admin/EditDoctor";
import AddDoctor from "../pages/admin/AddDoctor";
import PatientManagement from "../pages/admin/PatientManagement";
import MonitorBilling from "../components/Admin/MonitorBilling";
import Invoice from "../pages/admin/Invoice";
import CreateBill from "../pages/admin/CreateBill";
import InsuranceClaims from "../pages/admin/InsuranceClaims";
import PaymentProcess from "../pages/admin/PaymentProcess";
import EditBill from "../pages/admin/EditBill";
import ReportingAndAnalytics from "../pages/admin/ReportingAndAnalytics";
import AdminDashbord from "../pages/admin/AdminDashbord";
import CommonLayout from "../components/Layout/CommonLayout";
import Profile from "../pages/Profile";
import EditProfile from "../components/Profile/EditProfile";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/create-doctor"
        element={
          <CommonLayout role="admin">
            <CreateDoctor />
          </CommonLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <CommonLayout role="admin">
            <AdminDashbord />
          </CommonLayout>
        }
      />
      <Route
        path="/profile-setting/*"
        element={
          <CommonLayout role="admin">
            <Profile />
          </CommonLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <CommonLayout role="admin">
            <EditProfile />
          </CommonLayout>
        }
      />
      <Route
        path="/doctor-management"
        element={
          <CommonLayout role="admin">
            <DoctorManagement />
          </CommonLayout>
        }
      />
      <Route
        path="/doctor-management/add-doctor"
        element={
          <CommonLayout role="admin">
            <AddDoctor />
          </CommonLayout>
        }
      />
      <Route
        path="/doctor-management/edit/:id"
        element={
          <CommonLayout role="admin">
            <EditDoctor />
          </CommonLayout>
        }
      />
      <Route
        path="/patient-management"
        element={
          <CommonLayout role="admin">
            <PatientManagement />
          </CommonLayout>
        }
      />
      <Route
        path="/monitor-billing"
        element={
          <CommonLayout role="admin">
            <MonitorBilling />
          </CommonLayout>
        }
      />
      <Route
        path="/invoice/:billId/:patientName"
        element={
          <CommonLayout role="admin">
            <Invoice />
          </CommonLayout>
        }
      />
      <Route
        path="/create-bill"
        element={
          <CommonLayout role="admin">
            <CreateBill />
          </CommonLayout>
        }
      />
      <Route
        path="/insurance-claims"
        element={
          <CommonLayout role="admin">
            <InsuranceClaims />
          </CommonLayout>
        }
      />
      <Route
        path="/payment-process"
        element={
          <CommonLayout role="admin">
            <PaymentProcess />
          </CommonLayout>
        }
      />
      <Route
        path="/payment-process/edit-bill/:id"
        element={
          <CommonLayout role="admin">
            <EditBill />
          </CommonLayout>
        }
      />
      <Route
        path="/report-analysis"
        element={
          <CommonLayout role="admin">
            <ReportingAndAnalytics />
          </CommonLayout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
