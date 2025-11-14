


// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Base_url } from '../../apiConfig/api';

// // export const AboutUsForm = () => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     mission: '',
// //     vision: '',
// //     values: ''
// //   });

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await axios.post(`${Base_url}/api/about`, formData);
// //       alert('About Us added!');
// //       navigate('/admin');
// //     } catch (error) {
// //       console.error('Error submitting About Us:', error);
// //       alert('Failed to submit. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
// //       <h2 className="text-2xl font-bold mb-4">Add About Us Content</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           className="w-full border p-2 rounded"
// //           placeholder="Title"
// //           value={formData.title}
// //           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //           required
// //         />
// //         <textarea
// //           className="w-full border p-2 rounded"
// //           placeholder="Description"
// //           value={formData.description}
// //           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //           required
// //         ></textarea>
// //         <textarea
// //           className="w-full border p-2 rounded"
// //           placeholder="Mission"
// //           value={formData.mission}
// //           onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
// //           required
// //         ></textarea>
// //         <textarea
// //           className="w-full border p-2 rounded"
// //           placeholder="Vision"
// //           value={formData.vision}
// //           onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
// //           required
// //         ></textarea>
// //         <textarea
// //           className="w-full border p-2 rounded"
// //           placeholder="Values"
// //           value={formData.values}
// //           onChange={(e) => setFormData({ ...formData, values: e.target.value })}
// //           required
// //         ></textarea>

// //         <button
// //           type="submit"
// //           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };



// // AboutUsForm.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Base_url } from "../../apiConfig/api";

// // ✅ LoginWithOtp Component
// const LoginWithOtp = ({ onClose }) => {
//   const [step, setStep] = useState(1);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(`${Base_url}/api/memberRegistration/send-login-otp`, { phoneNumber });
//       if (res.data.success) {
//         setStep(2);
//         setMessage("OTP sent successfully.");
//       } else setMessage(res.data.message || "Failed to send OTP");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(`${Base_url}/api/memberRegistration/verify-login-otp`, { phoneNumber, otp });
//       if (res.data.success && res.data.member) {
//         const member = res.data.member;
//         const role = res.data.role;

//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: member.fullName || member.name || "User",
//             memberCode: member.memberCode || member._id,
//             image: member.image || "",
//             role: role,
//           })
//         );

//         setMessage("Login successful!");
//         setTimeout(() => {
//           if (onClose) onClose(); // Close modal after login
//         }, 800);
//       } else {
//         setMessage(res.data.message || "Invalid OTP");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error verifying OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-2">
//       <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border-4 border-orange-500">
//         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-2 text-center relative">
//           <button
//             onClick={() => onClose && onClose()}
//             className="absolute top-3 right-4 text-white/80 hover:text-white text-3xl font-bold transition"
//           >
//             ×
//           </button>
//           <h1 className="text-2xl font-bold text-white mb-1">सदस्य लॉगिन</h1>
//           <p className="text-blue-100 text-sm">Member Login Portal</p>
//         </div>

//         <div className="px-6 py-6">
//           {step === 1 ? (
//             <form onSubmit={handleSendOtp} className="space-y-4">
//               <input
//                 type="tel"
//                 placeholder="Enter registered mobile"
//                 value={phoneNumber}
//                 onChange={(e) =>
//                   setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
//                 }
//                 className="w-full border-2 rounded-lg px-3 py-2"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-700 text-white py-2 rounded-lg"
//               >
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOtp} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 4-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
//                 className="w-full border-2 rounded-lg px-3 py-2 text-center"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-green-600 text-white py-2 rounded-lg"
//               >
//                 {loading ? "Verifying..." : "Verify & Login"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="w-full text-blue-600 text-xs underline"
//               >
//                 ← Change Mobile Number
//               </button>
//             </form>
//           )}

//           {message && (
//             <div className="mt-2 p-2 text-center text-xs font-semibold text-red-700 border border-red-200 rounded">
//               {message}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ AboutUsForm Component
// const AboutUsForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     mission: "",
//     vision: "",
//     values: "",
//   });

//   const [user, setUser] = useState({});
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user.name || !user.memberCode) {
//       setShowLoginModal(true);
//       return;
//     }

//     const dataToSend = {
//       ...formData,
//       memberName: user.name,
//       memberCode: user.memberCode,
//     };

//     try {
//       await axios.post(`${Base_url}/api/about`, dataToSend);
//       alert("About Us added successfully!");
//       navigate("/admin");
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Failed to submit");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded mt-6">
//       <h2 className="text-2xl font-bold mb-4">Add About Us Content</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="mission"
//           placeholder="Mission"
//           value={formData.mission}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="vision"
//           placeholder="Vision"
//           value={formData.vision}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="values"
//           placeholder="Values"
//           value={formData.values}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <LoginWithOtp
//           onClose={() => {
//             setShowLoginModal(false);
//             const storedUser = JSON.parse(localStorage.getItem("user"));
//             if (storedUser) setUser(storedUser);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default AboutUsForm;


import React, { useState } from "react";
import axios from "axios";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";

const AboutUsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mission: "",
    vision: "",
    values: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      alert("Please login first!");
      return;
    }

    const dataToSend = {
      ...formData,
      memberCode: loggedInUser.memberCode || loggedInUser._id,
      memberName: loggedInUser.name,
      communityId: loggedInUser.communityId,
      communityName:
        loggedInUser.communityName || loggedInUser.community || "",
    };

    try {
      const res = await axios.post(`${Base_url}/api/about`, dataToSend);
      alert("✅ About details added successfully!");
      console.log("Response:", res.data);
      setFormData({
        title: "",
        description: "",
        mission: "",
        vision: "",
        values: "",
      });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to submit About details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center p-2 text-white bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900">
        Add About Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Mission:
          </label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Vision:</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Values:</label>
          <textarea
            name="values"
            value={formData.values}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Save About Details
        </button>
      </form>
    </div>
  );
};

export default AboutUsForm;
