import React from 'react';

export default function ClientsSection() {
  // Clients data
  const clients = [
    { id: 1, name: "Wellness Center International", logo: "/api/placeholder/150/80" },
    { id: 2, name: "Global Health Network", logo: "/api/placeholder/150/80" },
    { id: 3, name: "Natural Living Co.", logo: "/api/placeholder/150/80" },
    { id: 4, name: "Holistic Health Partners", logo: "/api/placeholder/150/80" },
    { id: 5, name: "Organic Life Alliance", logo: "/api/placeholder/150/80" },
    { id: 6, name: "Pure Nature Distributors", logo: "/api/placeholder/150/80" },
    { id: 7, name: "Harmony Health Group", logo: "/api/placeholder/150/80" },
    { id: 8, name: "Wellness Retreat Centers", logo: "/api/placeholder/150/80" }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations and wellness centers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center">
              <div className="h-16 flex items-center">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-full max-w-full"
                  title={client.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}