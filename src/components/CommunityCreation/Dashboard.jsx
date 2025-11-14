import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Create Community", path: "/community-creation" },
    { label: "Community Table", path: "/community-table" },
    { label: "Register Member", path: "/member-registration" },
    { label: "All Members", path: "/allmembers" },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {buttons.map((btn) => (
          <button
            key={btn.path}
            onClick={() => navigate(btn.path)}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
