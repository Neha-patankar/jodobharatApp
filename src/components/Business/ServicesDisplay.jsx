import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const ServicesDisplay = ({ memberCode, memberName, communityName }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/services?memberCode=${memberCode}&memberName=${memberName}&communityName=${communityName}`, {
          params: { memberCode, memberName, communityName }, // 👈 props se data pass
        });
        setServices(res.data.data || res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [memberCode, memberName, communityName]);

  if (loading) return <p className="text-center py-8">Loading Services...</p>;

  return (
    <div className="px-0">
        <h2 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Discover the services we offer with dedication and quality
        </p>
      <div className="max-w-6xl mx-auto text-center">
      

        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {services.map((srv) => (
              <div
                key={srv._id}
                className="bg-white pb-4 rounded-lg shadow p-0 flex flex-col items-center "
              >
                <h3 className="text-lg  font-bold bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white py-2 w-full text-center">
                  {srv.name}
                </h3>
                <img
                  src={`${Base_url}/uploads/services/${srv.image}`}
                  alt={srv.name}
                  className="w-full object-cover  mb-z"
                />

                
                <p className="text-sm text-black bg-gray-200 w-full  font-bold text-center mt-1">
                  {srv.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesDisplay;
