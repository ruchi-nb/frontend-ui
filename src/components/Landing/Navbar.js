// File: src/components/Landing/Navbar.js
"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoginPopup from "@/components/Landing/LoginPopUp";
import RegisterModal from "@/components/Landing/RegisterModal";
import OutlineButton from "@/components/common/OutlineButton";
import GradientButton from "@/components/common/GradientButton";
import "remixicon/fonts/remixicon.css";

export default function Navbar({ navItems = [], onLogin, onLogout }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerPatientOpen, setRegisterPatientOpen] = useState(false);
  const [registerDoctorOpen, setRegisterDoctorOpen] = useState(false);

  const handleClick = (item) => {
    if (item.type === "link") {
      router.push(item.path);
    } else if (item.type === "scroll") {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item.type === "login") {
      setLoginOpen(true);
    } else if (item.type === "logout") {
      onLogout && onLogout();
    } else if (item.type === "registerPatient") {
      setRegisterPatientOpen(true);
    } else if (item.type === "registerDoctor") {
      setRegisterDoctorOpen(true);
    }
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

          {/* Desktop Menu - updated section */}
          <div className="hidden md:flex items-center justify-end gap-4 font-gotham text-[1rem] font-light">
            {navItems.map((item, idx) =>
              item.type === "dropdown" ? (
                <div key={idx} className="relative group">
                  <button className="px-3 py-1.5 rounded-full text-black border border-[#c8c8c8] hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all whitespace-nowrap text-sm">
                    {item.label}
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-md border border-[#c8c8c8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="py-2 text-[1rem] font-light">
                      {item.items.map((subItem, subIdx) => (
                        <button
                          key={subIdx}
                          onClick={() => handleClick(subItem)}
                          className="w-full text-left px-4 py-2 text-[#767676] hover:bg-[#f3f6ff] hover:text-[#004dd6] whitespace-nowrap text-sm"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.variant === "outline" ? (
                <OutlineButton 
                  key={idx} 
                  onClick={() => handleClick(item)} 
                  className="whitespace-nowrap py-1.5 px-3 text-sm"
                  color={item.color}
                >
                  {item.icon && <i className={`${item.icon} mr-2`}></i>} {item.label}
                </OutlineButton>
              ) : item.variant === "gradient" ? (
                <GradientButton 
                  key={idx} 
                  onClick={() => handleClick(item)} 
                  className="whitespace-nowrap py-2 px-3 text-sm"
                  color={item.color}
                >
                  {item.label}
                </GradientButton>
              ) : (
                <button
                  key={idx}
                  onClick={() => handleClick(item)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {item.icon && <i className={`${item.icon} mr-2`}></i>} {item.label}
                </button>
              )
            )}
          </div>
        {/* </div> */}
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <i className="ri-close-line text-2xl"></i>
            ) : (
              <i className="ri-menu-line text-2xl"></i>
            )}
          </button>
        </div>
      </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#c8c8c8] shadow-md">
            <div className="flex flex-col items-center space-y-4 px-4 py-6 font-gotham text-[1rem] font-light">
              {navItems.map((item, idx) =>
                item.type === "dropdown" ? (
                  item.items.map((subItem, subIdx) => (
                    <button
                      key={`${idx}-${subIdx}`}
                      onClick={() => handleClick(subItem)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 whitespace-nowrap"
                    >
                      {subItem.label}
                    </button>
                  ))
                ) : (
                  <button
                    key={idx}
                    onClick={() => handleClick(item)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <LoginPopup
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => {
          onLogin && onLogin();
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