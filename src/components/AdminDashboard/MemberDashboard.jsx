// import React from "react";
// import { Home, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// const MemberDashboard = () => {
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate("/memberdashboard");
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   // ✅ Define paths for each menu item
//   const menuItems = [
//    { title: "कमिटी", img: "/buttons/committee.png", path: "/committee-creation" },
//     { title: "मेंबर्स", img: "/buttons/members.png", path: "/member-card" },
//     { title: "डॉक्टर", img: "/buttons/doctoreBtn.png", path: "/profession-card" },
//     { title: "ब्लड बैंक", img: "/buttons/bloodbank.png", path: "/blood-group" },
//      { title: "विवाह रिश्ते", img: "/buttons/rishtey.png", path: "/vivah-riste" },
   
//     {
//       title: "उपलब्धिया",
//       img: "/buttons/achievements.png",
//       path: "/news/उपलब्धिया",
//     },
//     {
//       title: "कार्यक्रम",
//       img: "/buttons/programs.png",
//       path: "/news/कार्यक्रम",
//     },
//     { title: "सुझाव", img: "/buttons/complaints.png", path: "/news/सुझाव" },
//     {
//       title: "निमंत्रण",
//       img: "/buttons/invitations.png",
//       path: "/news/निमंत्रण",
//     },
//     { title: "नौकरी", img: "/buttons/jobs.png", path: "/news/नौकरी" },
//     {
//       title: "गतिविधियां",
//       img: "/buttons/gatividhiya.png",
//       path: "/news/गतिविधियां",
//     },
//     {
//       title: "समाज सेवा",
//       img: "/buttons/samajsewa.png",
//       path: "/news/समाज सेवा",
//     },
//     { title: "बिजनेस प्रोफाइल", img: "/buttons/businessprofile.png", path: "/business" },
//     { title: "Shop Manage", img:  "/buttons/businessprofile.png", path: "/manage-shop" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
     
//       <Header/>
//       {/* Gradient Banner */}
//       <div className="h-16 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex items-center justify-center mt-16">
//         <h1 className="text-2xl font-bold text-white">Member</h1>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 container mx-auto px-0 py-0">
//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-0">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => navigate(item.path)} // ✅ Navigate to page
//               className=""
//             >
//               <div className="text-6xl mb-0">
//                 <img src={item.img} alt={item.title} className="w-32 h-32 sm:w-20 sm:h-20 md:w-48 md:h-48 object-contain" />
//               </div>
//               {/* <h3 className="text-white font-bold text-lg text-center">{item.title}</h3> */}
//             </div>
//           ))}
//         </div>
//       </div>

    
//     </div>
//   );
// };

// export default MemberDashboard;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const { communityName } = useParams(); // ✅ URL se community name mil gaya

   const menuItems = [
   { title: "कमिटी", img: "/buttons/committee.png", path: "/committee-creation" },
    { title: "मेंबर्स", img: "/buttons/members.png", path: "/member-card" },
    { title: "डॉक्टर", img: "/buttons/doctoreBtn.png", path: "/profession-card" },
    { title: "ब्लड बैंक", img: "/buttons/bloodbank.png", path: "/blood-group" },
     { title: "विवाह रिश्ते", img: "/buttons/rishtey.png", path: "/vivah-riste" },
   
    {
      title: "उपलब्धिया",
      img: "/buttons/achievements.png",
      path: "/news/उपलब्धिया",
    },
    {
      title: "कार्यक्रम",
      img: "/buttons/programs.png",
      path: "/news/कार्यक्रम",
    },
    { title: "सुझाव", img: "/buttons/complaints.png", path: "/news/सुझाव" },
    {
      title: "निमंत्रण",
      img: "/buttons/invitations.png",
      path: "/news/निमंत्रण",
    },
    { title: "नौकरी", img: "/buttons/jobs.png", path: "/news/नौकरी" },
    {
      title: "गतिविधियां",
      img: "/buttons/gatividhiya.png",
      path: "/news/गतिविधियां",
    },
    {
      title: "समाज सेवा",
      img: "/buttons/samajsewa.png",
      path: "/news/समाज सेवा",
    },
    { title: "बिजनेस प्रोफाइल", img: "/buttons/businessprofile.png", path: "/business" },
    { title: "Shop Manage", img:  "/buttons/businessprofile.png", path: "/manage-shop" },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <div className="h-16 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex flex-col items-center justify-center mt-16">
        <h1 className="text-2xl font-bold text-white">Member Dashboard</h1>
        <p className="text-white text-sm font-semibold">Community: {communityName}</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-0">
        {menuItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)}>
            <img src={item.img} alt={item.title} className="w-32 h-32 sm:w-20 sm:h-20 md:w-48 md:h-48 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDashboard;
