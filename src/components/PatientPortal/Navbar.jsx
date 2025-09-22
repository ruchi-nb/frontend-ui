// File: components/PatientPortal/Navbar.jsx
"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "remixicon/fonts/remixicon.css";

const Navbar = ({ onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const goToPage = (path) => {
    router.push(path);
    setIsOpen(false); // close mobile menu after navigation
  };

  const isCurrentPage = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => goToPage("/patientportal")}
            className="flex items-center space-x-2"
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="ri-heart-3-line text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">MediCare</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => goToPage("/patientportal")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-home-4-line mr-2"></i> Home
            </button>

            <button
              onClick={() => goToPage("/patientportal/mydoctors")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/mydoctors")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-user-heart-line mr-2"></i> My Doctors
            </button>

            <button
              onClick={() => goToPage("/patientportal/settings")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/settings")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-settings-3-line mr-2"></i> Settings
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <i className="ri-logout-box-r-line mr-2"></i> Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <i className="ri-close-line text-2xl"></i>
              ) : (
                <i className="ri-menu-line text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-1 p-3">
            <button
              onClick={() => goToPage("/patientportal")}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-home-4-line mr-2"></i> Home
            </button>

            <button
              onClick={() => goToPage("/patientportal/mydoctors")}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/mydoctors")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-user-heart-line mr-2"></i> My Doctors
            </button>

            <button
              onClick={() => goToPage("/patientportal/settings")}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/settings")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <i className="ri-settings-3-line mr-2"></i> Settings
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <i className="ri-logout-box-r-line mr-2"></i> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
