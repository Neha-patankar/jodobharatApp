import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Package,
  Award,
  Phone
} from "lucide-react";

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

export default NavigationMenu;
