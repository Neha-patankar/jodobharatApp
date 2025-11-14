import React from 'react';

const Services = ({ company }) => {
  const services = [
    {
      title: "Ayurvedic Product",
      description: "We specialize in providing a wide range of Ayurvedic products for natural healthcare solutions.",
      // New leaf icon
      iconPath: "M12 2C8.134 2 5 5.134 5 9a7 7 0 1 0 14 0c0-3.866-3.134-7-7-7zM10 17l1-3h2l1 3H10zm2-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
    },
    {
      title: "Manufacture Medical Job Work",
      description: "We handle manufacturing medical job work with high standards of precision and quality.",
      // New factory icon
      iconPath: "M19 4h-4l-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V8h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z"
    },
    {
      title: "Medical Repackaging",
      description: "Our medical repackaging service ensures that medical products are safely and efficiently repacked for distribution.",
      // New repackaging box icon
      iconPath: "M21 16l-1.35 1.35a2 2 0 0 1-2.83 0L12 12l-4.82 4.82a2 2 0 0 1-2.83 0L3 16V8h18v8zM3 4h18a1 1 0 0 1 1 1v2H2V5a1 1 0 0 1 1-1z"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the comprehensive services offered by {company?.company || "our company"}, 
          designed to meet your healthcare and medical product needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="mb-4 text-green-600"
              >
                <path d={service.iconPath} />
              </svg>
              <h3 className="text-xl font-semibold text-[#34495e] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
