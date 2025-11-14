import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import Header from "./Header";

const SuperAdmindashboard = () => {
  const navigate = useNavigate();

  // Main menu items
  const menuItems = [
    {
      title: "कमिटी",
      img: "/buttons/committee.png",
      path: "/committee-creation",
    },
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
  ];

  // Admin Section Items
  const adminItems = [
    {
      title: "AdminDetails",
      color: "from-blue-900  via-blue-700 to-blue-900",
      path: "/admindetails",
    },
      {
      title: "MemberDetails",
      color: "from-blue-900  via-blue-700 to-blue-900",
      path: "/member-details",
    },
    // { title: "SuperAdminDetails", color: "from-blue-700 to-blue-800", path: "/superadmindetails" },
    {
      title: "Community Creation",
      color: "from-blue-900  via-blue-700 to-blue-900",
      path: "/community-create",
    },
    {
      title: "Community Management",
      color: "from-blue-900  via-blue-700 to-blue-900",
      path: "/community-manage",
    }, // ✅ fixed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
     
      <Header/>

      {/* Gradient Banner */}
      <div className="h-20 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex items-center justify-center mt-16">
        <h1 className="text-2xl font-bold text-white ">Super Admin</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-0 py-0">
        {/* Main Menu Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-0 mb-0">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={` `}
            >
              <div className="flex flex-col items-center justify-center text-center ">
                <div className="text-5xl mb-0">
                  {/* <img src={item.img} className="w-32 h-36 sm:w-20 sm:h-20 md:w-36 md:h-36 object-contain"></img> */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className=" object-contain"
                  />
                </div>
                {/* <h3 className="text-black font-bold text-lg">{item.title}</h3> */}
              </div>
              
            </div>
            
          ))}
        
        </div>

        {/* Admin Section */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {adminItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 `}
            >
              <h3 className="text-white font-semibold text-center text-sm sm:text-base md:text-lg px-0">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmindashboard;
