import React, { useEffect, useState } from "react";
import axios from "axios";
import CommunityDropdown from "./CD";
import { Base_url } from "../../apiConfig/api";
import Header from "../AdminDashboard/Header";

export const CommunityManage = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/community`);
      // Sort latest first
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunities(sortedData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${Base_url}/api/community/${id}`);
      alert("Community deleted successfully!");
      fetchCommunities();
    } catch (error) {
      console.error("Error deleting community", error);
      alert("Failed to delete community. Please try again.");
    }
  };



const handleStatusChange = async (id, newStatus) => {
  try {
    if (newStatus === "active") {
      // 🔹 When status is 'active', call activate API
      const res = await axios.patch(`${Base_url}/api/community/activate/${id}`);
      console.log("Community activated:", res.data);
      alert(`Community activated successfully! ID: ${res.data.communityId}`);
    } else {
      // 🔹 For blocked or not-active, just update status
      await axios.put(`${Base_url}/api/community/${id}`, { status: newStatus });
      alert(`Status updated to: ${newStatus}`);
    }
    fetchCommunities(); // Refresh table
  } catch (err) {
    console.error("Failed to update status", err);
    alert("Error updating status");
  }
};


  return (
    <div className="max-w-9xl mx-auto mt-8 p-4 bg-white shadow-md rounded-xl overflow-x-auto">
      <Header />

      <h2 className="text-xl font-bold text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 py-2 pt-10">
        All Communities
      </h2>

      <CommunityDropdown />

      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">S no</th>
            <th className="px-4 py-2 border">Community ID</th>
            <th className="px-4 py-2 border">Community Name</th>
            <th className="px-4 py-2 border">Country</th>
            <th className="px-4 py-2 border">State</th>
            <th className="px-4 py-2 border">City</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Logo</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community, index) => (
            <tr key={community._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border text-blue-600 font-semibold">
                {community.status === "active" ? community.communityId : "—"}
              </td>
              <td className="px-4 py-2 border">{community.communityName}</td>
              <td className="px-4 py-2 border">{community.country}</td>
              <td className="px-4 py-2 border">{community.state}</td>
              <td className="px-4 py-2 border">{community.city}</td>

              <td className="px-4 py-2 border">
                <select
                  value={community.status || "notactive"}
                  onChange={(e) =>
                    handleStatusChange(community._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="notactive">Not Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="active">Active</option>
                </select>
              </td>

              <td className="px-4 py-2 border">
                {community.createdAt
                  ? new Date(community.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="px-4 py-2 border">
                {community.startDate?.slice(0, 10)}
              </td>
              <td className="px-4 py-2 border">
                {community.endDate?.slice(0, 10)}
              </td>

              <td className="px-4 py-2 border">
                {community.logoPath ? (
                  <img
                    src={`${Base_url}/${community.logoPath}`}
                    alt="Community Logo"
                    className="h-10 w-10 object-contain rounded"
                  />
                ) : (
                  "No Logo"
                )}
              </td>

              <td className="px-4 py-2 border space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleDelete(community._id)}
                >
                  Delete
                </button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
