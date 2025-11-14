// NewsPostForm.jsx
import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";



const NewPost = ({ onNewsPosted }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageName: "",
    videoUrl: "",
    image: null,
    category: "", // ✅ Added category
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api = `${Base_url}/api/news`;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
    if (error) setError("");
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (!form.category) {
    setError("⚠️ Please select a category before posting.");
    setLoading(false);
    return;
  }

  const data = new FormData();
  data.append("title", form.title);
  data.append("description", form.description);
  data.append("imageName", form.imageName);
  data.append("videoUrl", form.videoUrl);
  data.append("category", form.category);
  if (form.image) data.append("image", form.image);

  // 🔹 Add new fields


const loggedUser = JSON.parse(localStorage.getItem("user"));

data.append("communityName", loggedUser?.communityName || loggedUser?.community || "");
data.append("adminName", loggedUser?.name || "");
data.append("memberCode", loggedUser?.memberCode || "");
data.append("communityId", loggedUser?.communityId || "");



  try {
    await axios.post(`${api}/create`, data);
    alert("✅ News created successfully!");

    // ✅ Reset form
    setForm({
      title: "",
      description: "",
      imageName: "",
      videoUrl: "",
      image: null,
      category: "",
    });

    // ✅ Reset file input field
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";

    // Callback if parent wants to refresh news list
    if (onNewsPosted) onNewsPosted();
  } catch (err) {
    console.error("Error posting news:", err);
    setError("Failed to save news. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto">
      <Header/>
      {/* 🔙 Back Button */}
      <div className="mb-4 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm"
        >
          ⬅ Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg space-y-4 mb-8"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* ✅ Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Page *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">-- पेज चुनें --</option>
            <option value="उपलब्धिया">उपलब्धिया</option>
            <option value="कार्यक्रम">कार्यक्रम</option>
            <option value="सुझाव">सुझाव</option>
            <option value="निमंत्रण">निमंत्रण</option>
            <option value="नौकरी">नौकरी</option>
            <option value="गतिविधियां">गतिविधियां</option>
            <option value="समाज सेवा">समाज सेवा</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter news title"
            required
            className="w-full p-3 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter news description"
            required
            className="w-full p-3 border rounded-lg resize-vertical"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Name
          </label>
          <input
            name="imageName"
            value={form.imageName}
            onChange={handleChange}
            placeholder="Enter image name/caption"
            className="w-full p-3 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            YouTube Video URL
          </label>
          <input
            type="url"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
            className="w-full p-3 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create News"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
