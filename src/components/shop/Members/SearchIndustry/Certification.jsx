import React from 'react';

const Certifications = ({ company }) => {
  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "International quality management system standard",
      alt: "ISO 9001:2015 Certification",
      imageUrl : "/cert/cert1.png"
    },
    {
      title: "FDA Approved",
      description: "Food and Drug Administration approval for safety",
      alt: "FDA Approved Certification",
      imageUrl : "/cert/cert2.png",
    },
    {
      title: "Vegetarian Friendly",
      description: "Products suitable for vegetarian consumption",
      alt: "Vegetarian Friendly Certification",
      imageUrl : "/cert/cert3.png"
    },
    {
      title: "100% Organic",
      description: "Products made with organic ingredients",
      alt: "100% Organic Certification",
      imageUrl : "/cert/cert4.png"
    },
    {
      title: "GMP Certified",
      description: "Good Manufacturing Practice certification",
      alt: "GMP Certified",
      imageUrl : "/cert/cert5.png"
    },
    {
      title: "HACCP",
      description: "Hazard Analysis Critical Control Points food safety system",
      alt: "HACCP Food Safety Certification",
      imageUrl : "/cert/cert6.png"
    },
    {
      title: "Halal Certified",
      description: "Products compliant with Islamic dietary laws",
      alt: "Halal Certification",
      imageUrl : "/cert/cert7.png"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Certifications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Validating our commitment to quality, safety, and excellence in {company?.company || "our organization"}
          </p>
        </div>

        

        {/* Full Certification cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-64 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-6 text-center">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.alt}
                  className="w-26 h-26 object-contain mx-auto mb-4" 
                />
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Number */}
        <div className="text-center mt-10 p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
          <p className="text-gray-700 font-medium">
            Certification Number: MP/25D/14/309
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
