


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export default function MemberRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    communityName: ""
  });

  const [message, setMessage] = useState("");
  const [communities, setCommunities] = useState([]);

  // Fetch community list on mount
  useEffect(() => {
    axios
      .get(`${Base_url}/api/community`)
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCommunityChange = (e) => {
    const selectedCommunityName = e.target.value;
    setFormData({ ...formData, communityName: selectedCommunityName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${Base_url}/api/members/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />

        <label className="block mb-1 font-semibold">Select Community</label>
        <select
          onChange={handleCommunityChange}
          value={formData.communityName}
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          required
        >
          <option value="">-- Select Community --</option>
          {communities.map((c) => (
            <option key={c._id} value={c.communityName}>
              {c.communityName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        <div className="mt-3 text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
