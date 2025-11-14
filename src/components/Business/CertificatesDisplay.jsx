// CertificatesDisplay.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export default function CertificatesDisplay({ memberCode, memberName, communityName }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Prevent Double API Call (Strict Mode Fix)
  const isFetched = useRef(false);

  useEffect(() => {
    if (!memberCode) return;

    // Stop second call
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Base_url}/api/certificates?memberCode=${memberCode}&memberName=${memberName}&communityName=${communityName}`
        );

        setCertificates(res.data.data || res.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [memberCode, memberName, communityName]);

  if (loading) return <p className="text-center py-8">Loading Certificates...</p>;

  return (
    <div className="px-0">
            <h2 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
          Our Certifications
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Validating our commitment to quality, safety, and excellence
        </p>
      <div className="max-w-6xl mx-auto text-center">
    

        {certificates.length === 0 ? (
          <p className="text-center text-gray-500">No certifications are listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-white rounded-lg shadow p-0 flex flex-col items-center">
                <h3 className="text-lg font-bold bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white py-2 w-full text-center mb-2">
                  {cert.name}
                </h3>

                <div className="mb-4 flex items-center justify-center">
                  <img
                    src={`${Base_url}/uploads/certificates/${cert.image}`}
                    alt={cert.name}
                    className="w-full object-cover"
                  />
                </div>

                <p className="text-sm text-black font-bold bg-gray-200 w-full mb-2 text-center">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
