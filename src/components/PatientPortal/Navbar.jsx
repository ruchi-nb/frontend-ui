// File: components/PatientPortal/Navbar.jsx
"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = ({ onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();

  const goToPage = (path) => {
    router.push(path);
  };

  const isCurrentPage = (path) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => goToPage("/patientportal")}
            className="flex items-center space-x-2"
          >
            <div className="bg-blue-600 p-2 rounded-lg">
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
                className="h-6 w-6 text-white"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">MediCare</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => goToPage("/patientportal")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span>Home</span>
            </button>
            
            <button 
              onClick={() => goToPage("/patientportal/mydoctors")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/mydoctors") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span>My Doctors</span>
            </button>
            
            <button 
              onClick={() => goToPage("/patientportal/settings")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isCurrentPage("/patientportal/settings") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span>Settings</span>
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;