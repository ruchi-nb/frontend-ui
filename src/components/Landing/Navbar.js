"use client";
import { useState } from "react";
import LoginPopup from "@/components/Landing/LoginPopUp";
import RegisterModal from "@/components/Landing/RegisterModal";

export default function Navbar({ onLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerPatientOpen, setRegisterPatientOpen] = useState(false);
  const [registerDoctorOpen, setRegisterDoctorOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            MediCare
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("how-it-works")} className="text-gray-700 hover:text-blue-600 font-medium">How It Works</button>
            <button onClick={() => scrollToSection("benefits")} className="text-gray-700 hover:text-blue-600 font-medium">Benefits</button>
            <button onClick={() => scrollToSection("specialties")} className="text-gray-700 hover:text-blue-600 font-medium">Specialties</button>

            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-blue-600 font-medium flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Login</span>
            </button>

            {/* Register Dropdown */}
            <div className="relative group">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                Register
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <div className="py-2">
                  <button onClick={() => setRegisterPatientOpen(true)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Register as Patient</button>
                  <button onClick={() => setRegisterDoctorOpen(true)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Register as Doctor</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginPopup
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => {
          onLogin();
          setLoginOpen(false);
        }}
      />

      <RegisterModal kind="patient" open={registerPatientOpen} onClose={() => setRegisterPatientOpen(false)} />
      <RegisterModal kind="doctor" open={registerDoctorOpen} onClose={() => setRegisterDoctorOpen(false)} />
    </>
  );
}
