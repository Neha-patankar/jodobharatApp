// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ViewMemberModal from "./ViewMemberModal";
// import EditMemberForm from "./EditMemberForm";
// import { Base_url } from "../../apiConfig/api";
// import Header from "./Header";

// const CommunityMemberDetails = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [editMember, setEditMember] = useState(null);

//   // ✅ Separate filter states
//   const [filters, setFilters] = useState({
//     name: "",
//     loginMobile: "",
//     memberCode: "",
//     status: "",
//   });

//   // ✅ Fetch Members
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

//   // ✅ Change Status (Active / Inactive)
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await axios.put(
//         `${Base_url}/api/memberRegistration/status/${id}`,
//         { status: newStatus }
//       );

//       if (res.data.success) {
//         if (newStatus === "active") {
//           const memberCode = res.data.member?.memberCode || "N/A";
//           alert(`✅ Member activated!\nMember Code: ${memberCode}`);
//         } else {
//           alert("❌ Member deactivated!");
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

//   // ✅ Filter Members
//   const filteredMembers = members.filter((m) => {
//     const nameMatch = m.name
//       ?.toLowerCase()
//       .includes(filters.name.toLowerCase());
//     const loginMatch = m.loginMobile
//       ?.toString()
//       .includes(filters.loginMobile);
//     const codeMatch = m.memberCode
//       ?.toLowerCase()
//       .includes(filters.memberCode.toLowerCase());
//     const statusMatch =
//       filters.status === "" || m.status === filters.status;

//     return nameMatch && loginMatch && codeMatch && statusMatch;
//   });

//   if (loading) return <p className="text-center mt-4">Loading members...</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen pt-20">
//       <Header />
//       <h1 className="font-bold text-xl py-2 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
//         Member Details
//       </h1>

//       {/* ✅ Filter Section */}
//       <div className="bg-white shadow-md rounded-lg p-4 mx-4 my-4">
//         <h2 className="text-lg font-semibold text-gray-700 mb-3">🔍 Filter Members</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search by Member Code"
//             value={filters.memberCode}
//             onChange={(e) =>
//               setFilters({ ...filters, memberCode: e.target.value })
//             }
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             placeholder="Search by Login Mobile"
//             value={filters.loginMobile}
//             onChange={(e) =>
//               setFilters({ ...filters, loginMobile: e.target.value })
//             }
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             placeholder="Search by Name"
//             value={filters.name}
//             onChange={(e) =>
//               setFilters({ ...filters, name: e.target.value })
//             }
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <select
//             value={filters.status}
//             onChange={(e) =>
//               setFilters({ ...filters, status: e.target.value })
//             }
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="flex justify-between items-center mt-4 text-gray-700">
//           <p>
//             Total Members:{" "}
//             <span className="text-blue-700 font-bold">{members.length}</span>
//           </p>
//           <p>
//             Showing:{" "}
//             <span className="text-green-700 font-bold">
//               {filteredMembers.length}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* ✅ Members Table */}
//       <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6 mx-4">
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
//               <th className="py-2 px-3">Registered On</th>
//               <th className="py-2 px-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredMembers.length > 0 ? (
//               filteredMembers.map((m, i) => (
//                 <tr key={m._id} className="border-b hover:bg-gray-50 text-center">
//                   <td>{i + 1}</td>

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

//                   <td>
//                     <select
//                       value={m.status || "inactive"}
//                       onChange={(e) =>
//                         handleStatusChange(m._id, e.target.value)
//                       }
//                       className={`px-2 py-1 rounded-lg text-white ${
//                         m.status === "active" ? "bg-green-600" : "bg-gray-500"
//                       }`}
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
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

// export default CommunityMemberDetails;


import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewMemberModal from "./ViewMemberModal";
import EditMemberForm from "./EditMemberForm";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";

const CommunityMemberDetails = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMember, setEditMember] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    loginMobile: "",
    memberCode: "",
    status: "",
  });

  // ✅ Fetch Members
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/memberRegistration`);
      if (res.data.success) {
        // ✅ Logged-in user ki community lo
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        const userCommunity = loggedUser?.community?.trim()?.toLowerCase();

        // ✅ Filter members based on community name
        const filtered = res.data.members.filter(
          (m) => m.communityName?.trim()?.toLowerCase() === userCommunity
        );

        setMembers(filtered);
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

  // ✅ Change Status (Active / Inactive)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `${Base_url}/api/memberRegistration/status/${id}`,
        { status: newStatus }
      );

      if (res.data.success) {
        if (newStatus === "active") {
          const memberCode = res.data.member?.memberCode || "N/A";
          alert(`✅ Member activated!\nMember Code: ${memberCode}`);
        } else {
          alert("❌ Member deactivated!");
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

  // ✅ Filter search inputs
  const filteredMembers = members.filter((m) => {
    const nameMatch = m.name
      ?.toLowerCase()
      .includes(filters.name.toLowerCase());
    const loginMatch = m.loginMobile
      ?.toString()
      .includes(filters.loginMobile);
    const codeMatch = m.memberCode
      ?.toLowerCase()
      .includes(filters.memberCode.toLowerCase());
    const statusMatch =
      filters.status === "" || m.status === filters.status;

    return nameMatch && loginMatch && codeMatch && statusMatch;
  });

  if (loading) return <p className="text-center mt-4">Loading members...</p>;

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Header />
      <h1 className="font-bold text-xl py-2 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
        Member Details (Your Community)
      </h1>

      {/* ✅ Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mx-4 my-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">🔍 Filter Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by Member Code"
            value={filters.memberCode}
            onChange={(e) =>
              setFilters({ ...filters, memberCode: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Search by Login Mobile"
            value={filters.loginMobile}
            onChange={(e) =>
              setFilters({ ...filters, loginMobile: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Search by Name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-700">
          <p>
            Total Members:{" "}
            <span className="text-blue-700 font-bold">{members.length}</span>
          </p>
          <p>
            Showing:{" "}
            <span className="text-green-700 font-bold">
              {filteredMembers.length}
            </span>
          </p>
        </div>
      </div>

      {/* ✅ Members Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6 mx-4">
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
              <th className="py-2 px-3">Registered On</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((m, i) => (
                <tr key={m._id} className="border-b hover:bg-gray-50 text-center">
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
                      onChange={(e) =>
                        handleStatusChange(m._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-lg text-white ${
                        m.status === "active" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                  No members found for your community
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

export default CommunityMemberDetails;
