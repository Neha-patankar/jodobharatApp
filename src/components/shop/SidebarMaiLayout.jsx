import { useState, useEffect } from "react";
import {
  Home,
  Info,
  UserCog,
  Award,
  HeartHandshake,
  Users,
  Package,
  Phone,
  Menu,
  User,
  X,
} from "lucide-react";

// import { AboutUs } from "./AboutUs";
import { AboutUs } from "../Aboutus/AboutUs";
import CertificationsSection from "../Certificates/CertificationSection";
import ManagementTeam from "../ManagementTeam/ManagementTeam";
import ServicesSection from "./ServicesSection";
import ClientsSection from "../clients/ClientSection";
import ContactSection from "./ContactSection";
import HomePage from "./HomePage";
import { Navbar } from "./Navbar";

import AdminPage from "./AdminPage"; // ✅ Correct

import Product from "../Product/product";

// Dummy components
const ProductPage = () => <div className="p-6">📦 Our Products</div>;
// const AdminPage = () => <div className="p-6">🛠️ Admin Panel</div>;

const SidebarMainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState("home");

  useEffect(() => {
    const checkIfMobile = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) setIsSidebarOpen(false);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    { id: "about-us", label: "About Us", icon: <Info className="w-5 h-5" /> },
    { id: "management", label: "Management", icon: <UserCog className="w-5 h-5" /> },
    { id: "certification", label: "Certification", icon: <Award className="w-5 h-5" /> },
    { id: "services", label: "Services", icon: <HeartHandshake className="w-5 h-5" /> },
    { id: "clients", label: "Clients", icon: <Users className="w-5 h-5" /> },
    { id: "product", label: "Product", icon: <Package className="w-5 h-5" /> },
    { id: "contact", label: "Contact Us", icon: <Phone className="w-5 h-5" /> },
    // { id: "admin", label: "Login", icon: <User className="w-6 h-6" /> },
  ];

  const renderContent = () => {
    switch (selectedPage) {
      case "home": return <HomePage />;
      case "about-us": return <AboutUs />;
      case "management": return <ManagementTeam />;
      case "certification": return <CertificationsSection />;
      case "services": return <ServicesSection />;
      case "clients": return <ClientsSection />;
      case "product": return <Product/>;
      case "contact": return <ContactSection />;
      // case "admin": return <AdminPage/>;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`bg-[#a15d2a] text-white z-50 transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${isSidebarOpen ? "md:w-52" : "md:w-24"} w-64
            fixed md:sticky top-0 left-0 h-screen`}
        >
          {/* Mobile Close */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-white md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Desktop Toggle */}
          <button
            onClick={toggleSidebar}
            className="w-full p-4 hidden md:flex items-center justify-center border-b  hover:bg-[#413a12]"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Sidebar Items */}
          <div className="py-4 ">
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedPage(item.id);
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`flex items-center font-bold gap-2 text-md px-4 py-3 hover:bg-[#273644] cursor-pointer ${
                  selectedPage === item.id ? "bg-[#2c3e50]" : ""
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md">
                  {item.icon}
                </div>
                {(isSidebarOpen || isMobile) && <span className="ml-2">{item.label}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={toggleSidebar}
          />
        )}

        {/* Content Area */}
        <main
          className={`flex-1 ml-0 md:ml-${isSidebarOpen ? "0" : "0"} mt-16 md:mt-20 overflow-y-auto h-screen  bg-gray-100`}
        >
          {renderContent()}
        </main>
        
      </div>
      
    </div>
  );
};

export default SidebarMainLayout;
