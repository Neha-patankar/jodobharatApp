// ClientsDisplay.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

// 💡 Change: Component now accepts props
export default function ClientsDisplay({ memberCode, memberName, communityName }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!memberCode) return;

    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Base_url}/api/clients?memberCode=${memberCode}&memberName=${memberName}&communityName=${communityName}`
        );
        setClients(res.data.data || res.data); // Assuming data structure is consistent
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setClients([]);
      } finally {
          setLoading(false);
      }
    };

    fetchClients();
  }, [memberCode, memberName, communityName]);

  if (loading) return <p className="text-center py-8">Loading Clients...</p>;

  return (
    <section className="py-2">

      <div className="text-center mb-4">
          <h2 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations and wellness centers worldwide
          </p>
        </div>
      <div className="max-w-6xl mx-auto px-4">
      

        {clients.length === 0 ? (
             <p className="text-center text-gray-500">No clients are listed yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {clients.map((client) => (
                    <div key={client._id} className="bg-white rounded-lg p-0 shadow-md text-center">
                         <h3 className="text-lg  font-bold bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white py-2">{client.name}</h3>
                    {client.logo && (
                        <img
                        src={`${Base_url}/uploads/clients/${client.logo}`}
                        alt={client.name}
                        className=" mb-4 object-contain"
                        />
                    )}
                   
                    <p className="text-sm font-medium text-orange-500">{client.title}</p>
                    <p className="text-sm text-black mt-2">{client.description}</p>
                    </div>
                ))}
            </div>
        )}
      </div>
    </section>
  );
}