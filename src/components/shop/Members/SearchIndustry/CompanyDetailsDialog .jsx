import React from 'react';
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Building, Clock, Users, Package, CreditCard } from "lucide-react";

const CompanyDetailsDialog = ({ isOpen, onClose, company, logo }) => {
  if (!company) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            {/* Header Section */}
            <div className="p-6 border-b">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 flex-shrink-0 border-4 rounded-lg overflow-hidden">
                  <Image
                    src={logo}
                    alt={company.company}
                    className="w-full h-full object-contain"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-1">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {company.company}
                  </Dialog.Title>
                  <p className="mt-2 text-gray-600">{company.product}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{company.contact}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-600" />
                    <span>{company.address}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{company.email || 'Email not available'}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Globe className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{company.website || 'Website not available'}</span>
                  </li>
                </ul>
              </div>

              {/* Company Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Building className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Area: {company.area}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Package className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Products: {company.product}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Employee Count: {company.employees || 'Not specified'}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Operating Hours: {company.hours || 'Not specified'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Section */}
            <div className="p-6 border-t bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => window.location.href = `tel:${company.contact}`}
                  className="px-4 py-2 bg-[#000957] text-white rounded-lg hover:bg-[#000957] transition-colors duration-200"
                >
                  Contact Now
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CompanyDetailsDialog;