import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    image: null,
  });

  // Get logged-in member info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("address", formData.address);
    if (formData.image) data.append("image", formData.image);

    // Append member info
    data.append("memberCode", user.memberCode || "");
    data.append("memberName", user.memberName || "");
    data.append("communityName", user.communityName || "");
    data.append("communityId", user.communityId || "");

    try {
      const res = await axios.post(`${Base_url}/api/contact`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Contact information submitted successfully!");
      console.log(res.data);

      // Reset form
      setFormData({ phone: "", email: "", address: "", image: null });
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error("Error submitting contact info:", error);
      alert("Failed to submit contact information.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image (optional):</label>
          <input
            type="file"
            name="image"
            id="imageInput"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        {formData.image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-24 h-24 rounded object-cover border-2 border-gray-300 shadow"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
