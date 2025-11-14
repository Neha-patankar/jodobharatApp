import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const ServiceSections = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [services, setServices] = useState([]);

  // ✅ Fetch only the logged-in user's services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/services`);
      // Filter user’s own services
      const userServices = res.data.filter(
        (srv) =>
          srv.memberCode === (loggedInUser.memberCode || loggedInUser._id)
      );
      setServices(userServices);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Services
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((srv) => (
                <tr key={srv._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={`${Base_url}/uploads/${srv.image}`}
                      alt={srv.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 font-semibold">{srv.name}</td>
                  <td className="p-3">{srv.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-5 text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceSections;
