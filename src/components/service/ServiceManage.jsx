import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const ServiceManage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [services, setServices] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Fetch logged-in user's services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/services`);
      // Sirf apne hi service dikhaye (filter)
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

  // Delete service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`${Base_url}/api/services/${id}`);
        alert("Service deleted successfully!");
        fetchServices();
      } catch (err) {
        console.error("Error deleting service:", err);
        alert("Failed to delete service");
      }
    }
  };

  // Edit modal open
  const openEditModal = (service) => {
    setEditData(service);
  };

  // Close modal
  const closeEditModal = () => {
    setEditData(null);
    setNewImage(null);
  };

  // Update service
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editData) return;

    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    if (newImage) formData.append("image", newImage);

    try {
      await axios.put(`${Base_url}/api/services/${editData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service updated successfully!");
      closeEditModal();
      fetchServices();
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Failed to update service");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manage Your Services
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((srv) => (
                <tr key={srv._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={`${Base_url}/uploads/services/${srv.image}`}
                      alt={srv.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 font-semibold">{srv.name}</td>
                  <td className="p-3">{srv.description}</td>
                  <td className="p-3">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(srv._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-5 text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Edit Service
            </h3>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              <div className="mb-3">
                <label className="block mb-1 text-gray-700">Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1 text-gray-700">Description:</label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border p-2 rounded"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="block mb-1 text-gray-700">
                  Change Image:
                </label>
                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManage;
