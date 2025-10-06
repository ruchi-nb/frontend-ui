"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { useState, useEffect } from "react";
import { LifeLine } from "react-loading-indicators";
import { getStoredTokens, clearTokens, logout } from "@/data/api";

const portalNavItems = [
  { type: "link", path: "/patientportal", label: "Home" },
  { type: "link", path: "/patientportal/mydoctors", label: "My Doctors" },
  { type: "link", path: "/patientportal/settings", label: "Settings" },
  { type: "logout", label: "Logout", variant: "outline", color: "red" },
];

function PortalContent({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const { accessToken } = getStoredTokens();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (accessToken && isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      // Clear any invalid tokens
      clearTokens();
      localStorage.removeItem("isLoggedIn");
      // Redirect to home page
      router.push("/");
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      localStorage.removeItem("isLoggedIn");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  // In your patientportal/layout.js, add this:
  useEffect(() => {
    console.log("🔍 PatientPortal Layout - Current tokens:", getStoredTokens());
    console.log("🔍 PatientPortal Layout - isLoggedIn:", localStorage.getItem("isLoggedIn"));
  }, []);

  if (loading || loggingOut) {
    return (
      <div className="h-screen bg-[#fdfeff] flex items-center justify-center">
        <div className="text-center">
          <LifeLine
            color="#b9d0f5"
            size="large"
            text={loggingOut ? "Logging out..." : "Medicare"}
            textColor="#b9d0f5"
          />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[#fdfeff] flex items-center justify-center">
        <div className="text-center">
          <LifeLine
            color="#b9d0f5"
            size="large"
            text="Redirecting..."
            textColor="#b9d0f5"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar onLogout={handleLogout} navItems={portalNavItems} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function PatientPortalLayout({ children }) {
  return <PortalContent>{children}</PortalContent>;
}