import React from "react";
import { ShieldCheck, PhoneCall, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 mt-10 shadow-inner">
      <div className="container mx-auto px-6 text-center">
        {/* Powered By Section */}
        <p className="text-sm sm:text-base font-semibold mb-4">
          Powered By{" "}
          <a
            href="https://aanshisolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-white underline underline-offset-2 decoration-2 transition-all duration-300"
          >
            Aanshi Solutions
          </a>
        </p>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-bold mb-6">
          <a
            href="/privacy-policy"
            className="flex items-center gap-1 hover:text-blue-300 transition"
          >
            <ShieldCheck size={14} /> Privacy Policy
          </a>
          <span className="text-gray-400">||</span>
          <a
            href="/contact-info"
            className="flex items-center gap-1 hover:text-blue-300 transition"
          >
            <PhoneCall size={14} /> Contact Us
          </a>
          <span className="text-gray-400">||</span>
          <a
            href="https://www.aanshisolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-300 transition"
          >
            <Globe size={14} /> Visit Website
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-4">
          <p className="text-md font-bold text-white">
            © {new Date().getFullYear()} Jodo Bharat. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
