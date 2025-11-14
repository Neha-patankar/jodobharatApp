"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Menu,
  Users,
  Briefcase,
  Settings,
  Home,
  Package,
  Info,
  HeartHandshake,
  Award,
  UserCog,
  Phone,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
// import Footer from "./Footer";
// import HomeCardSlider from "./HomeCardSlider";
// import Product from "../../Product/Product";
import Services from "./Services";
import Certifications from "./Certification";
import Management from "./Management";
import Clients from "./Clients";
import ClientProduct from "./ClientProducts";
import ClientContactUs from "./ClientContactUs";

// Define smoothScroll function
const smoothScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const CompanyDetails = ({ company }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (id) => {
    smoothScroll(id);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
      setIsMenuOpen(false);
    }
  };

  // Sidebar navigation items with icons
  const sidebarItems = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" /> },
    { id: "about-us", label: "About Us", icon: <Info className="w-6 h-6" /> },
    {
      id: "management",
      label: "Management",
      icon: <UserCog className="w-6 h-6" />,
    },
    {
      id: "certification",
      label: "Certification",
      icon: <Award className="w-6 h-6" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <HeartHandshake className="w-6 h-6" />,
    },
    {
      id: "clients",
      label: "Clients",
      icon: <Users className="w-6 h-6" />,
    },
    { id: "product", label: "Product", icon: <Package className="w-6 h-6" /> },
    { id: "contact", label: "Contact Us", icon: <Phone className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      {/* Sidebar - fixed for mobile, sticky for desktop */}
      <div
        className={`bg-[#344742] text-white transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          isSidebarOpen ? "md:w-48" : "md:w-24"
        } md:sticky md:top-0 md:h-screen fixed w-64 h-full overflow-y-auto shadow-lg z-50`}
      >
        {/* Mobile close button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Toggle sidebar button - desktop only */}
        <button
          onClick={toggleSidebar}
          className="w-full p-4 hidden md:flex items-center justify-center border-b border-gray-700 hover:bg-[#34495e]"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Navigation Items */}
        <div className="py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full p-4 flex items-center hover:bg-[#34495e] transition-colors duration-200"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg">
                {item.icon}
              </div>
              {(isSidebarOpen || isMobile) && (
                <span className="ml-2">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 w-full`}>
        {/* Header Section with Logo and Company Name */}
        <header className="bg-[#344742]  p-4 md:p-4 shadow-md flex  gap-4 items-center justify-center text-center">
          <Image
            src={company?.imageLogo || "/default-logo.png"}
            alt={company?.company || "Company Logo"}
            width={100}
            height={100}
            className=""
          />
          <h1 className="text-2xl  md:text-4xl font-bold mt-4 text-white " >
            {company?.company || "Our Company"}
          </h1>
        </header>

        {/* Main Content */}
        <div className="p-4 md:p-5 space-y-8 md:space-y-16 bg-[#f0f2f5]">
          <section id="home" className="">
            <HomeCardSlider company={company}  />
           
          </section>

          <section id="management" className="">
            <Management company={company} />
          </section>

          <section id="certification" className="">
            <Certifications company={company} />
          </section>

          <section id="services" className="">
            <Services company={company} />
          </section>

          <section id="clients" className="">
            <Clients company={company} />
          </section>

          <section id="product" className="">
            <ClientProduct company={company} />
          </section>

          <section
            id="contact"
            className=" "
          >
            <ClientContactUs company={company} />
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CompanyDetails;
