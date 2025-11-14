

import { useEffect, useState } from "react";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

export default function ProfessionCard() {
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

  // Fetch Members
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

      // ✅ Filter by logged-in user's community
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const userCommunity = loggedUser?.community;

      const communityMembers = memberArray.filter(
        (m) =>
          m.communityName &&
          m.communityName.toLowerCase() === userCommunity?.toLowerCase()
      );

      setMembers(communityMembers);
      setFilteredMembers(communityMembers);
      setError(null);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchMembers();
}, []);


  // Fetch Community Names for Dropdown
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

  // Apply filters
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
      const occupationMatch = (m.occupation || "")
        .toLowerCase()
        .includes(filters.occupation.toLowerCase());
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading members...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="py-8 px-0 bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-xl font-bold text-center text-white bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 py-4 mb-8 pt-10">
        Profession
      </h1>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          name="name"
          placeholder="नाम से खोजें"
          value={filters.name}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />

        {/* Dynamic Community Dropdown */}
        <select
          name="communityName"
          value={filters.communityName}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />

        {/* Occupation Dropdown */}
        <select
          name="occupation"
          value={filters.occupation}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">व्यवसाय चुनें</option>
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
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />
      </div>

      {/* Count Info */}
      <div className="text-center mb-4">
        <p className="text-gray-700 font-semibold">
          कुल सदस्य: {members.length} | फ़िल्टर किए गए सदस्य:{" "}
          {filteredMembers.length}
        </p>
      </div>

      {/* Member Cards */}
      {!filteredMembers.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">कोई सदस्य नहीं मिला।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 max-w-7xl mx-auto">
          {filteredMembers.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gray-300 text-center">
                <h3 className="text-2xl font-bold text-white text-center mb-2 py-2 bg-blue-900">
                  {member.name || "N/A"}
                </h3>
              </div>

              <div className="relative bg-gray-300 pb-4 flex justify-center">
                <img
                  src={
                    member.image
                      ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
                      : "/noimage.svg"
                  }
                  alt={member.name || "Member"}
                  className="w-36 h-36 rounded-full object-cover border-4 border-blue-900 shadow-lg"
                />
              </div>

              <h3 className="text-lg text-center font-bold text-yellow-300 bg-black/90 px-4 py-1">
                सदस्य कोड : {member.memberCode || "N/A"}
              </h3>

              <div className="bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white px-6 py-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold text-white">समुदाय का नाम :</span>
                    <span className="text-white font-bold">
                      {member.communityName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-white">वर्तमान शहर :</span>
                    <span className="text-white font-bold">
                      {member.city || member.currentCity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-white">व्यवसाय :</span>
                    <span className="text-white font-bold">
                      {member.occupation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-white">पिता का नाम :</span>
                    <span className="text-white font-bold">
                      {member.fatherName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-white">माता का नाम :</span>
                    <span className="text-white font-bold">
                      {member.motherName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}