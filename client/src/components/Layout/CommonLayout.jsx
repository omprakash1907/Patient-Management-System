import React from 'react';
import CommonSidebar from './CommonSidebar';
import CommonNavbar from './CommonNavbar';

const CommonLayout = ({ children, role }) => {
  return (
    <div className="flex h-screen">
      <CommonSidebar role={role} />
      <div className="flex-1 flex flex-col">
        <CommonNavbar role={role} />
        <main className="flex-1 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default CommonLayout;
