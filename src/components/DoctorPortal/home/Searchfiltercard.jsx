"use client";
import React, { useState, useEffect } from "react";

const SearchFilterCard = ({ specialties = [], onSearchChange, onSpecialtyChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Trigger callback whenever search term changes
  useEffect(() => {
    if (onSearchChange) onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  // Trigger callback whenever specialty changes
  useEffect(() => {
    if (onSpecialtyChange) onSpecialtyChange(selectedSpecialty);
  }, [selectedSpecialty, onSpecialtyChange]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              type="text"
              placeholder="Search patients, specialties, or reasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="lg:w-48">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Specialties</option>
            {specialties.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterCard;
