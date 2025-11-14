// ProductsDisplay.jsx
import React, { useState, useEffect } from "react";
import { Base_url } from "../../apiConfig/api";

// 💡 Change: Component now accepts props
export default function ProductsDisplay({ memberCode, memberName, communityName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products"); // Assuming filtering UI is elsewhere

  useEffect(() => {
    if (!memberCode) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          // Use props in query
          `${Base_url}/api/products?memberCode=${memberCode}&memberName=${memberName}&communityName=${communityName}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.data || data); // Assuming data structure is consistent
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [memberCode, memberName, communityName]);


  // Only filtering logic needed for display (copied from your old code)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.englishName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const productCategory = product.category?.toLowerCase().trim() || "";
    const selectedCat = selectedCategory.toLowerCase().trim();
    const matchesCategory =
      selectedCat === "all products" || productCategory === selectedCat;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className=" flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-0">
   <h1 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">Products </h1>
      <div className="text-center mb-8 max-w-6xl mx-auto ">
      
    

      {filteredProducts.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-600 text-lg">
            No products found.
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-blue-950"
            >
              {/* Product Image and Details (Copied from your original code) */}
              <div className="relative  w-full ">
                <img
                  src={`${Base_url}/uploads/products/${product.image}`}
                  alt={product.englishName}
                  className="object-contain p-0 w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {product.name}
                </h2>
                <h3 className="text-md font-bold text-green-700 mb-2">
                  Company: {product.company}
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-600">SIZE: {product.size}</p>
                  <p className="text-gray-600">MRP: ₹ {product.mrp}</p>
                  <p className="text-green-700 font-semibold">
                    Offer Price: ₹ {product.offerPrice}
                  </p>
                </div>
                <button className="w-full mt-2  font-bold bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 text-white py-2 rounded-md hover:bg-[#639385] transition-colors">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
  </div>
    </div>
  );
};