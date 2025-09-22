"use client";
import { useState } from "react";
import LoginPopup from "@/components/Landing/LoginPopUp";
import RegisterModal from "@/components/Landing/RegisterModal";
import OutlineButton from "@/components/common/OutlineButton";
import GradientButton from "@/components/common/GradientButton";
import "remixicon/fonts/remixicon.css";

export default function Navbar({ onLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerPatientOpen, setRegisterPatientOpen] = useState(false);
  const [registerDoctorOpen, setRegisterDoctorOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white fixed top-0 left-0 z-50 shadow-sm font-poppins">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="text-[2.5rem] font-normal text-[#004dd6] cursor-pointer leading-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            MediCare
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-gotham text-[1rem] font-light">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-[#767676] hover:text-[#004dd6] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-[#767676] hover:text-[#004dd6] transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("specialties")}
              className="text-[#767676] hover:text-[#004dd6] transition-colors"
            >
              Specialties
            </button>

            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center space-x-1 border border-[#c8c8c8] rounded-full px-5 py-2 text-black hover:border-[#004dd6] hover:text-[#004dd6] transition-all"
            >
              <i className="ri-login-circle-line text-base"></i>
              <span>Login</span>
            </button>

            {/* Register Dropdown */}
            <div className="relative group">
              <button className="px-6 py-2 rounded-full text-black border border-[#c8c8c8] hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all">
                Register
              </button>
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-md border border-[#c8c8c8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <div className="py-2 text-[1rem] font-light">
                  <button
                    onClick={() => setRegisterPatientOpen(true)}
                    className="w-full text-left px-4 py-2 text-[#767676] hover:bg-[#f3f6ff] hover:text-[#004dd6]"
                  >
                    Register as Patient
                  </button>
                  <button
                    onClick={() => setRegisterDoctorOpen(true)}
                    className="w-full text-left px-4 py-2 text-[#767676] hover:bg-[#f9f6ff] hover:text-[#3d85c6]"
                  >
                    Register as Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <i className="ri-close-line text-2xl text-black"></i>
              ) : (
                <i className="ri-menu-line text-2xl text-black"></i>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#c8c8c8] shadow-md">
            <div className="flex flex-col items-center space-y-6 px-4 py-6 font-gotham text-[1rem] font-light">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-[#767676] hover:text-[#004dd6]"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-[#767676] hover:text-[#004dd6]"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("specialties")}
                className="text-[#767676] hover:text-[#004dd6]"
              >
                Specialties
              </button>

              <OutlineButton
                onClick={() => {
                  setLoginOpen(true);
                  setIsMenuOpen(false);
                }}>
                <i className="ri-login-circle-line text-lg"></i>
                <span>Login</span>
              </OutlineButton>

              <GradientButton
                onClick={() => {
                  setRegisterPatientOpen(true);
                  setIsMenuOpen(false);
                }}>
                Register
              </GradientButton>
            </div>
          </div>
        )}
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

      <RegisterModal
        kind="patient"
        open={registerPatientOpen}
        onClose={() => setRegisterPatientOpen(false)}
      />
      <RegisterModal
        kind="doctor"
        open={registerDoctorOpen}
        onClose={() => setRegisterDoctorOpen(false)}
      />
    </>
  );
}
