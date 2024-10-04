import React from 'react';

const ProfileCard = ({ title, content }) => {
  return (
    <div className="w-3/4 pl-8">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="text-gray-600">{content}</div>
    </div>
  );
};

export default ProfileCard;
