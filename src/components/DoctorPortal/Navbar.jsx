"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ onLogout }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const baseLink =
    "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLink = "bg-blue-100 text-blue-700";
  const inactiveLink = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  // Safe logout handler with fallback
  const handleLogout = () => {
    setMobileMenuOpen(false);
    
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      // Fallback behavior if onLogout is not provided
      console.log("Logout initiated");
      // Redirect to home or login page as fallback
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/doctorportal" className="flex items-center space-x-2">
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
                  <path d="M11 2v2"></path>
                  <path d="M5 2v2"></path>
                  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
                  <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
                  <circle cx="20" cy="10" r="2"></circle>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MedConsult</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/doctorportal"
              className={`${baseLink} ${
                pathname === "/doctorportal" ? activeLink : inactiveLink
              }`}
            >
              Home
            </Link>
            <Link
              href="/doctorportal/settings"
              className={`${baseLink} ${
                pathname === "/doctorportal/settings" ? activeLink : inactiveLink
              }`}
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger or Close icon */}
              {isMobileMenuOpen ? (
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
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              ) : (
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
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                  <path d="M4 6h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            href="/doctorportal"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-3 text-base font-medium ${
              pathname === "/doctorportal"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            href="/doctorportal/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-3 text-base font-medium ${
              pathname === "/doctorportal/settings"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}