import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const ClientsForm = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    logo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.logo) {
      alert("Please upload a logo");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("logo", formData.logo);

    // Append logged-in member info
    data.append("memberCode", loggedInUser.memberCode || loggedInUser._id);
    data.append("memberName", loggedInUser.name);
    data.append("communityName", loggedInUser.communityName);
    data.append("communityId", loggedInUser.communityId);

    try {
      const res = await axios.post(`${Base_url}/api/clients`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Client added successfully!");
      setFormData({ name: "", title: "", description: "", logo: null });
      console.log(res.data);
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Client</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Logo:</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Client
        </button>
      </form>
    </div>
  );
};
