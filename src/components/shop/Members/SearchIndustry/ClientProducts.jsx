"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { products } from "../../Product/data"; // Import products from data.js

const ClientProduct = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Product");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { name: "All Product" },
    { name: "adivasioil", image: "/final jivitha pics/adivasioil.png" },
    { name: "allergyoil", image: "/final jivitha pics/allergy-removebg-preview.png" },
    { name: "applecider", image: "/final jivitha pics/applecider.png" },
    { name: "fatcure", image: "/final jivitha pics/fatcure.png" },
    { name: "gutne", image: "/final jivitha pics/ghutne.png" },
    { name: "mushroom", image: "/final jivitha pics/mushroonpowder.png" },
    { name: "proteeplus", image: "/final jivitha pics/proteeplus.png" },
    { name: "SugerKipakki", image: "/final jivitha pics/sugarkipakki.png" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All Product" || product.category === selectedCategory
  );

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Top Section - Categories */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Product</h2>

        {/* Category List at the Top */}
        <div className="flex justify-center gap-6 flex-wrap mb-8">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`cursor-pointer transition-all flex flex-col items-center ${
                selectedCategory === category.name
                  ? "scale-105 shadow-lg bg-blue-50 rounded-lg"
                  : "hover:scale-105 hover:bg-gray-50 hover:rounded-lg"
              }`}
            >
              {category.image && (
                <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              {/* Category name */}
              <p className="mt-2 text-center font-bold text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* No Results Message */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
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
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    priority={index < 4}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">SIZE : {product.size}</p>
                    <p className="text-gray-600">MRP : ₹ {product.mrp}</p>
                    <p className="text-green-700 font-semibold">
                      Offer Price: ₹ {product.offerPrice}
                    </p>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Buy Now
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

export default ClientProduct;
