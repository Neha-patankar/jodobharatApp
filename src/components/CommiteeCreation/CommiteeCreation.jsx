// import { useEffect, useState } from "react";
// import Header from "../AdminDashboard/Header";
// import { Base_url } from "../../apiConfig/api";

// export default function CommitteeCreation() {
//   const [team, setTeam] = useState([]);
//   const [filteredTeam, setFilteredTeam] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTitle, setSelectedTitle] = useState("");

//   const titles = [
//     "महिला कार्यकारिणी",
//     "वार्षिक सम्मेलन",
//     "सांस्कृतिक",
//     "फाइनेंस कमिटी",
//     "संत विहार समिति",
//     "बिज़नेस सलाहकार",
//     "करियर सलाहकार",
//     "कार्यशाला समिति",
//   ];

//   useEffect(() => {
//     const fetchTeam = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${Base_url}/api/committees`);
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setTeam(data);
//         setFilteredTeam(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching team data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeam();
//   }, []);

//   const handleFilterChange = (e) => {
//     const selected = e.target.value;
//     setSelectedTitle(selected);
//     if (selected === "") {
//       setFilteredTeam(team);
//     } else {
//       const filtered = team.filter((member) => member.title === selected);
//       setFilteredTeam(filtered);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading committee members...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <p className="text-red-600">
//             Error loading committee members: {error}
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="py-8 px-0 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
//        <Header/> 
//       <div className="flex justify-center mb-6 gap-2">
//         {Array(8)
//           .fill()
//           .map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "bg-blue-600 scale-110"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//               onClick={() => setActiveIndex(index)}
//               aria-label={`Go to page ${index + 1}`}
//             />
//           ))}
//       </div>

//       <h1 className="text-xl font-bold text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900  py-4 mb-2">
//         Committee Members
//       </h1>
//       <div className="flex justify-center mb-8">
//         <select
//           value={selectedTitle}
//           onChange={handleFilterChange}
//           className="w-full max-w-xs px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm shadow-sm hover:border-blue-400 transition-colors"
//         >
//           <option value="">सभी कमिटी देखें (All Committees)</option>
//           {titles.map((title, index) => (
//             <option key={index} value={title}>
//               {title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredTeam.length === 0 ? (
//         <p className="text-center text-gray-500 text-base">
//           No committee members found.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {filteredTeam.map((member) => (
//             <div
//               key={member._id}
//               className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
//             >
//               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-600 opacity-90"></div>
              
//               <div className="relative pt-0 pb-4 px-6 text-center">
//                 <h3 className="text-xl font-bold text-white mt-6 mb-3  ">
//                   {member.name}
//                 </h3>
//                 <div className="relative inline-block mb-3">
//                   <img
//                     src={`${Base_url}/uploads/committeemember/${member.image}`}
//                     alt={member.name}
//                     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300"
//                     onError={(e) => {
//                       e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                         <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
//                           <rect width="128" height="128" fill="#e5e7eb"/>
//                           <text x="64" y="64" text-anchor="middle" dy="0.35em" fill="#9ca3af" font-family="Arial" font-size="14">No Image</text>
//                         </svg>
//                       `)}`;
//                     }}
//                   />
//                   {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pu">
//                     <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full font-bold text-xs shadow-md">
//                       {member.title}
//                     </span>
//                   </div> */}
//                 </div>

//                 <h3 className="text-xl font-bold text-white mt-0 mb-3  bg-orange-500 rounded-lg">
//                   {member.title}
//                 </h3>

//                 <p className="text-white font-bold text-sm leading-relaxed px-2 line-clamp-3">
//                   {member.description}
//                 </p>
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-pink-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

export default function CommitteeCreation() {
  const [team, setTeam] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const titles = [
    "महिला कार्यकारिणी",
    "वार्षिक सम्मेलन",
    "सांस्कृतिक",
    "फाइनेंस कमिटी",
    "संत विहार समिति",
    "बिज़नेस सलाहकार",
    "करियर सलाहकार",
    "कार्यशाला समिति",
  ];

  // ✅ Logged-in user’s community
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userCommunity = loggedUser?.community;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${Base_url}/api/committees`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const teamData = Array.isArray(data) ? data : data.committees || [];

        // ✅ Filter by user's community
        const communityMembers = teamData.filter(
          (member) =>
            member.communityName &&
            member.communityName.toLowerCase() === userCommunity?.toLowerCase()
        );

        setTeam(communityMembers);
        setFilteredTeam(communityMembers);
        setError(null);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [userCommunity]);

  // ✅ Filter by title
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedTitle(selected);

    if (!selected) {
      setFilteredTeam(team);
    } else {
      const filtered = team.filter(
        (member) => member.title?.trim() === selected.trim()
      );
      setFilteredTeam(filtered);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading committee members...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">
            Error loading committee members: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="py-8 px-0 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <Header />

      {/* 🔘 Pagination Dots */}
      <div className="flex justify-center mb-6 gap-2">
        {Array(8)
          .fill()
          .map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
      </div>

      {/* 🏷️ Title */}
      <h1 className="text-xl font-bold text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 py-4 mb-4">
        Committee Members
      </h1>

      {/* 🔍 Filter */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedTitle}
          onChange={handleFilterChange}
          className="w-full max-w-xs px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm shadow-sm hover:border-blue-400 transition"
        >
          <option value="">सभी कमिटी देखें (All Committees)</option>
          {titles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Member Cards */}
      {filteredTeam.length === 0 ? (
        <p className="text-center text-gray-500 text-base">
          No committee members found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTeam.map((member) => (
            <div
              key={member._id}
              className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* 🟠 Top Gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-600 opacity-90"></div>

              <div className="relative pt-4 pb-6 px-6 text-center">
                {/* 🖼️ Member Image */}
                <div className="relative inline-block mb-3 mt-6">
                  <img
                    src={`${Base_url}/uploads/committeemember/${member.image}`}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                          <rect width="128" height="128" fill="#e5e7eb"/>
                          <text x="64" y="64" text-anchor="middle" dy="0.35em" fill="#9ca3af" font-family="Arial" font-size="14">No Image</text>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>

                {/* 🏷️ Name & Title */}
                <h3 className="text-xl font-bold text-white mt-2 mb-2">
                  {member.name}
                </h3>

                <h3 className="text-lg font-bold text-white bg-orange-500 rounded-lg inline-block px-3 py-1 mb-3">
                  {member.title}
                </h3>

                {/* 📝 Description */}
                <p className="text-white font-semibold text-sm leading-relaxed px-2 line-clamp-3">
                  {member.description}
                </p>
              </div>

              {/* 🔻 Bottom Hover Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-pink-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
