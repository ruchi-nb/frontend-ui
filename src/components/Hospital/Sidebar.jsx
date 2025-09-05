"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [doctorsSubmenuOpen, setDoctorsSubmenuOpen] = useState(false);

  const menuItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      path: "/Hospital",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5">
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
      ),
    },
    {
      id: "Doctors",
      label: "Doctors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M16 3.128a4 4 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        </svg>
      ),
      submenu: [
        { id: "AddDoctor", label: "Add Doctor", path: "/Hospital/addDoctor" },
        { id: "ManageDoctors", label: "Manage Doctors", path: "/Hospital/doctor" },
      ],
    },
    {
      id: "Settings",
      label: "Hospital Settings",
      path: "/Hospital/settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v. . ."></path>
        </svg>
      ),
    },
  ];

  const handleTabClick = (item) => {
    if (item.submenu) {
      setDoctorsSubmenuOpen(!doctorsSubmenuOpen);
    } else if (item.path) {
      router.push(item.path);
      setDoctorsSubmenuOpen(false);
    }
  };

  const handleSubmenuClick = (subItem, e) => {
    e.stopPropagation();
    if (subItem.path) {
      router.push(subItem.path);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="bg-slate-900 text-slate-100 h-screen w-64 flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-white">MedAI Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive(item.path) ? "bg-teal-500 text-white shadow-lg" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                onClick={() => handleTabClick(item)}
              >
                {item.icon}
                {item.label}
                {item.submenu && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ml-auto transform transition-transform ${doctorsSubmenuOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>

              {item.submenu && doctorsSubmenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <button
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive(subItem.path) ? "bg-teal-500 text-white shadow-lg" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                        onClick={(e) => handleSubmenuClick(subItem, e)}
                      >
                        <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                        {subItem.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
