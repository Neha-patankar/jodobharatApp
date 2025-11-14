import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin } from "lucide-react";
import { Base_url } from "../../apiConfig/api";

const ContactDisplay = ({ memberCode }) => {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/contact/${memberCode}`);
        setContact(res.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load contact info");
      }
    };

    if (memberCode) fetchContact();
  }, [memberCode]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!contact)
    return <p className="text-center text-gray-500">Loading contact...</p>;

  // ✅ Create full image URL
  const imageUrl = contact.image ? `${Base_url}${contact.image}` : null;

  return (
    <div>
       <h2 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
        Contact
      </h2>
    <div className="max-w-6xl mx-auto bg-white">
     

      <div className="grid md:grid-cols-2 gap-0 ">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Phone className="text-blue-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Phone</h4>
              <p className="text-gray-600">{contact.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="text-blue-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Email</h4>
              <p className="text-gray-600">{contact.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Address</h4>
              <p className="text-gray-600">{contact.address || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="">
          {/* ✅ Image show */}
          {imageUrl && (
            <div className="flex justify-center mb-6">
              <img
                src={imageUrl}
                alt="Contact"
                className=" rounded-xl object-cover border-2 border-gray-300 shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactDisplay;
