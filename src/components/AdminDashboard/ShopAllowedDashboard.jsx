


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Base_url } from "../../apiConfig/api";
// import Header from "./Header";

// const ShopAllowDashboard = () => {
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Filter states for each column
//   const [filters, setFilters] = useState({
//     name: "",
//     memberCode: "",
//     loginMobile: "",
//     communityName: "",
//     shopAllow: "",
//     startDate: "",
//     endDate: "",
//   });

//   // ✅ Get logged-in user community
//   const loggedUser = JSON.parse(localStorage.getItem("user"));
//   const userCommunity = loggedUser?.community;

//   // ✅ Fetch members (only from user's community)
//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get(`${Base_url}/api/memberRegistration`);
//       if (res.data.success) {
//         const filtered = res.data.members.filter(
//           (m) =>
//             m.communityName &&
//             m.communityName.toLowerCase() === userCommunity?.toLowerCase()
//         );
//         setMembers(filtered);
//         setFilteredMembers(filtered);
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

//   // ✅ Handle input change for each column filter
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     const newFilters = { ...filters, [name]: value.toLowerCase() };
//     setFilters(newFilters);

//     // Apply filters
//     const filtered = members.filter((m) => {
//       return (
//         (!newFilters.name ||
//           m.name?.toLowerCase().includes(newFilters.name)) &&
//         (!newFilters.memberCode ||
//           m.memberCode?.toLowerCase().includes(newFilters.memberCode)) &&
//         (!newFilters.loginMobile ||
//           m.loginMobile?.toLowerCase().includes(newFilters.loginMobile)) &&
//         (!newFilters.communityName ||
//           m.communityName?.toLowerCase().includes(newFilters.communityName)) &&
//         (!newFilters.shopAllow ||
//           m.shopAllow?.toLowerCase().includes(newFilters.shopAllow)) &&
//         (!newFilters.startDate ||
//           (m.startDate &&
//             new Date(m.startDate)
//               .toISOString()
//               .split("T")[0]
//               .includes(newFilters.startDate))) &&
//         (!newFilters.endDate ||
//           (m.endDate &&
//             new Date(m.endDate)
//               .toISOString()
//               .split("T")[0]
//               .includes(newFilters.endDate)))
//       );
//     });

//     setFilteredMembers(filtered);
//   };

//   // ✅ Update Shop Allow
//   const handleShopAllowChange = async (id, shopAllow) => {
//     try {
//       const res = await axios.put(
//         `${Base_url}/api/memberRegistration/shopallow/${id}`,
//         { shopAllow }
//       );

//       if (res.data.success) {
//         alert(
//           shopAllow === "yes"
//             ? "✅ Shop allowed successfully!"
//             : "❌ Shop access removed!"
//         );
//         fetchMembers();
//       }
//     } catch (err) {
//       console.error("Error updating shop allow:", err);
//       alert("Failed to update shop allow status");
//     }
//   };

//   // ✅ Update Shop Dates
//   const handleDateChange = async (id, field, value) => {
//     try {
//       const res = await axios.put(`${Base_url}/api/memberRegistration/shopdates/${id}`, {
//         [field]: value,
//       });
//       if (res.data.success) {
//         alert(`✅ ${field === "startDate" ? "Start" : "End"} date updated`);
//         fetchMembers();
//       }
//     } catch (err) {
//       console.error("Error updating dates:", err);
//       alert("Failed to update date");
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading members...</p>;

//   return (
//     <div className="pt-20 bg-gray-50 min-h-screen">
//       <Header />
//       <h1 className="font-bold text-xl py-2 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
//         Shop Allow Dashboard
//       </h1>

//       {/* 🧾 Table */}
//       <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-2 px-3">S.No</th>
//               <th className="py-2 px-3">Image</th>
//               <th className="py-2 px-3">Member Code</th>
//               <th className="py-2 px-3">Name</th>
//               <th className="py-2 px-3">Login Mobile</th>
//               <th className="py-2 px-3">Community</th>
//               <th className="py-2 px-3">Shop Allow</th>
//               <th className="py-2 px-3">Start Date</th>
//               <th className="py-2 px-3">End Date</th>
//             </tr>
//           </thead>

//           {/* 🔍 Filter Row */}
//           <thead className="bg-gray-100">
//             <tr>
//               <th></th>
//               <th></th>
//               <th>
//                 <input
//                   type="text"
//                   name="memberCode"
//                   placeholder="Search Code"
//                   value={filters.memberCode}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Search Name"
//                   value={filters.name}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="text"
//                   name="loginMobile"
//                   placeholder="Search Mobile"
//                   value={filters.loginMobile}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="text"
//                   name="communityName"
//                   placeholder="Search Community"
//                   value={filters.communityName}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="text"
//                   name="shopAllow"
//                   placeholder="Yes / No"
//                   value={filters.shopAllow}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={filters.startDate}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
//               <th>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={filters.endDate}
//                   onChange={handleFilterChange}
//                   className="border rounded-md px-2 py-1 w-full text-sm"
//                 />
//               </th>
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

//                   {/* ✅ Shop Allow Dropdown */}
//                   <td>
//                     <select
//                       value={m.shopAllow || "no"}
//                       onChange={(e) =>
//                         handleShopAllowChange(m._id, e.target.value)
//                       }
//                       className={`px-2 py-1 rounded-lg text-white ${
//                         m.shopAllow === "yes" ? "bg-green-600" : "bg-gray-500"
//                       }`}
//                     >
//                       <option value="yes">Yes</option>
//                       <option value="no">No</option>
//                     </select>
//                   </td>

//                   {/* ✅ Start Date Input */}
//                   <td>
//                     <input
//                       type="date"
//                       value={
//                         m.startDate
//                           ? new Date(m.startDate).toISOString().split("T")[0]
//                           : ""
//                       }
//                       onChange={(e) =>
//                         handleDateChange(m._id, "startDate", e.target.value)
//                       }
//                       className="border px-2 py-1 rounded-md"
//                     />
//                   </td>

//                   {/* ✅ End Date Input */}
//                   <td>
//                     <input
//                       type="date"
//                       value={
//                         m.endDate
//                           ? new Date(m.endDate).toISOString().split("T")[0]
//                           : ""
//                       }
//                       onChange={(e) =>
//                         handleDateChange(m._id, "endDate", e.target.value)
//                       }
//                       className="border px-2 py-1 rounded-md"
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="py-4 text-gray-600">
//                   No members found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ShopAllowDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";

const ShopAllowDashboard = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: "",
    memberCode: "",
    loginMobile: "",
    communityName: "",
    shopAllow: "",
    startDate: "",
    endDate: "",
  });

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userCommunity = loggedUser?.community;

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/memberRegistration`);
      if (res.data.success) {
        const filtered = res.data.members.filter(
          (m) =>
            m.communityName &&
            m.communityName.toLowerCase() === userCommunity?.toLowerCase()
        );
        setMembers(filtered);
        setFilteredMembers(filtered);
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

  // ✅ Handle input filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value.toLowerCase() };
    setFilters(newFilters);

    const filtered = members.filter((m) => {
      return (
        (!newFilters.name ||
          m.name?.toLowerCase().includes(newFilters.name)) &&
        (!newFilters.memberCode ||
          m.memberCode?.toLowerCase().includes(newFilters.memberCode)) &&
        (!newFilters.loginMobile ||
          m.loginMobile?.toLowerCase().includes(newFilters.loginMobile)) &&
        (!newFilters.communityName ||
          m.communityName
            ?.toLowerCase()
            .includes(newFilters.communityName)) &&
        (!newFilters.shopAllow ||
          m.shopAllow?.toLowerCase().includes(newFilters.shopAllow)) &&
        (!newFilters.startDate ||
          (m.startDate &&
            new Date(m.startDate)
              .toISOString()
              .split("T")[0]
              .includes(newFilters.startDate))) &&
        (!newFilters.endDate ||
          (m.endDate &&
            new Date(m.endDate)
              .toISOString()
              .split("T")[0]
              .includes(newFilters.endDate)))
      );
    });

    setFilteredMembers(filtered);
  };

  const handleShopAllowChange = async (id, shopAllow) => {
    try {
      const res = await axios.put(
        `${Base_url}/api/memberRegistration/shopallow/${id}`,
        { shopAllow }
      );

      if (res.data.success) {
        alert(
          shopAllow === "yes"
            ? "✅ Shop allowed successfully!"
            : "❌ Shop access removed!"
        );
        fetchMembers();
      }
    } catch (err) {
      console.error("Error updating shop allow:", err);
      alert("Failed to update shop allow status");
    }
  };

  const handleDateChange = async (id, field, value) => {
    try {
      const res = await axios.put(`${Base_url}/api/memberRegistration/shopdates/${id}`, {
        [field]: value,
      });
      if (res.data.success) {
        alert(`✅ ${field === "startDate" ? "Start" : "End"} date updated`);
        fetchMembers();
      }
    } catch (err) {
      console.error("Error updating dates:", err);
      alert("Failed to update date");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading members...</p>;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <Header />
      <h1 className="font-bold text-xl py-2 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900">
        Shop Allow Dashboard
      </h1>

      {/* 🔍 Filter Section Above Table */}
      <div className="bg-white shadow-md rounded-xl p-5 m-4">
        <h2 className="font-semibold text-lg mb-3 text-gray-700">
          🔍 Search / Filter Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(filters).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={key.includes("Date") ? "date" : "text"}
                name={key}
                placeholder={`Search ${key}`}
                value={filters[key]}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white p-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-3">S.No</th>
              <th className="py-2 px-3">Image</th>
              <th className="py-2 px-3">Member Code</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Login Mobile</th>
              <th className="py-2 px-3">Community</th>
              <th className="py-2 px-3">Shop Allow</th>
              <th className="py-2 px-3">Start Date</th>
              <th className="py-2 px-3">End Date</th>
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
                      value={m.shopAllow || "no"}
                      onChange={(e) =>
                        handleShopAllowChange(m._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-lg text-white ${
                        m.shopAllow === "yes" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="date"
                      value={
                        m.startDate
                          ? new Date(m.startDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleDateChange(m._id, "startDate", e.target.value)
                      }
                      className="border px-2 py-1 rounded-md"
                    />
                  </td>

                  <td>
                    <input
                      type="date"
                      value={
                        m.endDate
                          ? new Date(m.endDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleDateChange(m._id, "endDate", e.target.value)
                      }
                      className="border px-2 py-1 rounded-md"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-gray-600">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopAllowDashboard;
