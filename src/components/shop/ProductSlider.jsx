import React, { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'Adivasi Oil', image: '/final jivitha pics/adivasioil.png' },
  { id: 2, name: 'Allergy', image: '/final jivitha pics/allergy.png' },
  { id: 3, name: 'Applecider', image: '/final jivitha pics/applecider.png', price: '$39.99' },
  { id: 4, name: 'Fatcure', image: '/final jivitha pics/fatcure.png', price: '$29.99' },
  { id: 5, name: 'Ghutne', image: '/final jivitha pics/ghutne.png', price: '$89.99' },
  { id: 6, name: 'Mushroonpowder', image: '/final jivitha pics/mushroonpowder.png', price: '$19.99' },
  { id: 7, name: 'Sugarkipakki', image: '/final jivitha pics/sugarkipakki.png', price: '$99.99' },
  { id: 8, name: 'proteeplus', image: 'final jivitha pics/proteeplus.png', price: '$99.99' },
];

export const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerView(6);
      else if (width >= 768) setItemsPerView(3);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  // Get visible products with wrap-around
  const getVisibleProducts = () => {
    const result = [];
    for (let i = 0; i < itemsPerView; i++) {
      result.push(products[(currentIndex + i) % products.length]);
    }
    return result;
  };

  return (
    <div className="px-4 pt-20  mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#344742] mb-6">Our Products</h2>
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#344742] text-white px-3 py-1 rounded-full shadow hover:bg-[#2c3a36] z-10"
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#344742] text-white px-3 py-1 rounded-full shadow hover:bg-[#2c3a36] z-10"
          aria-label="Next Slide"
        >
          ❯
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out">
            {getVisibleProducts().map((product) => (
              <div
                key={product.id}
                className="p-4 flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  {product.price && <p className="text-gray-600">{product.price}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
