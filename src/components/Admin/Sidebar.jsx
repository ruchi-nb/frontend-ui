"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Shield,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      id: "HospitalManagement",
      label: "Hospital Management",
      path: "/admin/management",
      icon: <Building2 className="w-5 h-5 mr-3" />,
    },
  ];

  const isActive = (path) => pathname === path;

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className="bg-[#0f172b] text-[#f0f9ff] h-screen w-72 flex flex-col fixed left-0 top-0 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#00bba7] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-white">MedAI Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 overflow-y-auto">
        <div className="px-6 text-xs font-semibold text-[#009689] uppercase tracking-widest mb-3">
          Main Menu
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center px-6 py-3 text-sm font-medium border-l-4 transition-colors duration-300 ease-in-out ${
                  isActive(item.path)
                    ? "bg-[#00bba7]/10 text-[#00bba7] border-[#00bba7]"
                    : "text-slate-300 border-transparent hover:bg-[#0f172b]/60 hover:text-white"
                }`}
                onClick={() => handleClick(item.path)}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Logout Section */}
      <div className="px-6 py-4 border-t border-[#009689]/30">
        <button
          className="flex items-center gap-3 text-sm font-medium text-red-400 hover:text-red-600 transition-colors"
          onClick={() => router.push("/")}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
