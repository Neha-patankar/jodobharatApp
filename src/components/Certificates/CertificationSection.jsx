import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([]);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user) return;

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${Base_url}/api/certificates?memberCode=${user.memberCode}&memberName=${user.name}&communityName=${user.communityName}`
      );
      setCertificates(res.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  fetchCertificates();
}, []);


  return (
    <div className="px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Certifications</h2>
        <p className="text-center text-gray-600 mb-12">Validating our commitment to quality, safety, and excellence</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certificates.map(cert => (
            <div key={cert._id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="mb-4 w-32 h-32 flex items-center justify-center">
                <img src={`${Base_url}/uploads/certificates/${cert.image}`} alt={cert.name} className="max-w-full max-h-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{cert.name}</h3>
              <p className="text-sm text-gray-600 text-center">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
