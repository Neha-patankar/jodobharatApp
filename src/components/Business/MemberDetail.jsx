// MemberDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../AdminDashboard/Header";
import { Base_url } from "../../apiConfig/api";
import {
  ChevronDown,
  Award,
  Users,
  Package,
  Briefcase,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// 💡 Imported Components
import { AboutMember } from "./AboutMember";
import ManagementTeamDisplay from "./ManagementTeamDisplay";
import CertificatesDisplay from "./CertificatesDisplay";
import ClientsDisplay from "./ClientsDisplay";
import ProductsDisplay from "./ProductsDisplay";
import ServicesDisplay from "./ServicesDisplay";
import ContactDisplay from "./ContactDisplay";
import { ProductSlider } from "../shop/ProductSlider";

// --- Utility Functions (Same as before) ---
const getArrayFromResponse = (responseData) => {
  if (Array.isArray(responseData)) return responseData;
  if (responseData.data && Array.isArray(responseData.data))
    return responseData.data;
  if (responseData.members && Array.isArray(responseData.members))
    return responseData.members;
  if (responseData.result && Array.isArray(responseData.result))
    return responseData.result;
  return [];
};

const safeFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API failed: ${url} returned status ${response.status}`);
  }
  try {
    return await response.json();
  } catch (e) {
    console.error(`❌ JSON Parsing Error for URL: ${url}`, e);
    throw new Error(`Could not parse JSON response from ${url}.`);
  }
};

// Section Component with scroll animation
const Section = ({ id, icon: Icon, title, children, bgColor = "bg-white" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [id]);

  return (
    <section
      id={id}
      className={`py-4 ${bgColor} scroll-mt-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className=" ">
      
        {children}
      </div>
    </section>
  );
};

// Navigation Menu
const NavigationMenu = () => {
  const [activeSection, setActiveSection] = useState("about");

  const menuItems = [
    { id: "about", label: "About", icon: Briefcase },
    { id: "management", label: "Team", icon: Users },
    { id: "products", label: "Products", icon: Package },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "clients", label: "Clients", icon: Users },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  // Scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Active section highlight logic
  useEffect(() => {
    const handleScroll = () => {
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-16 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 shadow-md z-40">
      <div className="w-full px-2">

        {/* MOBILE RESPONSIVE FIX */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar py-3 w-full">

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300
                ${
                  activeSection === item.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-white hover:bg-blue-100 hover:text-blue-700"
                }
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}

        </div>
      </div>
    </nav>
  );
};

// --- Main Component ---
export default function MemberDetail() {
  const { memberName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberData, setMemberData] = useState(null);

  const getSearchableName = (urlName) => {
    return urlName?.replace(/-/g, " ").toLowerCase();
  };

  useEffect(() => {
    const fetchCoreMemberData = async () => {
      try {
        setLoading(true);
        const searchName = getSearchableName(memberName);
        const memberResponseData = await safeFetch(
          `${Base_url}/api/memberRegistration`
        );
        const memberList = getArrayFromResponse(memberResponseData);

        const member = memberList.find(
          (m) => m.name?.toLowerCase() === searchName
        );

        if (!member) {
          setError("Member not found or link is incorrect.");
          setLoading(false);
          return;
        }

        setMemberData(member);
        setLoading(false);
      } catch (err) {
        console.error("Final Error fetching core data:", err);
        setError(`Failed to load member profile: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCoreMemberData();
  }, [memberName]);

  // --- UI States ---
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading member details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p className="text-xl mb-4">Error: {error}</p>
      </div>
    );

  if (!memberData)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Details for this member could not be loaded.
        </p>
      </div>
    );

  // Destructure props
  const { memberCode, name, communityName } = memberData;

  // --- JSX UI - WEBSITE STYLE ---
  return (
    <div className="min-h-screen  mx-auto text-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Navigation Menu */}
      <NavigationMenu />
      <ProductSlider />

      {/* All Sections - Website Style */}
      <Section
        id="about"
        icon={Briefcase}
        title="About Company"
        bgColor="bg-white"
      >
        <AboutMember
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section
        id="management"
        icon={Users}
        title="Management Team"
        bgColor="bg-gray-50"
      >
        <ManagementTeamDisplay
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section
        id="products"
        icon={Package}
        title="Our Products"
        bgColor="bg-white"
      >
        <ProductsDisplay
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section
        id="services"
        icon={Briefcase}
        title="Our Services"
        bgColor="bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <ServicesDisplay
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section
        id="certificates"
        icon={Award}
        title="Certifications"
        bgColor="bg-white"
      >
        <CertificatesDisplay
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section id="clients" icon={Users} title="Our Clients" bgColor="bg-white">
        <ClientsDisplay
          memberCode={memberCode}
          memberName={name}
          communityName={communityName}
        />
      </Section>

      <Section id="contact" icon={Phone} title="Contact Us" bgColor="bg-white">
        <div className="text-white">
          <ContactDisplay
            memberCode={memberCode}
            memberName={name}
            communityName={communityName}
          />
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left Side */}
          <p className="text-gray-300 text-sm font-bold">
            © 2024 {name}. All rights reserved.
          </p>

          {/* Right Side - Powered By */}
          <p className="text-orange-400 text-md font-bold mt-2 md:mt-0 flex items-center">
            Powered by :
            <a
              href="https://aanshisolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0 underline text-orange-500 hover:text-orange-300"
            >
              aanshisolutions.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
