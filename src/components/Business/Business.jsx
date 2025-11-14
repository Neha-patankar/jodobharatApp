


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../AdminDashboard/Header";
// import { Base_url } from "../../apiConfig/api";

// export default function Business() {
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [filters, setFilters] = useState({
//     name: "",
//     communityName: "",
//     currentCity: "",
//     occupation: "",
//     loginNo: "",
//   });
//   const [communities, setCommunities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // 🔹 Fetch Members
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${Base_url}/api/memberRegistration`);
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();

//         let memberArray = [];
//         if (Array.isArray(data)) memberArray = data;
//         else if (data.data && Array.isArray(data.data)) memberArray = data.data;
//         else if (data.members && Array.isArray(data.members)) memberArray = data.members;
//         else if (data.result && Array.isArray(data.result)) memberArray = data.result;

//         // 🔹 Get logged-in user's community
//         const loggedUser = JSON.parse(localStorage.getItem("user"));
//         const userCommunity = loggedUser?.community || loggedUser?.communityName;

//         // ✅ Debug logs
//         console.log("🔍 Debug Info:");
//         console.log("Logged User:", loggedUser);
//         console.log("User Community:", userCommunity);
//         console.log("Total Members from API:", memberArray.length);

//         // 🔹 Filter by community (case-insensitive + trim)
//         const communityMembers = memberArray.filter((m) => {
//           const memberCommunity = (m.communityName || m.community || "").toLowerCase().trim();
//           const userCom = (userCommunity || "").toLowerCase().trim();
          
//           const isMatch = memberCommunity === userCom;
          
//           // Debug each member
//           if (isMatch) {
//             console.log(`✅ Match: ${m.name} - ${memberCommunity}`);
//           }
          
//           return isMatch;
//         });

//         console.log("✅ Filtered Members Count:", communityMembers.length);
//         console.log("Filtered Members:", communityMembers);

//         setMembers(communityMembers);
//         setFilteredMembers(communityMembers);
//         setError(null);
//       } catch (err) {
//         console.error("❌ Error fetching members:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMembers();
//   }, []);

//   // 🔹 Fetch Communities
//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const res = await fetch(`${Base_url}/api/community`);
//         const data = await res.json();
//         setCommunities(data);
//       } catch (err) {
//         console.error("Error fetching communities:", err);
//       }
//     };
//     fetchCommunities();
//   }, []);

//   // 🔍 Apply Filters
//   useEffect(() => {
//     const filtered = members.filter((m) => {
//       const nameMatch = (m.name || "")
//         .toLowerCase()
//         .includes(filters.name.toLowerCase());
//       const communityMatch = (m.communityName || "")
//         .toLowerCase()
//         .includes(filters.communityName.toLowerCase());
//       const cityMatch = (m.city || m.currentCity || "")
//         .toLowerCase()
//         .includes(filters.currentCity.toLowerCase());
//       const occupationMatch =
//         !filters.occupation || (m.occupation || "").includes(filters.occupation);
//       const loginMatch = (m.loginNo ? m.loginNo.toString() : "").includes(
//         filters.loginNo
//       );

//       return (
//         nameMatch &&
//         communityMatch &&
//         cityMatch &&
//         occupationMatch &&
//         loginMatch
//       );
//     });

//     setFilteredMembers(filtered);
//   }, [filters, members]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🔹 Loading or Error State
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Loading members...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-600">
//         Error: {error}
//       </div>
//     );

//   return (
//     <div className="py-8 px-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
//       <Header />
//       <h1 className="text-xl font-bold text-center text-white bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900  py-4 mb-8 pt-10 shadow-lg">
//         All Members
//       </h1>

//       {/* 🔍 Filter Section */}
//       <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 border-t-4 border-orange-500">
//         <input
//           type="text"
//           name="name"
//           placeholder="नाम से खोजें"
//           value={filters.name}
//           onChange={handleFilterChange}
//           className="border-2 border-orange-500 rounded-xl px-4 py-2 text-sm w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
//         />

//         {/* 🔹 Community Dropdown */}
//         <select
//           name="communityName"
//           value={filters.communityName}
//           onChange={handleFilterChange}
//           className="border-2 border-orange-500 rounded-xl px-4 py-2 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
//         >
//           <option value="">समुदाय चुनें</option>
//           {communities.length > 0 ? (
//             communities.map((community) => (
//               <option
//                 key={community._id}
//                 value={community.communityName || community.name}
//               >
//                 {community.communityName || community.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>डेटा लोड हो रहा है...</option>
//           )}
//         </select>

//         <input
//           type="text"
//           name="currentCity"
//           placeholder="शहर से खोजें"
//           value={filters.currentCity}
//           onChange={handleFilterChange}
//           className="border-2 border-orange-500 rounded-xl px-4 py-2 text-sm w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
//         />

//         {/* 🔹 Occupation Dropdown */}
//         <select
//           name="occupation"
//           value={filters.occupation}
//           onChange={handleFilterChange}
//           className="border-2 border-purple-200 rounded-xl px-4 py-2 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
//         >
//           <option value="">Select Occupation</option>
//           <option value="Family Business">Family Business</option>
//           <option value="Private Job">Private Job</option>
//           <option value="Government Job">Government Job</option>
//           <option value="Housewife">Housewife</option>
//           <option value="Lawyer">Lawyer</option>
//           <option value="Doctor">Doctor</option>
//           <option value="Chartered Accountant">Chartered Accountant</option>
//           <option value="Software Engineer">Software Engineer</option>
//           <option value="Engineer">Engineer</option>
//           <option value="Company Secretary">Company Secretary</option>
//           <option value="Army Person">Army Person</option>
//           <option value="Police Service">Police Service</option>
//           <option value="Self Employed">Self Employed</option>
//           <option value="Self Business">Self Business</option>
//           <option value="Teacher">Teacher</option>
//           <option value="Professor">Professor</option>
//           <option value="Other">Other</option>
//         </select>

//         <input
//           type="text"
//           name="loginNo"
//           placeholder="Login No से खोजें"
//           value={filters.loginNo}
//           onChange={handleFilterChange}
//           className="border-2 border-pink-200 rounded-xl px-4 py-2 text-sm w-full focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
//         />
//       </div>

//       {/* 📊 Count Info */}
//       <div className="text-center mb-6">
//         <div className="inline-block bg-white px-8 py-3 rounded-full shadow-lg border-2 border-purple-300">
//           <p className="text-gray-700 font-semibold">
//             कुल सदस्य: <span className="text-purple-800">{members.length}</span> | 
//             फ़िल्टर किए गए सदस्य: <span className="text-orange-600">{filteredMembers.length}</span>
//           </p>
//         </div>
//       </div>

//       {/* 🧾 Member Cards */}
//       {!filteredMembers.length ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">कोई सदस्य नहीं मिला।</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
//           {filteredMembers.map((member, index) => (
//             <div
//               key={member._id || index}
//               onClick={() =>
//                 navigate(
//                   `/sidebar/${member.name
//                     ?.toLowerCase()
//                     .replace(/\s+/g, "-")
//                     .trim()}`
//                 )
//               }
//               className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-t-4 border-orange-500"
//             >
//               {/* Header with Name */}
//               <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-center py-3">
//                 <h3 className="text-xl font-bold text-white">
//                   {member.name || "N/A"}
//                 </h3>
//               </div>

//               {/* Profile Image */}
//               <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 pb-4 pt-2 flex justify-center">
//                 <div className="relative">
//                   <img
//                     src={
//                       member.image
//                         ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
//                         : "/noimage.svg"
//                     }
//                     alt={member.name || "Member"}
//                     className="w-36 h-36 rounded-lg object-cover border-4 border-white shadow-2xl ring-4 ring-purple-900"
//                   />
//                   <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-900 to-pink-500 text-white px-4 py-1 rounded-lg text-xs font-bold shadow-lg">
//                     {member.memberCode || "N/A"}
//                   </div>
//                 </div>
//               </div>

//               {/* Member Code Badge */}
//               <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-center py-2 mt-0">
//                 <h3 className="text-sm font-bold text-white">
//                  Mobile: {member.loginMobile || "N/A"}
//                 </h3>
//               </div>

//               {/* Details Section */}
//               <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-5 py-1">
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
//                     <span className="font-semibold text-purple-700">occupation:</span>
//                     <span className="text-gray-800 font-bold">
//                       {member.occupation}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
//                     <span className="font-semibold text-pink-600">समुदाय:</span>
//                     <span className="text-gray-800 font-bold">
//                       {member.communityName}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
//                     <span className="font-semibold text-orange-600">शहर:</span>
//                     <span className="text-gray-800 font-bold">
//                       {member.city || member.currentCity}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Accent */}
//               <div className="h-2 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"></div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

export default function Business() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    communityName: "",
    currentCity: "",
    occupation: "",
    loginNo: "",
  });
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 🔹 Fetch Members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${Base_url}/api/memberRegistration`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        let memberArray = [];
        if (Array.isArray(data)) memberArray = data;
        else if (data.data && Array.isArray(data.data)) memberArray = data.data;
        else if (data.members && Array.isArray(data.members)) memberArray = data.members;
        else if (data.result && Array.isArray(data.result)) memberArray = data.result;

        // 🔹 Get logged-in user's community
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        const userCommunity = loggedUser?.community || loggedUser?.communityName;

        // ✅ Debug logs
        console.log("🔍 Debug Info:");
        console.log("Logged User:", loggedUser);
        console.log("User Community:", userCommunity);
        console.log("Total Members from API:", memberArray.length);

        // 🔹 Filter by community (case-insensitive + trim)
        const communityMembers = memberArray.filter((m) => {
          const memberCommunity = (m.communityName || m.community || "").toLowerCase().trim();
          const userCom = (userCommunity || "").toLowerCase().trim();
          
          const isMatch = memberCommunity === userCom;
          
          // Debug each member
          if (isMatch) {
            console.log(`✅ Match: ${m.name} - ${memberCommunity}`);
          }
          
          return isMatch;
        });

        console.log("✅ Filtered Members Count:", communityMembers.length);
        console.log("Filtered Members:", communityMembers);

        setMembers(communityMembers);
        setFilteredMembers(communityMembers);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching members:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // 🔹 Fetch Communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch(`${Base_url}/api/community`);
        const data = await res.json();
        setCommunities(data);
      } catch (err) {
        console.error("Error fetching communities:", err);
      }
    };
    fetchCommunities();
  }, []);

  // 🔍 Apply Filters
  useEffect(() => {
    const filtered = members.filter((m) => {
      const nameMatch = (m.name || "")
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const communityMatch = (m.communityName || "")
        .toLowerCase()
        .includes(filters.communityName.toLowerCase());
      const cityMatch = (m.city || m.currentCity || "")
        .toLowerCase()
        .includes(filters.currentCity.toLowerCase());
      const occupationMatch =
        !filters.occupation || (m.occupation || "").includes(filters.occupation);
      const loginMatch = (m.loginNo ? m.loginNo.toString() : "").includes(
        filters.loginNo
      );

      return (
        nameMatch &&
        communityMatch &&
        cityMatch &&
        occupationMatch &&
        loginMatch
      );
    });

    setFilteredMembers(filtered);
  }, [filters, members]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Member Card Click - UPDATED NAVIGATION
  const handleMemberClick = (member) => {
    // Convert member name to URL-friendly format
    const urlName = member.name
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .trim();
    
    // Navigate to member detail page
    navigate(`/member-detail/${urlName}`);
  };

  // 🔹 Loading or Error State
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <div className="text-center">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="py-8 px-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
      <Header />
      <h1 className="text-xl font-bold text-center text-white bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 py-4 mb-8 pt-10 shadow-lg">
        All Members
      </h1>

      {/* 🔍 Filter Section */}
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 border-t-4 border-orange-500">
        <input
          type="text"
          name="name"
          placeholder="नाम से खोजें"
          value={filters.name}
          onChange={handleFilterChange}
          className="border-2 border-orange-500 rounded-xl px-4 py-2 text-sm w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
        />

        {/* 🔹 Community Dropdown */}
        <select
          name="communityName"
          value={filters.communityName}
          onChange={handleFilterChange}
          className="border-2 border-orange-500 rounded-xl px-4 py-2 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
        >
          <option value="">समुदाय चुनें</option>
          {communities.length > 0 ? (
            communities.map((community) => (
              <option
                key={community._id}
                value={community.communityName || community.name}
              >
                {community.communityName || community.name}
              </option>
            ))
          ) : (
            <option disabled>डेटा लोड हो रहा है...</option>
          )}
        </select>

        <input
          type="text"
          name="currentCity"
          placeholder="शहर से खोजें"
          value={filters.currentCity}
          onChange={handleFilterChange}
          className="border-2 border-orange-500 rounded-xl px-4 py-2 text-sm w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all"
        />

        {/* 🔹 Occupation Dropdown */}
        <select
          name="occupation"
          value={filters.occupation}
          onChange={handleFilterChange}
          className="border-2 border-purple-200 rounded-xl px-4 py-2 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
        >
          <option value="">Select Occupation</option>
          <option value="Family Business">Family Business</option>
          <option value="Private Job">Private Job</option>
          <option value="Government Job">Government Job</option>
          <option value="Housewife">Housewife</option>
          <option value="Lawyer">Lawyer</option>
          <option value="Doctor">Doctor</option>
          <option value="Chartered Accountant">Chartered Accountant</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Engineer">Engineer</option>
          <option value="Company Secretary">Company Secretary</option>
          <option value="Army Person">Army Person</option>
          <option value="Police Service">Police Service</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Self Business">Self Business</option>
          <option value="Teacher">Teacher</option>
          <option value="Professor">Professor</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="loginNo"
          placeholder="Login No से खोजें"
          value={filters.loginNo}
          onChange={handleFilterChange}
          className="border-2 border-pink-200 rounded-xl px-4 py-2 text-sm w-full focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
        />
      </div>

      {/* 📊 Count Info */}
      <div className="text-center mb-6">
        <div className="inline-block bg-white px-8 py-3 rounded-full shadow-lg border-2 border-purple-300">
          <p className="text-gray-700 font-semibold">
            कुल सदस्य: <span className="text-purple-800">{members.length}</span> | 
            फ़िल्टर किए गए सदस्य: <span className="text-orange-600">{filteredMembers.length}</span>
          </p>
        </div>
      </div>

      {/* 🧾 Member Cards */}
      {!filteredMembers.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">कोई सदस्य नहीं मिला।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
          {filteredMembers.map((member, index) => (
            <div
              key={member._id || index}
              onClick={() => handleMemberClick(member)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-t-4 border-orange-500"
            >
              {/* Header with Name */}
              <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-center py-3">
                <h3 className="text-xl font-bold text-white">
                  {member.name || "N/A"}
                </h3>
              </div>

              {/* Profile Image */}
              <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 pb-4 pt-2 flex justify-center">
                <div className="relative">
                  <img
                    src={
                      member.image
                        ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
                        : "/noimage.svg"
                    }
                    alt={member.name || "Member"}
                    className="w-36 h-36 rounded-lg object-cover border-4 border-white shadow-2xl ring-4 ring-purple-900"
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-900 to-pink-500 text-white px-4 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {member.memberCode || "N/A"}
                  </div>
                </div>
              </div>

              {/* Member Code Badge */}
              <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-center py-2 mt-0">
                <h3 className="text-sm font-bold text-white">
                  Mobile: {member.loginMobile || "N/A"}
                </h3>
              </div>

              {/* Details Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-5 py-1">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                    <span className="font-semibold text-purple-700">Occupation:</span>
                    <span className="text-gray-800 font-bold">
                      {member.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                    <span className="font-semibold text-pink-600">समुदाय:</span>
                    <span className="text-gray-800 font-bold">
                      {member.communityName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                    <span className="font-semibold text-orange-600">शहर:</span>
                    <span className="text-gray-800 font-bold">
                      {member.city || member.currentCity || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="h-2 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}