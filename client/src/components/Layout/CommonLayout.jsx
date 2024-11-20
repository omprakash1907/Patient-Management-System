import React, { useState } from 'react';
import CommonSidebar from './CommonSidebar';
import CommonNavbar from './CommonNavbar';

const CommonLayout = ({ children, role }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <CommonSidebar role={role} isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Section */}
        <CommonNavbar role={role} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CommonLayout;
