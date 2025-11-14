import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    englishName: "",
    company: "",
    size: "",
    mrp: "",
    offerPrice: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });  // handle file input
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const loggedInUser = JSON.parse(localStorage.getItem("user")); // get logged-in member info
  if (!loggedInUser) {
    alert("Please login first!");
    return;
  }

  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Append member info
  formData.append("memberCode", loggedInUser.memberCode);
  formData.append("memberName", loggedInUser.name);
  formData.append("communityName", loggedInUser.communityName);
  formData.append("communityId", loggedInUser.communityId);

  try {
    await axios.post(`${Base_url}/api/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Product added successfully!");
    setProduct({ name: "", englishName: "", company: "", size: "", mrp: "", offerPrice: "", category: "", image: null });
  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Inputs */}
        {[
          { name: "name", placeholder: "Product Name" },
          { name: "englishName", placeholder: "English Name" },
          { name: "company", placeholder: "Company" },
          { name: "size", placeholder: "Size" },
          { name: "mrp", placeholder: "MRP" },
          { name: "offerPrice", placeholder: "Offer Price" },
          { name: "category", placeholder: "Category" },
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            value={product[field.name]}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        ))}

        {/* File Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        {/* Preview Image */}
        {product.image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(product.image)}
              alt="Preview"
              className="w-24 h-24 rounded object-cover border-2 border-gray-300 shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#344742] text-white py-2 rounded-md hover:bg-[#4c6763]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
