


import React, { useState } from "react";
import axios from "axios";
import CommiteeCreation from "./CommiteeCreation";
import { CommitteeManage } from "./CommiteeManage";
import { Base_url } from "../../apiConfig/api";
import Header from "../AdminDashboard/Header";

export const CommiteeCreationForm = () => {
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

  const data = new FormData();
  data.append("name", formData.name);
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("image", formData.image);

  // ✅ Replace these lines with exact keys from localStorage
  
  data.append("memberCode", loggedInUser.memberCode);
  data.append("adminName", loggedInUser.name); // ✅ changed key
  data.append("communityId", loggedInUser.communityId);
  data.append("communityName", loggedInUser.communityName || loggedInUser.community || ""); // ✅ fixed undefined issue

  try {
    const res = await axios.post(`${Base_url}/api/committees`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Committee Member added successfully!");
    console.log(res.data);
    setFormData({ name: "", title: "", description: "", image: null });
  } catch (error) {
    console.error("Error adding member:", error);
    alert("Failed to add member.");
  }
};


  return (
    <>
      {/* <CommiteeCreation /> */}
     
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
        <Header/>
        <h2 className="text-2xl font-bold mb-4 text-center p-2 text-white bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900">
          Add Committee Member
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title (Dropdown) */}
          <div>
            {/* <label className="block text-gray-700 font-medium mb-2">
              Title:
            </label> */}
              <label className="block text-gray-700 font-medium mb-2">
              Committee Name:
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Committee --</option>
              <option value="महिला कार्यकारिणी">महिला कार्यकारिणी</option>
              <option value="वार्षिक सम्मेलन">वार्षिक सम्मेलन</option>
              <option value="सांस्कृतिक">सांस्कृतिक</option>
              <option value="फाइनेंस कमिटी">फाइनेंस कमिटी</option>
              <option value="संत विहार समिति">संत विहार समिति</option>
              <option value="बिज़नेस सलाहकार">बिज़नेस सलाहकार</option>
              <option value="करियर सलाहकार">करियर सलाहकार</option>
              <option value="कार्यशाला समिति">कार्यशाला समिति</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image:
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Add Committee Member
          </button>
        </form>

      </div>
       {/* <CommitteeManage /> */}
    </>
  );
};
