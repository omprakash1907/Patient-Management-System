import React from "react";
import StatisticsCards from "../../components/Admin/StatisticsCards";
import PatientsStatistics from "../../components/Admin/PatientsStatistics";
import AppointmentsList from "../../components/Admin/AppointmentsList";
import BillingTable from "../../components/Admin/BillingTable";
import PatientsSummary from "../../components/Admin/PatientsSummary";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Row 1: Statistics Cards and Billing Table */}
        <div className="lg:col-span-3 space-y-6">
          <StatisticsCards />
          <PatientsStatistics />
        </div>
        <div className="lg:col-span-2 space-y-6 ">
          <BillingTable />
        </div>

        {/* Row 2: Patients Summary and Appointments List */}
        <div className="lg:col-span-3">
          <AppointmentsList />
        </div>
        <div className="lg:col-span-2">
          <PatientsSummary />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
