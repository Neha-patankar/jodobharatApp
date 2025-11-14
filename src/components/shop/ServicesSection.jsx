import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="mb-4 w-32 h-32 flex items-center justify-center">
                <img src={`${Base_url}/uploads/services/${service.image}`} alt={service.name} className="max-w-full max-h-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
