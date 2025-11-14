import React from "react";
import { X, Shield, Lock, Cookie, Link as LinkIcon, FileText, AlertCircle } from "lucide-react";

const TermsAndConditionsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 p-6 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <Shield className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">नियम और शर्तें</h2>
                <p className="text-white/90 text-sm">Privacy Policy & Terms of Service</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 sm:p-8">
          <div className="space-y-6">
            {/* Introduction Alert */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-500 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">महत्वपूर्ण सूचना</p>
                  <p className="text-sm text-blue-800">कृपया पंजीकरण करने से पहले इन शर्तों को ध्यान से पढ़ें।</p>
                </div>
              </div>
            </div>

            {/* Introduction Section */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-orange-500 text-white p-2 rounded-lg">
                  <FileText size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Introduction</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                merasamaj.com is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. merasamaj.com may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 15th May'23.
              </p>
            </div>

            {/* What We Collect */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <Shield size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">What We Collect</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                We may collect the following information:
              </p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">Name and job title</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">Contact information including email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">Demographic information such as postcode, preferences and interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">Other information relevant to customer surveys and/or offers</span>
                </li>
              </ul>
            </div>

            {/* What We Do */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-purple-500 text-white p-2 rounded-lg">
                  <FileText size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">What We Do With The Information</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                We require this information to understand your needs and provide you with a better service:
              </p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700">Internal record keeping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700">Improve our products and services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700">Send promotional emails about new products and special offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700">Contact you for market research purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                  <span className="text-gray-700">Customise the website according to your interests</span>
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Lock size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Security</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
              </p>
            </div>

            {/* Cookies */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-yellow-500 text-white p-2 rounded-lg">
                  <Cookie size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">How We Use Cookies</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site.
              </p>
              <div className="bg-yellow-100 rounded-xl p-4 mt-3">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> Cookies help us provide you with a better website by enabling us to monitor which pages you find useful. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-red-500 text-white p-2 rounded-lg">
                  <LinkIcon size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Links to Other Websites</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.
              </p>
            </div>

            {/* Controlling Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-indigo-500 text-white p-2 rounded-lg">
                  <Shield size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Controlling Your Personal Information</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                You may choose to restrict the collection or use of your personal information:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold flex-shrink-0">→</span>
                  <span>Look for the checkbox to indicate you don't want information used for direct marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold flex-shrink-0">→</span>
                  <span>You can change your mind anytime by contacting us at <strong className="text-indigo-600">info@merasamaj.com</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold flex-shrink-0">→</span>
                  <span>We will not sell, distribute or lease your personal information to third parties without your permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold flex-shrink-0">→</span>
                  <span>You may request details of personal information under the Data Protection Act 1998</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 border-2 border-orange-300">
              <div className="text-center">
                <p className="text-gray-700 font-semibold mb-2">किसी भी प्रश्न के लिए संपर्क करें:</p>
                <a href="mailto:info@merasamaj.com" className="text-orange-600 font-bold text-lg hover:text-orange-800 underline">
                  info@merasamaj.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <X size={20} />
            बंद करें
          </button>
          <button
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:via-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Shield size={20} />
            मैं सहमत हूँ
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #fbbf24);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #f59e0b);
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditionsModal