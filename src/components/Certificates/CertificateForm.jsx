import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const CertificatesForm = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) return alert("Please upload an image");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

const data = new FormData();
data.append("name", formData.name);
data.append("title", formData.title);
data.append("description", formData.description);
data.append("image", formData.image);
data.append("memberCode", loggedInUser.memberCode || loggedInUser._id);
data.append("memberName", loggedInUser.name);
data.append("communityName", loggedInUser.communityName);
data.append("communityId", loggedInUser.communityId);




   

    try {
      const res = await axios.post(`${Base_url}/api/certificates`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Certificate added successfully!");
      setFormData({ name: "", title: "", description: "", image: null });
      console.log(res.data);
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert("Failed to add certificate.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Certificate</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Add Certificate</button>
      </form>
    </div>
  );
};
