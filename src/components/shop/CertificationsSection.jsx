import React from 'react';

export default function CertificationsSection() {
  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "International quality management system standard",
      image: "/cert/cert1.png"
    },
    {
      id: 2,
      name: "FDA Approved",
      description: "Food and Drug Administration approval for safety",
      image: "/cert/cert2.png"
    },
    {
      id: 3,
      name: "Vegetarian Friendly",
      description: "Products suitable for vegetarian consumption",
      image: "/cert/cert3.png"
    },
    {
      id: 4,
      name: "100% Organic",
      description: "Products made with organic ingredients",
      image: "/cert/cert4.png"
    },
    {
      id: 5,
      name: "GMP Certified",
      description: "Good Manufacturing Practice certification",
      image: "/cert/cert5.png"
    },
    {
      id: 6,
      name: "HACCP",
      description: "Hazard Analysis Critical Control Points food safety system",
      image: "/cert/cert6.png"
    },
    {
      id: 7,
      name: "Halal Certified",
      description: "Products compliant with Islamic dietary laws",
      image: "/cert/cert7.png"
    }
  ];

  return (
    <div className=" px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Certifications</h2>
        <p className="text-center text-gray-600 mb-12">
          Validating our commitment to quality, safety, and excellence in JIVITHA AYURVEDA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certifications.slice(0, 5).map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="mb-4 w-32 h-32 flex items-center justify-center">
                <img src={cert.image} alt={cert.name} className="max-w-full max-h-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{cert.name}</h3>
              <p className="text-sm text-gray-600 text-center">{cert.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {certifications.slice(5).map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="mb-4 w-32 h-32 flex items-center justify-center">
                <img src={cert.image} alt={cert.name} className="max-w-full max-h-full" />
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