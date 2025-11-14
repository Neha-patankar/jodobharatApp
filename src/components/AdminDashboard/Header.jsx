


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../../apiConfig/api";

const Header = ({ showFullMenu = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", image: "" });

  // ✅ Load user info from localStorage dynamically
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const menuItems = [
    { title: "कमिटी", path: "/committee-creation" },
    { title: "मेंबर्स", path: "/member-card" },
    { title: "डॉक्टर", path: "/doctors" },
    { title: "ब्लड बैंक", path: "/blood-group" },
    { title: "विवाह रिश्ते", path: "/matrimony" },
    { title: "उपलब्धिया", path: "/news/उपलब्धिया" },
    { title: "कार्यक्रम", path: "/news/कार्यक्रम" },
    { title: "सुझाव", path: "/news/सुझाव" },
    { title: "निमंत्रण", path: "/news/निमंत्रण" },
    { title: "नौकरी", path: "/news/नौकरी" },
    { title: "गतिविधियां", path: "/news/गतिविधियां" },
    { title: "समाज सेवा", path: "/news/समाज सेवा" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        {/* ✅ Left Section - Welcome & Name */}
        <div className="flex items-center gap-3">
          {user.image ? (
            <img
              src={`${Base_url}/${user.image.replace(/\\/g, "/")}`}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            स्वागत -: <span className="text-blue-600">{user.name || "User"}</span>
          </h1>
        </div>

        {/* ✅ Right Section - Buttons */}
        <div className="flex items-center gap-1 mt-2 md:mt-0">
          {/* ✅ Go One Step Back Instead of Specific Route */}
          <button onClick={() => navigate(-1)} className="hover:scale-105 transition">
            <img src="/buttons/home.png" className="w-10 h-10 md:w-12 md:h-12" alt="Home" />
          </button>

          <button onClick={() => navigate("/")} className="hover:scale-105 transition">
            <img src="/buttons/logout.png" className="w-10 h-10 md:w-12 md:h-12" alt="Logout" />
          </button>
        </div>
      </div>

      {/* ✅ Full Menu (only for Super Admin Dashboard) */}
      {showFullMenu && (
        <div className="bg-gray-50 border-t border-gray-200 py-3">
          <div className="flex flex-wrap justify-center gap-2 px-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md text-sm md:text-base"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
