"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserCog,
  Bot,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [doctorsSubmenuOpen, setDoctorsSubmenuOpen] = useState(false);

  const menuItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      path: "/Hospital",
      icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
    },
    {
      id: "Doctors",
      label: "Doctors",
      icon: <UserCog className="mr-3 h-5 w-5" />,
      submenu: [
        { id: "AddDoctor", label: "Add Doctor", path: "/Hospital/addDoctor" },
        { id: "ManageDoctors", label: "Manage Doctors", path: "/Hospital/doctor" },
      ],
    },
    {
      id: "Settings",
      label: "Hospital Settings",
      path: "/Hospital/settings",
      icon: <Settings className="mr-3 h-5 w-5" />,
    },
  ];

  // Open Doctors submenu if current path matches a submenu path
  useEffect(() => {
    if (menuItems.find((item) =>
      item.submenu?.some((sub) => pathname.startsWith(sub.path))
    )) {
      setDoctorsSubmenuOpen(true);
    }
  }, [pathname]);

  const handleTabClick = (item) => {
    if (item.submenu) {
      setDoctorsSubmenuOpen(!doctorsSubmenuOpen);
    } else if (item.path) {
      router.push(item.path);
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
    <div className="bg-slate-900 text-slate-100 h-screen w-64 flex flex-col fixed left-0 top-0 transition-all duration-500 ease-in-out">
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
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive(item.path)
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
                    className={`ml-auto transform transition-transform duration-300 ${
                      doctorsSubmenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>

              {item.submenu && (
                <ul
                  className={`ml-6 mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
                    doctorsSubmenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <button
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive(subItem.path)
                            ? "bg-teal-600 text-white shadow-md"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                        onClick={(e) => handleSubmenuClick(subItem, e)}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-3 ${
                            isActive(subItem.path) ? "bg-white" : "bg-slate-400"
                          }`}
                        ></span>
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
