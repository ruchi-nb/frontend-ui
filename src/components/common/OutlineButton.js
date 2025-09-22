// OutlineButton.js
import React from "react";

export default function OutlineButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center justify-center space-x-2 w-full py-3 px-6
        rounded-full border border-[#c8c8c8] text-black
        hover:border-[#004dd6] hover:text-[#004dd6]
        transition-all duration-300 transform hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
}
