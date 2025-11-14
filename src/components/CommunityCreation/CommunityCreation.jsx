
import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";
import Header from "../AdminDashboard/Header";
import { useNavigate } from "react-router-dom";

export const CommunityCreation = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    communityName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    startDate: "",
    endDate: "",
    remark: "",
   
  });
  const [logo, setLogo] = useState(null);
  const [showForm, setShowForm] = useState(true); // control visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleClose = () => {
    navigate(-1); // 👈 goes one step back in browser history
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) form.append(key, formData[key]);
    form.append("logo", logo);

    try {
      const res = await axios.post(`${Base_url}/api/community`, form);
      alert("Community Added Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!showForm) return null; // do not render the form if hidden

  return (
    <div className="bg-white rounded-md shadow-md border border-gray-200 max-w-5xl mx-auto  pt-16">
      <Header/>
      <div className="text-center p-4">
        <h2 className="text-xl font-bold text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 py-2">Add Community</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 border-gray-200 max-w-5xl mx-auto mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["communityName", "address", "country", "state", "city"].map(
            (field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            )
          )}
         
          <div>
            <label className="block mb-1 font-medium">Logo</label>
            <input
              type="file"
              onChange={handleLogoChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
         <div>
            <label className="block mb-1 font-medium">Remark</label>
            <input
              type="textarea"
              name="remark"
              placeholder="Message"
              value={formData.remark}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-32"
          >
            Submit
          </button>
           {/* <button
      onClick={handleClose}
      className="px-4 py-2 bg-red-800 rounded hover:bg-gray-300"
    >
      Close
    </button> */}
        </div>
      </form>
    </div>
  );
};
