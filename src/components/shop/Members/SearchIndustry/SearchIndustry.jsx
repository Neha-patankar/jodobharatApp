"use client";
import React, { useState, useEffect } from "react";
import Input from "./Input"; // Assuming you have a custom Input component
import { currentData } from "./Data"; // Assuming you have your data in Data.js
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DebounceInput } from "react-debounce-input"; // Optional for debouncing

const SearchIndustry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(currentData);
  const [locationCounts, setLocationCounts] = useState({});

  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    handleSearch();
  }, [searchTerm]); // Search when the term changes

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = currentData.filter((item) => {
      if (!searchTerm) {
        return true; // Show all data when search term is empty
      }

      const matchFound =
        item.company.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.product.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.area.toLowerCase().includes(lowerCaseSearchTerm);

      return matchFound;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
    countLocations(filtered);
  };

  const countLocations = (data) => {
    const counts = data.reduce((acc, item) => {
      const area = item.area.toLowerCase();
      acc[area] = acc[area] ? acc[area] + 1 : 1;
      return acc;
    }, {});
    setLocationCounts(counts);
  };

  useEffect(() => {
    countLocations(filteredData);
  }, [filteredData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="p-4">
      {/* <div className="flex-col md:flex-row rounded-lg shadow-lg mb-8 gap-4">
        <div className="bg-[#344742] rounded-t-md">
          <h4 className="text-lg text-white text-center font-bold p-1">
            TOTAL COMPANIES : {filteredData.length}
          </h4>
        </div>

        <div className="bg-white p-4 rounded-b-lg shadow-md">
          <h4 className="font-semibold text-2xl text-black mb-2">
            Location Counts:
          </h4>
          <ul className="list-disc pl-5 flex flex-col md:flex-row gap-6 text-black font-bold">
            {Object.keys(locationCounts).map((location, index) => (
              <li key={index} className="text-black">
                {location.charAt(0).toUpperCase() + location.slice(1)}:{" "}
                {locationCounts[location]}
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      <div className="bg-white rounded-xl shadow-lg p-0 mb-8 border-t-4 border-[#344742] ">
        <div className="bg-[#344742] rounded-t-md pt-2"></div>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4">
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            element={Input}
            type="text"
            placeholder="Search (Company, Product, Area)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {paginatedData.map((item) => (
          <Link
            key={item.id}
            href={`/company/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col items-center relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#344742] rounded-bl-full z-0"></div>

              <div className="absolute top-3 right-3 z-10">
                <div className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                  <span className="block w-4 h-4 border-2 border-gray-400 rounded-sm"></span>
                </div>
              </div>

              <div className="absolute top-3 right-10 z-10">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="w-full pt-8 pb-4 px-4 flex flex-col items-center">
                <div className="w-20 h-20 mb-0 relative z-10">
                  <div className="w-full h-full rounded-full border-2 border-gray-200 overflow-hidden bg-white -mt-3">
                    <Image
                      src={
                        item.imageLogo.startsWith("/")
                          ? item.imageLogo
                          : `/companyLogo/${item.imageLogo}`
                      }
                      alt={item.company}
                      className="w-full h-full object-cover "
                      width={80}
                      height={80}
                    />
                  </div>
                </div>

                <h3 className="text-black font-bold text-center mb-1">
                  {item.company}
                </h3>

                <p className="text-gray-500 text-xs text-center">
                  <span className="text-black font-bold text-md">City :</span>{" "}
                  {item.area}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {totalPages > 1 && (
          <div className="flex justify-center font-semibold items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded-md border-2 border-white disabled:opacity-50 hover:bg-[#2e8220] hover:text-white text-xs sm:text-sm md:text-base"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded-md border-2 border-white disabled:opacity-50 hover:bg-[#2e8220] hover:text-white text-xs sm:text-sm md:text-base"
            >
              {"<"}
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-2 py-1 rounded-md border-2 border-white text-xs sm:text-2xl md:text-base ${
                  currentPage === pageNum
                    ? "bg-[#2e8220] text-white"
                    : "hover:bg-[#2e8220] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded-md border-2 border-white disabled:opacity-50 hover:bg-[#2e8220] hover:text-white text-xs sm:text-sm md:text-base"
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded-md border-2 border-white disabled:opacity-50 hover:bg-[#2e8220] hover:text-white text-xs sm:text-sm md:text-base"
            >
              {">>"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchIndustry;
