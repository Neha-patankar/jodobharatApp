import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, X } from "lucide-react";

export default function ContactInfo() {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 border border-gray-200 text-center">
      {/* Close button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
        Aanshi Solutions
      </h2>
      <p className="text-gray-700 font-medium">Vishal H Porwal</p>

      <div className="flex justify-center items-center gap-2 mt-3 text-gray-600">
        <Phone className="w-5 h-5 text-indigo-500" />
        <span className="font-medium">+91 98270 72993</span>
      </div>
    </div>
  );
}
