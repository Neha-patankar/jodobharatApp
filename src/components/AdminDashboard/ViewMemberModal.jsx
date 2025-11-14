import React from "react";

const ViewMemberModal = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Member Details
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 text-xl font-bold"
        >
          ✕
        </button>
        <div className="space-y-2">
          <p><strong>Member Code:</strong> {member.memberCode}</p>
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Login Mobile:</strong> {member.loginMobile}</p>
          <p><strong>Community:</strong> {member.communityName}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Gender:</strong> {member.gender}</p>
          <p><strong>City:</strong> {member.city}</p>
          <p><strong>Registered On:</strong> {new Date(member.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberModal;
