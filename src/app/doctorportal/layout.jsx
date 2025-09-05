"use client";

import Navbar from "@/components/DoctorPortal/Navbar";
import { useRouter } from "next/navigation";

export default function DoctorPortalLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // optional
    router.push("/"); // always redirect to root landing page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar sits on top */}
      <Navbar onLogout={handleLogout} />

      {/* ✅ Wrapper applied to all child pages */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
