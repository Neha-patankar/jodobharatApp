// import React, { useState } from "react";
// import axios from "axios";
// import { Base_url } from "../../apiConfig/api";

// const EditMemberForm = ({ member, onClose, refresh }) => {
//   const [formData, setFormData] = useState({
//     name: member.name,
//     loginMobile: member.loginMobile,
//     email: member.email,
//     city: member.city,
//     communityName: member.communityName,
//     occupation: member.occupation,
//     education: member.education,
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${Base_url}/api/memberRegistration/${member._id}`,
//         formData
//       );
//       alert("Member updated successfully");
//       refresh();
//       onClose();
//     } catch (err) {
//       alert("Failed to update member");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[600px] relative">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-4">Edit Member</h2>
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-red-500 text-xl font-bold"
//         >
//           ✕
//         </button>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {Object.keys(formData).map((key) => (
//             <div key={key}>
//               <label className="block font-semibold text-gray-600 capitalize">
//                 {key}
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key] || ""}
//                 onChange={handleChange}
//                 className="border w-full p-2 rounded-lg"
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mt-3"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditMemberForm;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

// 💡 सहायक घटक: मॉडल की सामग्री (Modal Content)
const ModalContent = ({ title, onClose, children }) => (
  // मॉडल ओवरले: फिक्स्ड पोजीशन, पूरा स्क्रीन, बैकड्रॉप के लिए काला/ग्रे रंग
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
    {/* मॉडल कंटेनर: सफ़ेद पृष्ठभूमि, गोल किनारे, शैडो, और अधिकतम चौड़ाई */}
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto relative">
      
      {/* मॉडल हैडर */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
        {/* क्लोज बटन */}
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors text-2xl font-bold p-1 leading-none"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      {/* मॉडल बॉडी (फॉर्म कंटेंट) */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </div>
);

// ✅ मुख्य घटक: EditMemberForm (ModalContent का उपयोग करते हुए)
const EditMemberForm = ({ member, onClose, refresh }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: member.name || "",
    loginMobile: member.loginMobile || "",
    email: member.email || "",
    city: member.city || "",
    communityName: member.communityName || "",
    communityId: member.communityId || "",
    occupation: member.occupation || "",
    education: member.education || "",
    bloodGroup: member.bloodGroup || "",
    gender: member.gender || "",
  });

  // कम्युनिटी ड्रॉपडाउन के लिए initial value सेट करना
  useEffect(() => {
    // अगर communities लोड हो चुकी हैं, तो formData को communityName और communityId से अपडेट करें
    if (communities.length > 0 && member.communityId) {
        const initialCommunity = communities.find(
            (c) => c.communityId === member.communityId
        );
        if (initialCommunity) {
            setFormData(prev => ({
                ...prev,
                communityName: initialCommunity.communityName,
                communityId: initialCommunity.communityId,
            }));
        }
    }
  }, [communities, member.communityId, member.communityName]);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Fetch Communities
  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${Base_url}/api/community`);
      setCommunities(res.data);
    } catch (err) {
      console.error("Failed to fetch communities:", err);
      setError("Failed to load communities. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const handleCommunityChange = (e) => {
    const selectedCommunity = communities.find(
      (c) => c._id === e.target.value
    );
    if (selectedCommunity) {
      setFormData({
        ...formData,
        communityName: selectedCommunity.communityName,
        communityId: selectedCommunity.communityId,
      });
    } else {
      // अगर 'समुदाय चुनें' ऑप्शन चुना गया है
      setFormData({
        ...formData,
        communityName: "",
        communityId: "",
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `${Base_url}/api/memberRegistration/${member._id}`,
        formData
      );
      alert("Member updated successfully");
      refresh(); // पेरेंट कंपोनेंट में डेटा को रीफ़्रेश करें
      onClose(); // मॉडल को बंद करें
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update member. Check console for details.");
      setError("Failed to update member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContent title="Edit Member" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} type="text" />

          {/* Mobile */}
          <InputField label="Login Mobile" name="loginMobile" value={formData.loginMobile} onChange={handleChange} type="text" />

          {/* Email */}
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />

          {/* City */}
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} type="text" />

          {/* Education */}
          <InputField label="Education" name="education" value={formData.education} onChange={handleChange} type="text" />

          {/* Blood Group */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">
              ब्लड ग्रुप / Blood Group
            </label>
            <select
              name="bloodGroup"
              onChange={handleChange}
              value={formData.bloodGroup}
              className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ब्लड ग्रुप चुनें</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Community Name Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">
              समुदाय का नाम / Community
            </label>
            <select
              name="communityName"
              onChange={handleCommunityChange}
              value={
                communities.find(
                  (c) => c.communityId === formData.communityId
                )?._id || "" // _id का उपयोग select value के रूप में करें
              }
              className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">समुदाय चुनें</option>
              {loading ? (
                <option disabled>Loading communities...</option>
              ) : (
                communities.map((community) => (
                  <option key={community._id} value={community._id}>
                    {community.communityName} ({community.communityId})
                  </option>
                ))
              )}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Occupation Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">
              Occupation Type / व्यवसाय
            </label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Occupation</option>
              {[
                "Family Business", "Private Job", "Government Job", "Housewife",
                "Lawyer", "Doctor", "Chartered Accountant", "Software Engineer",
                "Engineer", "Company Secretary", "Army Person", "Police Service",
                "Self Employed", "Self Business", "Teacher", "Professor", "Other"
              ].map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">
              लिंग / Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">लिंग चुनें</option>
              <option value="male">पुरुष / Male</option>
              <option value="female">महिला / Female</option>
              <option value="other">अन्य / Other</option>
            </select>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
              loading 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            }`}
          >
            {loading ? "Updating..." : "Update Member"}
          </button>
        </div>
        
      </form>
    </ModalContent>
  );
};

// 💡 सहायक घटक: सामान्य इनपुट फील्ड
const InputField = ({ label, name, value, onChange, type = "text" }) => (
    <div>
      <label className="block text-sm text-gray-600 mb-1 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 w-full p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

export default EditMemberForm;