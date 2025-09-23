// GradientButton.js
import React from "react";

export default function GradientButton({ 
  children, 
  onClick, 
  className = "", 
  color = "blue", // Default color
  size = "medium", // Default size
  disabled = false,
  icon = null // Optional icon
}) {
  
  // Color gradient classes based on the color prop
  const colorGradients = {
    blue: "hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6]",
    red: "hover:bg-gradient-to-r hover:from-[#dc2626] hover:to-[#ef4444]",
    green: "hover:bg-gradient-to-r hover:from-[#059669] hover:to-[#10b981]",
    purple: "hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#a855f7]",
    indigo: "hover:bg-gradient-to-r hover:from-[#3730a3] hover:to-[#6366f1]",
    pink: "hover:bg-gradient-to-r hover:from-[#db2777] hover:to-[#ec4899]",
    orange: "hover:bg-gradient-to-r hover:from-[#ea580c] hover:to-[#f97316]",
    teal: "hover:bg-gradient-to-r hover:from-[#0d9488] hover:to-[#14b8a6]"
  };

  // Size classes based on the size prop
  const sizeClasses = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group flex items-center justify-center space-x-2
        rounded-full border border-[#c8c8c8] text-black
        hover:text-white transition-all duration-300 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${colorGradients[color]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}