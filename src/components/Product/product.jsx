import React, { useState, useEffect } from "react";
import { Base_url } from "../../apiConfig/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${Base_url}/api/products?memberCode=${user.memberCode}&memberName=${user.name}&communityName=${user.communityName}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All Products",
    "allergyoil",
    "applecider",
    "fatcure",
    "mushroom",
    "proteeplus",
    "gutne",
    "adivasioil",
  ];

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse products available for your community
        </p>
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            No products found{" "}
            {searchTerm ? `matching "${searchTerm}"` : "in this category"}
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-56 w-full">
                <img
                  src={`${Base_url}/uploads/products/${product.image}`}
                  alt={product.englishName}
                  className="object-contain p-4 w-full h-full"
                />
              </div>

              {/* Product Details */}
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
                <button className="w-full mt-4 bg-[#344742] text-white py-2 rounded-md hover:bg-[#639385] transition-colors">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
