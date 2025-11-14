


import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const SubAdmindashboard = () => {
  const navigate = useNavigate();
  const { communityName } = useParams(); // ✅ URL se community name le liya

  const menuItems = [
    { title: "कमिटी", img: "/buttons/committee.png", path: "/committee-creation" },
    { title: "मेंबर्स", img: "/buttons/members.png", path: "/member-card" },
    { title: "डॉक्टर", img: "/buttons/doctoreBtn.png", path: "/profession-card" },
    { title: "ब्लड बैंक", img: "/buttons/bloodbank.png", path: "/blood-group" },
    { title: "विवाह रिश्ते", img: "/buttons/rishtey.png", path: "/vivah-riste" },
    { title: "बिजनेस प्रोफाइल", img: "/buttons/businessprofile.png", path: "/business" },
    { title: "उपलब्धिया", img: "/buttons/achievements.png", path: "/news/उपलब्धिया" },
    { title: "कार्यक्रम", img: "/buttons/programs.png", path: "/news/कार्यक्रम" },
    { title: "सुझाव", img: "/buttons/complaints.png", path: "/news/सुझाव" },
    { title: "निमंत्रण", img: "/buttons/invitations.png", path: "/news/निमंत्रण" },
    { title: "नौकरी", img: "/buttons/jobs.png", path: "/news/नौकरी" },
    { title: "गतिविधियां", img: "/buttons/gatividhiya.png", path: "/news/गतिविधियां" },
    { title: "समाज सेवा", img: "/buttons/samajsewa.png", path: "/news/समाज सेवा" },
  ];

  const adminItems = [
    { title: "MemberDetails", color: "from-blue-900 via-blue-700 to-blue-900", path: "/community-member-dashboard" },
    { title: "Shop Allowed", color: "from-blue-900 via-blue-700 to-blue-900", path: "/shopallow-dashboard" },
    { title: "Committee Create", color: "from-blue-900 via-blue-700 to-blue-900", path: "/commiteecreation" },
    { title: "Committee Manage", color: "from-blue-900 via-blue-700 to-blue-900", path: "/commitee-manage" },
    { title: "Create Post", color: "from-blue-900 via-blue-700 to-blue-900", path: "/news-post" },
    { title: "Post Manage", color: "from-blue-900 via-blue-700 to-blue-900", path: "/news-manage" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* ✅ Dynamic Community Banner */}
      <div className="h-20 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex flex-col items-center justify-center mt-16">
        <h1 className="text-2xl font-bold text-white">
             Community Admin Dashboard
        </h1>
        <p className="text-white text-md font-bold ">
          Community Name: {communityName?.charAt(0).toUpperCase() + communityName?.slice(1)}
        </p>
      </div>

      {/* ✅ Main Menu */}
      <div className="container mx-auto px-2 py-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-0 mb-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="cursor-pointer transform hover:scale-105 transition"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className=" object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Admin Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 px-4">
          {adminItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-2 shadow-lg `}
            >
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[120px]">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubAdmindashboard;
