// InvertedGradientButton.js
import React from "react";

export default function InvertedGradientButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center justify-center space-x-2 w-full py-3 px-6
        rounded-full bg-gradient-to-r from-[#004dd6] to-[#3d85c6] text-white
        border border-transparent
        hover:bg-none hover:bg-white hover:text-black hover:border-[#c8c8c8]
        transition-all duration-300 transform hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
}
