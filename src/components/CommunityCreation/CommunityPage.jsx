


// components/CommunityPage.jsx
import React from "react";

const CommunityPage = () => {
  const member = JSON.parse(localStorage.getItem("member"));

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {member?.name}!</h1>
      <p className="text-xl mb-2">
        You are part of the <strong>{member?.communityName}</strong> community.
      </p>
      <p className="text-gray-600">Community ID: {member?.communityId}</p>
    </div>
  );
};

export default CommunityPage;
