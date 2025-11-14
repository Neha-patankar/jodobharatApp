import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export default function ContactSection() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/contact`, {
          params: {
            memberCode: user.memberCode,       // ✅ Correct
            memberName: user.memberName,       // ✅ Corrected key
            communityName: user.communityName, // ✅ Correct
          },
        });

        if (Array.isArray(res.data)) {
          setContacts(res.data);
        } else {
          setContacts([res.data]);
        }
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team or representatives
          </p>
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contact info available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition"
              >
                {contact.image && (
                  <img
                    src={`${Base_url}${contact.image}`}
                    alt={contact.memberName || "Contact"}
                    className="h-24 w-24 mx-auto mb-4 object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <p className="text-gray-800 font-medium mb-1">{contact.memberName}</p>
                <p className="text-sm text-gray-600 mt-2">📞 {contact.phone}</p>
                <p className="text-sm text-gray-600">✉️ {contact.email}</p>
                <p className="text-sm text-gray-600">📍 {contact.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
