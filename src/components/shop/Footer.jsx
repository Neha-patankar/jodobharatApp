import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#344742] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Jivitha Ayurveda</h2>
          <p className="text-sm text-gray-300">
            Bringing natural wellness to your doorstep with trusted Ayurvedic products.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: info@jivitha.com</p>
          <p className="text-sm text-gray-300">Phone: +91-9876543210</p>
          <p className="text-sm text-gray-300">Location: Indore, MP, India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Jivitha Ayurveda. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
