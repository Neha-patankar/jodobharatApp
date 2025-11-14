// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ViewMemberModal from "./ViewMemberModal";
// import EditMemberForm from "./EditMemberForm";
// import { Base_url } from "../../apiConfig/api";
// import Header from "./Header";

// const AdminDetails = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [editMember, setEditMember] = useState(null);

 

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get(`${Base_url}/api/memberRegistration`);
//       if (res.data.success) {
//         setMembers(res.data.members);
//       }
//     } catch (err) {
//       console.error("Error fetching members:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   // ✅ Delete Member
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;
//     try {
//       await axios.delete(`${Base_url}/api/memberRegistration/${id}`);
//       alert("Member deleted successfully");
//       fetchMembers();
//     } catch (error) {
//       alert("Failed to delete member");
//     }
//   };

//   // ✅ Status Change (Active / Inactive)
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await axios.put(
//         `${Base_url}/api/memberRegistration/status/${id}`,
//         { status: newStatus }
//       );

//       if (res.data.success) {
//         if (newStatus === "active") {
//           const memberCode = res.data.member?.memberCode || "N/A";
//           alert(`✅ Member activated successfully!\nMember Code: ${memberCode}`);
//         } else {
//           alert("❌ Member deactivated successfully!");
//         }
//         fetchMembers();
//       } else {
//         alert("Failed to update status");
//       }
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Something went wrong while updating status.");
//     }
//   };

//   // ✅ Toggle Admin (Subadmin) Role
//   const handleAdminToggle = async (id, memberType) => {
//     try {
//       await axios.put(`${Base_url}/api/memberRegistration/type/${id}`, {
//         memberType,
//       });
//       alert(
//         memberType === "subadmin"
//           ? "✅ This member is now Subadmin"
//           : "❌ This member is no longer Subadmin"
//       );
//       fetchMembers();
//     } catch (err) {
//       console.error("Error toggling admin role:", err);
//       alert("Failed to change admin role");
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading members...</p>;

//   return (
//     <div className="p-0 bg-gray-50 min-h-screen pt-20">
//       <Header/>
//       <h1 className=" font-bold text-xl py-2  text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
//         Admin & Member Details
//       </h1>

//       <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-2 px-3">S.No</th>
//               <th className="py-2 px-3">Image</th>
//               <th className="py-2 px-3">Member Code</th>
//               <th className="py-2 px-3">Name</th>
//               <th className="py-2 px-3">Login Mobile</th>
//               <th className="py-2 px-3">Community Name</th>
//               <th className="py-2 px-3">Status</th>
//               <th className="py-2 px-3">SubAdmin</th>
//               <th className="py-2 px-3">Registered On</th>
//               <th className="py-2 px-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {members.length > 0 ? (
//               members.map((m, i) => (
//                 <tr
//                   key={m._id}
//                   className="border-b hover:bg-gray-50 text-center"
//                 >
//                   <td>{i + 1}</td>

//                   {/* ✅ Show Image */}
//                   <td>
//                     {m.image ? (
//                       <img
//                         src={`${Base_url}/${m.image.replace(/\\/g, "/")}`}
//                         alt="Member"
//                         className="w-12 h-12 rounded-full object-cover mx-auto"
//                       />
//                     ) : (
//                       "—"
//                     )}
//                   </td>

//                   <td>{m.memberCode || "—"}</td>
//                   <td>{m.name}</td>
//                   <td>{m.loginMobile}</td>
//                   <td>{m.communityName || "—"}</td>

//                   {/* ✅ Status Dropdown */}
//                   <td>
//                     <select
//                       value={m.status || "inactive"}
//                       onChange={(e) => handleStatusChange(m._id, e.target.value)}
//                       className={`px-2 py-1 rounded-lg text-white ${
//                         m.status === "active" ? "bg-green-600" : "bg-gray-500"
//                       }`}
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </td>

//                   {/* ✅ Admin Checkbox */}
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={m.memberType === "subadmin"}
//                       onChange={(e) =>
//                         handleAdminToggle(
//                           m._id,
//                           e.target.checked ? "subadmin" : "member"
//                         )
//                       }
//                     />
//                     <span className="ml-2">
//                       {m.memberType === "subadmin" ? "Yes" : "No"}
//                     </span>
//                   </td>

//                   <td>{new Date(m.createdAt).toLocaleString()}</td>

//                   <td className="flex justify-center gap-2 py-2">
//                     <button
//                       onClick={() => setSelectedMember(m)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => setEditMember(m)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(m._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="py-4 text-gray-600">
//                   No members found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ View Modal */}
//       {selectedMember && (
//         <ViewMemberModal
//           member={selectedMember}
//           onClose={() => setSelectedMember(null)}
//         />
//       )}

//       {/* ✅ Edit Form */}
//       {editMember && (
//         <EditMemberForm
//           member={editMember}
//           onClose={() => setEditMember(null)}
//           refresh={fetchMembers}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDetails;



import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewMemberModal from "./ViewMemberModal";
import EditMemberForm from "./EditMemberForm";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";

const AdminDetails = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMember, setEditMember] = useState(null);

  // ✅ Filter states
  const [filters, setFilters] = useState({
    memberCode: "",
    name: "",
    loginMobile: "",
    communityName: "",
    status: "",
    subAdmin: "",
  });

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/memberRegistration`);
      if (res.data.success) {
        setMembers(res.data.members);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ Delete Member
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${Base_url}/api/memberRegistration/${id}`);
      alert("Member deleted successfully");
      fetchMembers();
    } catch (error) {
      alert("Failed to delete member");
    }
  };

  // ✅ Status Change (Active / Inactive)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `${Base_url}/api/memberRegistration/status/${id}`,
        { status: newStatus }
      );

      if (res.data.success) {
        if (newStatus === "active") {
          const memberCode = res.data.member?.memberCode || "N/A";
          alert(`✅ Member activated successfully!\nMember Code: ${memberCode}`);
        } else {
          alert("❌ Member deactivated successfully!");
        }
        fetchMembers();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong while updating status.");
    }
  };

  // ✅ Toggle Admin (Subadmin) Role
  const handleAdminToggle = async (id, memberType) => {
    try {
      await axios.put(`${Base_url}/api/memberRegistration/type/${id}`, {
        memberType,
      });
      alert(
        memberType === "subadmin"
          ? "✅ This member is now Subadmin"
          : "❌ This member is no longer Subadmin"
      );
      fetchMembers();
    } catch (err) {
      console.error("Error toggling admin role:", err);
      alert("Failed to change admin role");
    }
  };

  // ✅ Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Apply local filtering
  const filteredMembers = members.filter((m) => {
    return (
      m.memberCode?.toLowerCase().includes(filters.memberCode.toLowerCase()) &&
      m.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      m.loginMobile?.toLowerCase().includes(filters.loginMobile.toLowerCase()) &&
      m.communityName?.toLowerCase().includes(filters.communityName.toLowerCase()) &&
      (filters.status ? m.status === filters.status : true) &&
      (filters.subAdmin
        ? filters.subAdmin === "yes"
          ? m.memberType === "subadmin"
          : m.memberType !== "subadmin"
        : true)
    );
  });

  if (loading) return <p className="text-center mt-4">Loading members...</p>;

  return (
    <div className="p-0 bg-gray-50 min-h-screen pt-20">
      <Header />
      <h1 className="font-bold text-xl py-2 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
        Admin & Member Details
      </h1>

      {/* ✅ Filter Section with Labels */}
      <div className="bg-white shadow-md rounded-2xl p-4 m-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter Members</h2>
        <div className="grid md:grid-cols-6 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Member Code</label>
            <input
              type="text"
              name="memberCode"
              placeholder="Enter Member Code"
              value={filters.memberCode}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={filters.name}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Login Mobile</label>
            <input
              type="text"
              name="loginMobile"
              placeholder="Enter Mobile"
              value={filters.loginMobile}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Community Name</label>
            <input
              type="text"
              name="communityName"
              placeholder="Enter Community"
              value={filters.communityName}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">SubAdmin</label>
            <select
              name="subAdmin"
              value={filters.subAdmin}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* ✅ Count Section */}
        <div className="mt-4 text-sm text-gray-700 font-medium">
          Showing <span className="text-blue-700">{filteredMembers.length}</span> of{" "}
          <span className="text-green-700">{members.length}</span> total members
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-3">S.No</th>
              <th className="py-2 px-3">Image</th>
              <th className="py-2 px-3">Member Code</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Login Mobile</th>
              <th className="py-2 px-3">Community Name</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">SubAdmin</th>
              <th className="py-2 px-3">Registered On</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((m, i) => (
                <tr
                  key={m._id}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td>{i + 1}</td>

                  <td>
                    {m.image ? (
                      <img
                        src={`${Base_url}/${m.image.replace(/\\/g, "/")}`}
                        alt="Member"
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>{m.memberCode || "—"}</td>
                  <td>{m.name}</td>
                  <td>{m.loginMobile}</td>
                  <td>{m.communityName || "—"}</td>

                  <td>
                    <select
                      value={m.status || "inactive"}
                      onChange={(e) => handleStatusChange(m._id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-white ${
                        m.status === "active" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={m.memberType === "subadmin"}
                      onChange={(e) =>
                        handleAdminToggle(
                          m._id,
                          e.target.checked ? "subadmin" : "member"
                        )
                      }
                    />
                    <span className="ml-2">
                      {m.memberType === "subadmin" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td>{new Date(m.createdAt).toLocaleString()}</td>

                  <td className="flex justify-center gap-2 py-2">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditMember(m)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-4 text-gray-600">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ View Modal */}
      {selectedMember && (
        <ViewMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* ✅ Edit Form */}
      {editMember && (
        <EditMemberForm
          member={editMember}
          onClose={() => setEditMember(null)}
          refresh={fetchMembers}
        />
      )}
    </div>
  );
};

export default AdminDetails;
