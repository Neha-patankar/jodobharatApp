import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";


const NewsManage = ({ refreshList }) => {
  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);
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

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/alldata`);
      setNewsList(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [refreshList]);

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
    if (error) setError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.category) {
      setError("⚠️ Please select a category before updating.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("imageName", form.imageName);
    data.append("videoUrl", form.videoUrl);
    data.append("category", form.category); // ✅ Include category
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`${api}/${editId}`, data);
        alert("✅ News updated successfully!");
        cancelEdit();
        fetchNews();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      imageName: "",
      videoUrl: "",
      image: null,
      category: "",
    });
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      setLoading(true);
      await axios.delete(`${api}/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
      setError("Failed to delete news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (news) => {
    setEditId(news._id);
    setForm({
      title: news.title,
      description: news.description,
      imageName: news.imageName,
      videoUrl: news.videoUrl,
      image: null,
      category: news.category || "",
    });
    setError("");
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <Header/>
      <div className="mb-4 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm"
        >
          ⬅ Back
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">
        News List ({newsList.length})
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && <div className="text-center">Loading...</div>}

      {newsList.length === 0 && !loading ? (
        <div className="text-center text-gray-500">No news articles found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {newsList.map((news) => (
            <div
              key={news._id}
              className={`border p-4 rounded-lg bg-white ${
                editId === news._id ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
            >
              {editId === news._id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Select Page *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">-- पेज चुनें --</option>
                      <option value="न्यूज़">न्यूज़</option>
                      <option value="शोक सन्देश">शोक सन्देश</option>
                      <option value="बधाई सन्देश">बधाई सन्देश</option>
                      <option value="वैवाहिक">वैवाहिक</option>
                      <option value="पोरवाल बाजार">पोरवाल बाजार</option>
                      <option value="प्रोफेशनल्स">प्रोफेशनल्स</option>
                      <option value="बिज़नेस प्रमोशन">बिज़नेस प्रमोशन</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Title</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  {/* Image Name */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Image Name</label>
                    <input
                      name="imageName"
                      value={form.imageName}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="text-sm font-medium block mb-1">YouTube Video URL</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={form.videoUrl}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Upload Image */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h4 className="font-bold">{news.title}</h4>
                  <p>{news.description}</p>
                  <p className="text-sm text-gray-500">Page: {news.category}</p> {/* ✅ Show category */}
                  {news.image && (
                    <img
                      src={`${Base_url}/uploads/news/${news.image}`}
                      alt={news.imageName || "News image"}
                      className="h-40 w-full object-cover rounded mt-2"
                    />
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEditing(news)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsManage;
