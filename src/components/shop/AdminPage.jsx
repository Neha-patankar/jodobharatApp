


import React from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  "Product",
  "AboutUs",
  "Certifications",
  "Clients",
  "Contact",
  "ManagementTeam",
  "ProductSlider",
  "ServicesSection",
];

 const AdminPage = () => {
  const navigate = useNavigate();

  const handleAdd = (section) => {
    switch (section) {
      case "AboutUs":
        navigate("/admin/about/add");
        break;
      case "Product":
        navigate("/admin/product/add");
        break;
      case "Certifications":
        navigate("/admin/certification/add");
        break;
      case "Clients":
        navigate("/admin/client/add");
        break;
      case "Contact":
        navigate("/admin/contact/add");
        break;
      case "ManagementTeam":
        navigate("/admin/management/add");
        break;
      case "ProductSlider":
        navigate("/admin/slider/add");
        break;
      case "ServicesSection":
        navigate("/admin/services/add");
        break;
      default:
        break;
    }
  };

  const handleManage = (section) => {
    switch (section) {
      case "AboutUs":
        navigate("/admin/about/manage");
        break;
      case "Product":
        navigate("/admin/product/manage");
        break;
      case "Certifications":
        navigate("/admin/certification/manage");
        break;
      case "Clients":
        navigate("/admin/client/manage");
        break;
      case "Contact":
        navigate("/admin/contact/manage");
        break;
      case "ManagementTeam":
        navigate("/admin/management/manage");
        break;
      case "ProductSlider":
        navigate("/admin/slider/manage");
        break;
      case "ServicesSection":
        navigate("/admin/services/manage");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="max-w-7xl mx-auto space-y-6">
        {sections.map((section) => (
          <div
            key={section}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{section}</h2>

            <div className="space-x-4">
              <button
                onClick={() => handleAdd(section)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add
              </button>
              <button
                onClick={() => handleManage(section)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPage