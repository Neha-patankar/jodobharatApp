import React, { useState, useEffect } from "react";

const JodoBharaPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Popup auto show after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Close modal
  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-4xl w-[90%] max-w-md relative overflow-hidden border-4 border-orange-400">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-orange-400 hover:text-red-600 text-4xl text-bold"
        >
          ×
        </button>

        {/* Image Section */}
        <div className="w-full  ">
          <img
            src="/buttons/jodobharatogo.png"
            alt="Advertisement"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AMS / Advertisement Section */}
        <div className="p-5 text-center bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
          <h2 className="text-xl font-bold text-orange-500 mb-2">Special Offer!</h2>
          <p className="text-white mb-4 font-bold text-md">
            Join Jodo Bhara today and get exclusive access to premium features.
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default JodoBharaPopup;
