import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/contact`);
        setContactInfo(res.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">CONTACT US</h2>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 space-y-8 mb-10 lg:mb-0">
            <ContactItem label="Phone" value={contactInfo.phone} iconColor="red" />
            <ContactItem label="Email" value={contactInfo.email} link={`mailto:${contactInfo.email}`} iconColor="pink" />
            <ContactItem label="Website" value={contactInfo.website} link={contactInfo.website} iconColor="blue" />
            <ContactItem label="Address" value={contactInfo.address} iconColor="purple" />
          </div>

          <div className="w-full lg:w-1/2">
            {contactInfo.image && (
              <img
                src={`${Base_url}${contactInfo.image}`}
                alt="Office"
                className="object-cover w-full h-80 rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value, link, iconColor }) {
  return (
    <div className="flex items-center">
      <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-${iconColor}-100`}>
        <div className={`h-5 w-5 text-${iconColor}-500`}>
          {/* Replace this with an actual icon if needed */}
          📌
        </div>
      </div>
      <div className="ml-4">
        <p className="text-gray-700 font-medium">{label}</p>
        {link ? (
          <a href={link} className="text-blue-500 hover:underline">{value}</a>
        ) : (
          <p className="text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}
