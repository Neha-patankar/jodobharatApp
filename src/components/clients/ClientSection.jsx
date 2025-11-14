import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export default function ClientSection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    const fetchClients = async () => {
      try {
        const res = await axios.get(
          `${Base_url}/api/clients?memberCode=${user.memberCode}&memberName=${user.name}&communityName=${user.communityName}`
        );
        setClients(res.data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations and wellness centers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div key={client._id} className="bg-white rounded-lg p-6 shadow-md text-center">
              {client.logo && (
                <img
                  src={`${Base_url}/uploads/clients/${client.logo}`}
                  alt={client.name}
                  className="h-24 mx-auto mb-4 object-contain"
                />
              )}
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-sm font-medium text-gray-700">{client.title}</p>
              <p className="text-sm text-gray-600 mt-2">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
