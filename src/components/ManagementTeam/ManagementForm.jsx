import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const ManagementForm = () => {
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

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return alert("Login required");

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
      const res = await axios.post(`${Base_url}/api/teammanagement`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Member added successfully!");
      setFormData({ name: "", title: "", description: "", image: null });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add member.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Management Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Add Member</button>
      </form>
    </div>
  );
};
