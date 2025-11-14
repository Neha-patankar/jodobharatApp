import React, { useState } from "react";

const ClientContactUs = () => {
  return (
    <div className="">
      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Contact Section Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            CONTACT US
          </h1>
        </div>

        {/* Contact Content */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Contact Information (Left Side) */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-start">
              <div className="text-gray-500 text-xl mr-4">📞</div>
              <div>
                <p className="font-medium text-gray-700">Phone</p>
                <p className="text-gray-600">0731-4797858</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-gray-500 text-xl mr-4">🌐</div>
              <div>
                <p className="font-medium text-gray-700">Website</p>
                <a
                  href="http://www.jivitha.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  www.jivitha.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-gray-500 text-xl mr-4">✉️</div>
              <div>
                <p className="font-medium text-gray-700">Email</p>
                <p className="text-gray-600">Lelodawa@yahoo.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-gray-500 text-xl mr-4">📍</div>
              <div>
                <p className="font-medium text-gray-700">Address</p>
                <p className="text-gray-600">
                  Office No.11, 5th floor dawa bazar
                </p>
                <p className="text-gray-600">INDORE (M.P) 452001</p>
              </div>
            </div>
          </div>

          {/* Map Image (Right Side) */}
          <div className="md:w-1/2  rounded-lg overflow-hidden">
            <img
              src="/jivita.png"
              alt="Map to Jivitha Ayurveda location"
              className="w-full h-[400px] rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientContactUs;
