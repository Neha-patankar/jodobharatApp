import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    englishName: "",
    company: "",
    size: "",
    mrp: "",
    offerPrice: "",
    category: "",
    image: null,
  });

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${Base_url}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // ✅ Start edit mode
  const handleEdit = (prod) => {
    setEditProduct(prod._id);
    setFormData({
      name: prod.name,
      englishName: prod.englishName || "",
      company: prod.company,
      size: prod.size || "",
      mrp: prod.mrp,
      offerPrice: prod.offerPrice,
      category: prod.category || "",
      image: null, // will upload new if chosen
      oldImage: prod.image, // keep old image
    });
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await axios.put(`${Base_url}/api/products/${editProduct}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* ✅ Products Table */}
      <table className="w-full border-collapse bg-white shadow-md rounded-md">
        <thead className="bg-[#344742] text-white">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Company</th>
            <th>MRP</th>
            <th>Offer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="text-center border-t">
              <td>
                <img
                  src={`${Base_url}/uploads/products/${prod.image}`}
                  alt="Product"
                  className="h-12 w-12 mx-auto rounded object-cover"
                />
              </td>
              <td>{prod.name}</td>
              <td>{prod.company}</td>
              <td>₹{prod.mrp}</td>
              <td>₹{prod.offerPrice}</td>
              <td className="space-x-3">
                <button
                  onClick={() => handleEdit(prod)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Edit Form */}
      {editProduct && (
        <div className="mt-8 bg-gray-50 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-3">Edit Product</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            {[
              { name: "name", placeholder: "Product Name" },
              { name: "englishName", placeholder: "English Name" },
              { name: "company", placeholder: "Company" },
              { name: "size", placeholder: "Size" },
              { name: "mrp", placeholder: "MRP" },
              { name: "offerPrice", placeholder: "Offer Price" },
              { name: "category", placeholder: "Category" },
            ].map((f) => (
              <input
                key={f.name}
                type="text"
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                className="border p-2 w-full rounded"
              />
            ))}

            {/* ✅ Upload new image */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />

            {/* ✅ Image preview */}
            <div className="flex items-center gap-4">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="New Preview"
                  className="h-16 w-16 rounded border"
                />
              ) : (
                <img
                  src={`${Base_url}/uploads/products/${formData.oldImage}`}
                  alt="Current"
                  className="h-16 w-16 rounded border"
                />
              )}
              <p className="text-gray-600 text-sm">
                {formData.image ? "New image selected" : "Current image"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
