

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Base_url } from "../../apiConfig/api";

// const LoginWithOtp = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${Base_url}/api/memberRegistration/send-login-otp`,
//         { phoneNumber }
//       );
//       if (res.data.success) {
//         setStep(2);
//         setMessage("OTP sent successfully to your registered mobile number.");
//       } else {
//         setMessage(res.data.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || "Server error while sending OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Verify OTP and Redirect by Role + Status
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${Base_url}/api/memberRegistration/verify-login-otp`,
//         { phoneNumber, otp }
//       );

//       if (res.data.success) {
//         const member = res.data.member;
//         const role = res.data.role;

//         if (!member) {
//           setMessage("Member details not found!");
//           return;
//         }

//         // ✅ Save to localStorage for Header.jsx + community linkage
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: member.fullName || member.name || "User",
//             image: member.image || "",
//             role: role,
//             communityId: member.communityId || "", // ✅ Added communityId
//             community: member.communityName || "",
//             memberType: member.memberType,
//           })
//         );

//         // ✅ Role-based navigation
//         if (role === "superadmin") {
//           setMessage("Welcome Super Admin!");
//           setTimeout(() => navigate("/superadmindashboard"), 1000);
//         } else if (member.status === "inactive") {
//           setMessage("Your account is inactive. Please contact admin.");
//         } else if (member.memberType === "subadmin") {
//           const community = member.communityName
//             ? member.communityName.toLowerCase().replace(/\s+/g, "-")
//             : "unknown";
//           setMessage(
//             `Welcome Sub Admin of ${member.communityName || "Community"}!`
//           );
//           setTimeout(() => navigate(`/communitydashboard/${community}`), 1000);
//         } else if (member.memberType === "member") {
//           const community = member.communityName
//             ? member.communityName.toLowerCase().replace(/\s+/g, "-")
//             : "unknown";
//           setMessage(
//             `Welcome Member of ${member.communityName || "Community"}!`
//           );
//           setTimeout(() => navigate(`/memberdashboard/${community}`), 1000);
//         } else {
//           setMessage("Unknown user role.");
//         }
//       } else {
//         setMessage(res.data.message || "Invalid OTP");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error verifying OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => setIsOpen(false);
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-2">
//       <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-500">
//         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-2 text-center relative">
//           <button
//             onClick={() => navigate("/")}
//             className="absolute top-3 right-4 text-white/80 hover:text-white text-3xl font-bold transition"
//           >
//             ×
//           </button>

//           <div className="relative z-10 mb-1">
//             <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-orange-400 overflow-hidden">
//               <img
//                 src="/buttons/jodobharatogo.png"
//                 alt="Jodo Bharat Logo"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold text-white mb-1 relative z-10">
//             सदस्य लॉगिन
//           </h1>
//           <p className="text-blue-100 text-sm relative z-10">
//             Member Login Portal
//           </p>
//         </div>

//         <div className="px-6 py-6">
//           {step === 1 ? (
//             <form onSubmit={handleSendOtp} className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-gray-700 font-semibold text-sm">
//                   📱 मोबाइल नंबर दर्ज करें
//                 </label>
//                 <div className="relative">
//                   <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
//                     <span className="px-3 py-2 bg-blue-50 text-blue-700 font-bold text-sm border-r-2 border-gray-200">
//                       +91
//                     </span>
//                     <input
//                       type="tel"
//                       value={phoneNumber}
//                       onChange={(e) =>
//                         setPhoneNumber(
//                           e.target.value.replace(/\D/g, "").slice(0, 10)
//                         )
//                       }
//                       placeholder="Enter registered mobile"
//                       className="w-full px-3 py-2 focus:outline-none text-gray-700 text-sm"
//                       required
//                     />
//                     {phoneNumber && (
//                       <button
//                         type="button"
//                         onClick={() => setPhoneNumber("")}
//                         className="px-3 text-gray-400 hover:text-gray-600"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50 text-sm"
//               >
//                 {loading ? "Sending OTP..." : "📤 Send OTP"}
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOtp} className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-gray-700 font-semibold text-sm">
//                   🔐 OTP दर्ज करें
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) =>
//                       setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
//                     }
//                     placeholder="Enter 4-digit OTP"
//                     className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-center text-md font-bold tracking-widest"
//                     required
//                   />
//                   {otp && (
//                     <button
//                       type="button"
//                       onClick={() => setOtp("")}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//                 <p className="mt-2 text-xs text-gray-500 text-center">
//                   OTP sent to +91 {phoneNumber}
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50 text-xs"
//               >
//                 {loading ? "Verifying..." : "✅ Verify & Login"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="w-full text-blue-600 hover:text-blue-800 font-semibold text-xs underline"
//               >
//                 ← Change Mobile Number
//               </button>
//             </form>
//           )}

//           {message && (
//             <div
//               className={`mt-4 p-3 rounded-lg text-center text-xs font-semibold ${
//                 message.includes("Welcome") || message.includes("success")
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {message}
//             </div>
//           )}

//           <div className="mt-4 text-center">
//             <p className="text-gray-600 text-xs mb-2">Don’t have an account?</p>
//             <a
//               href="/memberregistration"
//               className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
//             >
//               📝 Register Now
//             </a>
//           </div>

//           <p className="mt-4 text-center text-xs text-gray-600">
//             🔒 Secure login with OTP verification
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginWithOtp;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../../apiConfig/api";

const LoginWithOtp = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${Base_url}/api/memberRegistration/send-login-otp`,
        { phoneNumber }
      );
      if (res.data.success) {
        setStep(2);
        setMessage("OTP sent successfully to your registered mobile number.");
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Server error while sending OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP and Redirect by Role + Status
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${Base_url}/api/memberRegistration/verify-login-otp`,
        { phoneNumber, otp }
      );

      if (res.data.success) {
        const member = res.data.member;
        const role = res.data.role;

        if (!member) {
          setMessage("Member details not found!");
          return;
        }

        console.log("🟢 Backend Member Response:", member);

        // ✅ Fix: Ensure correct fields are saved in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: member.fullName || member.name || "User",
            image: member.image || "",
            role: role || member.role || "member",
            memberType: member.memberType || "",
            memberCode:
              member.memberCode || member.member_code || member.code || "",
            communityId:
              member.communityId ||
              member.community_id ||
              member._id ||
              "",
            communityName:
              member.communityName || member.community || member.name || "",
          })
        );

        // ✅ Debug check
        console.log("✅ Saved user:", JSON.parse(localStorage.getItem("user")));

        // ✅ Navigation by role
        if (role === "superadmin") {
          setMessage("Welcome Super Admin!");
          setTimeout(() => navigate("/superadmindashboard"), 1000);
        } else if (member.status === "inactive") {
          setMessage("Your account is inactive. Please contact admin.");
        } else if (member.memberType === "subadmin") {
          const community = (member.communityName || "community")
            .toLowerCase()
            .replace(/\s+/g, "-");
          setMessage(`Welcome Sub Admin of ${member.communityName || ""}!`);
          setTimeout(() => navigate(`/communitydashboard/${community}`), 1000);
        } else if (member.memberType === "member") {
          const community = (member.communityName || "community")
            .toLowerCase()
            .replace(/\s+/g, "-");
          setMessage(`Welcome Member of ${member.communityName || ""}!`);
          setTimeout(() => navigate(`/memberdashboard/${community}`), 1000);
        } else {
          setMessage("Unknown user role.");
        }
      } else {
        setMessage(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsOpen(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-2">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-500">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-2 text-center relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-3 right-4 text-white/80 hover:text-white text-3xl font-bold transition"
          >
            ×
          </button>

          <div className="relative z-10 mb-1">
            <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-orange-400 overflow-hidden">
              <img
                src="/buttons/jodobharatogo.png"
                alt="Jodo Bharat Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1 relative z-10">
            सदस्य लॉगिन
          </h1>
          <p className="text-blue-100 text-sm relative z-10">
            Member Login Portal
          </p>
        </div>

        <div className="px-6 py-6">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold text-sm">
                  📱 मोबाइल नंबर दर्ज करें
                </label>
                <div className="relative">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                    <span className="px-3 py-2 bg-blue-50 text-blue-700 font-bold text-sm border-r-2 border-gray-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="Enter registered mobile"
                      className="w-full px-3 py-2 focus:outline-none text-gray-700 text-sm"
                      required
                    />
                    {phoneNumber && (
                      <button
                        type="button"
                        onClick={() => setPhoneNumber("")}
                        className="px-3 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50 text-sm"
              >
                {loading ? "Sending OTP..." : "📤 Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold text-sm">
                  🔐 OTP दर्ज करें
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="Enter 4-digit OTP"
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-center text-md font-bold tracking-widest"
                    required
                  />
                  {otp && (
                    <button
                      type="button"
                      onClick={() => setOtp("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  OTP sent to +91 {phoneNumber}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50 text-xs"
              >
                {loading ? "Verifying..." : "✅ Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-blue-600 hover:text-blue-800 font-semibold text-xs underline"
              >
                ← Change Mobile Number
              </button>
            </form>
          )}

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center text-xs font-semibold ${
                message.includes("Welcome") || message.includes("success")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-xs mb-2">Don’t have an account?</p>
            <a
              href="/memberregistration"
              className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
            >
              📝 Register Now
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-gray-600">
            🔒 Secure login with OTP verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
