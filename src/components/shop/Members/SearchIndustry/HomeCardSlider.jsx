"use client";
import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";

const HomeCardSlider = ({ company }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Get cards from company data or use an empty array if not available
  const cards = company?.cards || [];

  // Number of cards to display at once (responsive)
  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 6; // xl
      if (window.innerWidth >= 1024) return 5; // lg
      if (window.innerWidth >= 768) return 4; // md
      if (window.innerWidth >= 640) return 3; // sm
      return 1; // xs (mobile)
    }
    return 5; // Default for SSR
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (cards.length <= cardsToShow) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length, cardsToShow]);

  // Handle manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Return message if no cards
  if (cards.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Product Showcase</h2>
        <p>No product cards available for this company.</p>
      </div>
    );
  }

  // Get the cards to display in the current view
  const getVisibleCards = () => {
    let visibleCards = [];
    for (let i = 0; i < Math.min(cardsToShow, cards.length); i++) {
      const index = (currentIndex + i) % cards.length;
      visibleCards.push(cards[index]);
    }
    return visibleCards;
  };

  return (
    <div className="relative ">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Showcase</h2>

      <div ref={sliderRef} className="relative overflow-hidden rounded-lg">
        {/* Cards container */}
        <div className="flex transition-all duration-500 ease-in-out p-4">
          {getVisibleCards().map((card, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="flex-none px-2"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <div className="relative h-32 md:h-48 w-full">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-3 text-sm md:text-base font-semibold text-center line-clamp-2">
                  {card.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {cards.length > cardsToShow && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 z-10 shadow-md"
              aria-label="Previous slide"
            >
              &#10094;
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 z-10 shadow-md"
              aria-label="Next slide"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Dots indicators */}
      {cards.length > cardsToShow && (
        <div className="flex justify-center mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mx-1 w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCardSlider;
