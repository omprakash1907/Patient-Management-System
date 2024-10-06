import React, { useState } from 'react';
import PatientSidebar from './PatientSidebar';
import PatientNavbar from './PatientNavbar';

const PatientLayout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('Personal Health Record'); // Default active menu

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <PatientSidebar onMenuClick={handleMenuClick} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <PatientNavbar activeMenu={activeMenu} />

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
};

export default PatientLayout;
