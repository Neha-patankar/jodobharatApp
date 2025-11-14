import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ✅ Fetch members
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/members`);
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to fetch members", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ Delete member
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await axios.delete(`${Base_url}/api/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // ✅ Start Editing
  const handleEdit = (member) => {
    setEditingId(member._id);
    setEditData(member);
  };

  // ✅ Save Edit
  const handleSave = async () => {
    try {
      await axios.put(`${Base_url}/api/members/${editingId}`, editData);
      setEditingId(null);
      fetchMembers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Members</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Address</th>
               <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Community</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-t">
                <td className="px-4 py-2 border">
                  {editingId === member._id ? (
                    <input
                      className="border px-2 py-1"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    member.name
                  )}
                </td>

                 <td className="px-4 py-2 border">
                  {editingId === member._id ? (
                    <input
                      className="border px-2 py-1"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                  ) : (
                    member.address
                  )}
                </td>

                  <td className="px-4 py-2 border">
                  {editingId === member._id ? (
                    <input
                      className="border px-2 py-1"
                      value={editData.mobile}
                      onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                    />
                  ) : (
                    member.mobile
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {editingId === member._id ? (
                    <input
                      className="border px-2 py-1"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingId === member._id ? (
                    <input
                      className="border px-2 py-1"
                      value={editData.communityName}
                      onChange={(e) => setEditData({ ...editData, communityName: e.target.value })}
                    />
                  ) : (
                    member.communityName
                  )}
                </td>
                <td className="px-4 py-2 border flex gap-2">
                  {editingId === member._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(member)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMembers;
