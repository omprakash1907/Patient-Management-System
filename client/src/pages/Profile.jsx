import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivacyPolicy from "../components/Profile/PrivacyPolicy";
import TermsAndConditions from "../components/Profile/TermsAndConditions";
import ChangePassword from "../components/Profile/ChangePassword";
import ProfileView from "../components/Profile/ProfileView";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";


const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-100  py-16 md:px-36  px-16  h-full">
      {/* Header */}
      <ProfileHeader title="Profile Setting" />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full mt-8  mx-auto bg-white shadow-lg rounded-lg overflow-hidden z-10 relative">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 border-r">
          <ProfileSidebar />
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4">
          <Routes>
            <Route
              path="/"
              element={<ProfileView onEdit={() => navigate("/edit-profile")} />}
            />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
