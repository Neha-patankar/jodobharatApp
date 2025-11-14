

import { useEffect, useState } from "react";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

export default function MemberCards() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    communityName: "",
    currentCity: "",
    occupation: "",
    loginNo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

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
      else if (data.members && Array.isArray(data.members))
        memberArray = data.members;
      else if (data.result && Array.isArray(data.result))
        memberArray = data.result;

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
        सदस्य सूची (Members)
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
        <input
          type="text"
          name="communityName"
          placeholder="समुदाय नाम से खोजें"
          value={filters.communityName}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />
        <input
          type="text"
          name="currentCity"
          placeholder="शहर से खोजें"
          value={filters.currentCity}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />
        <input
          type="text"
          name="occupation"
          placeholder="व्यवसाय से खोजें"
          value={filters.occupation}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 max-w-7xl mx-auto">
          {filteredMembers.map((member, index) => (
            <div
              key={member._id || member.id || index}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Member Code Header */}
              <div className="bg-gradient-to-t from-orange-500 via-yellow-600 to-orange-500 text-center py-2">
                <p className="text-xs font-bold text-white bg-blue-900 p-2">
                  Member Code : {member.memberCode || "N/A"}
                </p>
              </div>

              {/* Image Section */}
              <div className="relative bg-gradient-to-t from-orange-500 via-yellow-600 to-orange-500 flex justify-center -mb-12">
                <img
                  src={
                    member.image
                      ? `${Base_url}/${member.image.replace(/\\/g, "/")}`
                      : "/noimage.svg"
                  }
                  alt={member.name || "Member"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Blue Card Body */}
              <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 pt-14 pb-3">
                {/* Name in Yellow */}
                <h3 className="text-center text-orange-500 font-bold text-lg mb-3">
                  {member.name || "N/A"}
                </h3>

                {/* Details */}
                <div className="text-white text-xs space-y-1 px-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold min-w-[80px]">समुदाय का नाम </span>
                    <span className="text-right flex-1">: {member.communityName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold min-w-[80px]">वर्तमान शहर</span>
                    <span className="text-right flex-1">: {member.city || member.currentCity || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold min-w-[80px]">व्यवसाय</span>
                    <span className="text-right flex-1">: {member.occupation || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold min-w-[80px]">पिताजी का नाम</span>
                    <span className="text-right flex-1">: {member.fatherName || "N/A"}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="text-center mt-3 px-3">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full text-white bg-gradient-to-t from-orange-600 via-yellow-600 to-orange-600 text-blue-900 py-1.5 rounded font-bold text-sm hover:bg-yellow-500 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Member Details */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-5 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">सदस्य विवरण</h2>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto flex-1 p-5">
              {/* Profile Section */}
              <div className="text-center mb-5">
                <img
                  src={
                    selectedMember.image
                      ? `${Base_url}/${selectedMember.image.replace(/\\/g, "/")}`
                      : "/noimage.svg"
                  }
                  alt="Member"
                  className="w-28 h-28 rounded-full border-4 border-blue-900 object-cover shadow-lg mx-auto mb-3"
                />
                <h3 className="text-2xl font-bold text-blue-900 mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-sm text-gray-600 font-semibold">
                  Member Code: {selectedMember.memberCode}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">मोबाइल</p>
                  <p className="font-bold text-blue-900">{selectedMember.loginMobile || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">व्हाट्सएप</p>
                  <p className="font-bold text-blue-900">{selectedMember.whatsapp || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs mb-0.5">ईमेल</p>
                  <p className="font-bold text-blue-900 break-all">{selectedMember.email || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">लिंग</p>
                  <p className="font-bold text-blue-900">{selectedMember.gender || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">जन्म तिथि</p>
                  <p className="font-bold text-blue-900">{selectedMember.dob || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">रक्त समूह</p>
                  <p className="font-bold text-blue-900">{selectedMember.bloodGroup || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">शिक्षा</p>
                  <p className="font-bold text-blue-900">{selectedMember.education || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">पिता का नाम</p>
                  <p className="font-bold text-blue-900">{selectedMember.fatherName || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">माता का नाम</p>
                  <p className="font-bold text-blue-900">{selectedMember.motherName || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">समुदाय</p>
                  <p className="font-bold text-blue-900">{selectedMember.communityName || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">व्यवसाय</p>
                  <p className="font-bold text-blue-900">{selectedMember.occupation || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">शहर</p>
                  <p className="font-bold text-blue-900">{selectedMember.city || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">पिनकोड</p>
                  <p className="font-bold text-blue-900">{selectedMember.pincode || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">सदस्य प्रकार</p>
                  <p className="font-bold text-blue-900">{selectedMember.memberType || "N/A"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs mb-0.5">स्थिति</p>
                  <p className="font-bold text-blue-900">{selectedMember.status || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs mb-0.5">स्थायी पता</p>
                  <p className="font-bold text-blue-900">{selectedMember.permanentAddress || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs mb-0.5">वर्तमान पता</p>
                  <p className="font-bold text-blue-900">{selectedMember.currentAddress || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-5 py-3 border-t">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2.5 rounded-lg font-bold hover:from-blue-800 hover:to-blue-700 transition-all"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}