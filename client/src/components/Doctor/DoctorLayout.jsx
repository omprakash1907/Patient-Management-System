import React from 'react';
import DoctorSidebar from './DoctorSidebar';
import DoctorNavbar from './DoctorNavbar';

const DoctorLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <DoctorSidebar />
      <div className="flex-1">
        <DoctorNavbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DoctorLayout;
