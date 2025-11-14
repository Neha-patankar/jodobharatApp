import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#344742] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Our Company</h2>
          <p className="text-sm">
            1234 Street Name, City, State, 12345 <br />
            Email: contact@company.com <br />
            Phone: (123) 456-7890
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-2 md:space-y-0 md:space-x-8">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about-us" className="hover:underline">
            About Us
          </a>
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#contact" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white pt-4 mt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-center md:text-left text-sm">
            Copyright © Aanshi Solutions {new Date().getFullYear()}. All rights
            reserved.
          </p>
          <div className="mt-2 md:mt-0 text-center md:text-right text-sm">
            Powered By{" "}
            <Link
              href="https://aanshisolutions.com"
              className="text-white hover:underline"
            >
              Aanshi Solutions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
