// import { useEffect, useState } from "react";
// import { Droplet } from "lucide-react"; // 💧 Blood icon
// import Header from "../AdminDashboard/Header";
// import { Base_url } from "../../apiConfig/api";

// export default function BloodGroup() {
//   const [members, setMembers] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [bloodFilter, setBloodFilter] = useState("All");
 

//   // Fetch members
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${Base_url}/api/memberRegistration`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();

//         let memberArray = [];
//         if (Array.isArray(data)) memberArray = data;
//         else if (data.data) memberArray = data.data;
//         else if (data.members) memberArray = data.members;
//         else if (data.result) memberArray = data.result;

//         setMembers(memberArray);
//         setFiltered(memberArray);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, []);

//   // ✅ Filter logic
//   useEffect(() => {
//     let filteredData = members.filter((m) => {
//       const matchesSearch =
//         m.name?.toLowerCase().includes(search.toLowerCase()) ||
//         m.loginMobile?.toString().includes(search) ||
//         m.city?.toLowerCase().includes(search.toLowerCase());

//       const matchesBlood =
//         bloodFilter === "All" || m.bloodGroup === bloodFilter;

//       return matchesSearch && matchesBlood;
//     });

//     setFiltered(filteredData);
//   }, [search, bloodFilter, members]);

//   // ✅ Blood groups
//   const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

//   // Loading screen
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 to-orange-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-red-600 mx-auto mb-4"></div>
//           <p className="text-gray-700 text-lg font-semibold">Loading donors...</p>
//         </div>
//       </div>
//     );

//   // Error screen
//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 to-orange-100">
//         <div className="bg-white border border-red-300 rounded-xl p-8 text-center shadow-2xl">
//           <div className="text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 text-lg font-semibold mb-4">
//             Error loading members: {error}
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg hover:scale-105 transition font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="py-12 px-6 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 min-h-screen">
//         <Header/> 
//       {/* 🔹 Header */}
//       <div className="text-center mb-10 pt-10">
//         <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 mb-3 drop-shadow-sm flex items-center justify-center gap-2">
//           <Droplet className="text-red-600 w-10 h-10" /> Blood Bank
//         </h1>
//         <p className="text-gray-700 font-semibold text-lg">
//           Find the right blood donors by group
//         </p>
//       </div>

//       {/* 🔹 Filter Section */}
//       <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-6xl mx-auto border border-red-100">
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search by name, city or mobile..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full md:w-1/2 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           {/* Blood Group Filter */}
//           <select
//             value={bloodFilter}
//             onChange={(e) => setBloodFilter(e.target.value)}
//             className="w-full md:w-1/4 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
//           >
//             {bloodGroups.map((group) => (
//               <option key={group} value={group}>
//                 {group}
//               </option>
//             ))}
//           </select>

//           {/* Count */}
//           <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-6 py-2 rounded-xl shadow-md">
//             Total Donors: {filtered.length}
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Donor Cards */}
//       {filtered.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="text-8xl mb-4">🩸</div>
//           <p className="text-gray-500 text-xl font-medium">No matching donors found.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {filtered.map((member, index) => (
//             <div
//               key={member._id || index}
//               className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
//             >
//               {/* Header */}
//               <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-800 py-1 text-center">
//                 <h3 className="text-xl font-bold text-red-600 mb-1 bg-yellow-500 py-2">
//                   {member.name || "Unknown"}
//                 </h3>
//                 <img
//                   src={
//                     member.image
//                       ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
//                       : "https://cdn-icons-png.flaticon.com/512/921/921071.png"
//                   }
//                   alt={member.name || "Member"}
//                   className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
//                 />
//                 {/* Blood Badge */}
//                 <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
//                   <div className="flex items-center gap-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-red-900 rounded-xl px-5 py-2 shadow-lg border-2 border-white font-bold text-lg">
//                     <Droplet className="text-red-700 w-5 h-5" />
//                     {member.bloodGroup || "N/A"}
//                   </div>
//                 </div>
//               </div>

//               {/* Member Details */}
//               <div className="pt-4 pb-6 px-6 text-center bg-gradient-to-t from-red-50 via-white to-white rounded-b-3xl">
                
               

//                 <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-xl p-3 border border-red-200 shadow-inner">
//                   <p className="text-white text-md font-semibold">
//                     Member Code:{" "}
//                     <span className="text-yellow-300">{member.memberCode || "N/A"}</span>
//                   </p>
//                    <p className="text-white text-md font-semibold mt-1">
//                    communityName:{" "}
//                     <span className="text-yellow-300">{member.communityName || "N/A"}</span>
//                   </p>
//                   <p className="text-white text-md font-semibold mt-1">
//                     Mobile:{" "}
//                     <span className="text-yellow-300">{member.loginMobile || "N/A"}</span>
//                   </p>
//                    <p className="text-white text-md font-semibold mt-1">
//                     City:{" "}
//                     <span className="text-yellow-300">{member.city || "N/A"}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Droplet } from "lucide-react"; // 💧 Blood icon
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

export default function BloodGroup() {
  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("All");

  // 🔹 Get logged-in user's community
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userCommunity = loggedUser?.community;

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${Base_url}/api/memberRegistration`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        let memberArray = [];
        if (Array.isArray(data)) memberArray = data;
        else if (data.data) memberArray = data.data;
        else if (data.members) memberArray = data.members;
        else if (data.result) memberArray = data.result;

        // 🔹 Filter by logged-in user's community
        const communityMembers = memberArray.filter(
          (m) =>
            m.communityName &&
            m.communityName.toLowerCase() === userCommunity?.toLowerCase()
        );

        setMembers(communityMembers);
        setFiltered(communityMembers);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [userCommunity]);

  // ✅ Filter logic (search + blood group)
  useEffect(() => {
    let filteredData = members.filter((m) => {
      const matchesSearch =
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.loginMobile?.toString().includes(search) ||
        m.city?.toLowerCase().includes(search.toLowerCase());

      const matchesBlood =
        bloodFilter === "All" || m.bloodGroup === bloodFilter;

      return matchesSearch && matchesBlood;
    });

    setFiltered(filteredData);
  }, [search, bloodFilter, members]);

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-semibold">Loading donors...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 to-orange-100">
        <div className="bg-white border border-red-300 rounded-xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-semibold mb-4">
            Error loading members: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg hover:scale-105 transition font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="py-12 px-6 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 min-h-screen">
      <Header />
      {/* 🔹 Header */}
      <div className="text-center mb-10 pt-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 mb-3 drop-shadow-sm flex items-center justify-center gap-2">
          <Droplet className="text-red-600 w-10 h-10" /> Blood Bank
        </h1>
        <p className="text-gray-700 font-semibold text-lg">
          Find the right blood donors by group
        </p>
      </div>

      {/* 🔹 Filter Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-6xl mx-auto border border-red-100">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search by name, city or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-6 py-2 rounded-xl shadow-md">
            Total Donors: {filtered.length}
          </div>
        </div>
      </div>

      {/* 🔹 Donor Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-8xl mb-4">🩸</div>
          <p className="text-gray-500 text-xl font-medium">No matching donors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filtered.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-800 py-1 text-center">
                <h3 className="text-xl font-bold text-red-600 mb-1 bg-yellow-500 py-2">
                  {member.name || "Unknown"}
                </h3>
                <img
                  src={
                    member.image
                      ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
                      : "https://cdn-icons-png.flaticon.com/512/921/921071.png"
                  }
                  alt={member.name || "Member"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-red-900 rounded-xl px-5 py-2 shadow-lg border-2 border-white font-bold text-lg">
                    <Droplet className="text-red-700 w-5 h-5" />
                    {member.bloodGroup || "N/A"}
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="pt-4 pb-6 px-6 text-center bg-gradient-to-t from-red-50 via-white to-white rounded-b-3xl">
                <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-xl p-3 border border-red-200 shadow-inner">
                  <p className="text-white text-md font-semibold">
                    Member Code: <span className="text-yellow-300">{member.memberCode || "N/A"}</span>
                  </p>
                  <p className="text-white text-md font-semibold mt-1">
                    Community: <span className="text-yellow-300">{member.communityName || "N/A"}</span>
                  </p>
                  <p className="text-white text-md font-semibold mt-1">
                    Mobile: <span className="text-yellow-300">{member.loginMobile || "N/A"}</span>
                  </p>
                  <p className="text-white text-md font-semibold mt-1">
                    City: <span className="text-yellow-300">{member.city || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
