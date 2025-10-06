"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LifeLine } from "react-loading-indicators";
import { getStoredTokens, clearTokens, logout } from "@/data/api";
import { useUser } from "@/data/UserContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading: userLoading, isSuperAdmin } = useUser();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has admin privileges
    const { accessToken } = getStoredTokens();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!userLoading && user) {
      // Check if user has admin privileges
      if (!isSuperAdmin() && !user.global_role?.role_name?.includes('admin')) {
        console.log("User does not have admin privileges, redirecting...");
        clearTokens();
        localStorage.removeItem("isLoggedIn");
        router.push("/");
        return;
      }
      
      setLoading(false);
    } else if (!userLoading && !user) {
      // No user data and not loading, redirect to login
      console.log("No user data, redirecting to login...");
      clearTokens();
      localStorage.removeItem("isLoggedIn");
      router.push("/");
      return;
    }
  }, [user, userLoading, isSuperAdmin, router]);

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

  // Show loading while checking authentication
  if (loading || userLoading || loggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <LifeLine
            color="#00bba7"
            size="large"
            text={loggingOut ? "Logging out..." : "Loading..."}
            textColor="#374151"
          />
        </div>
      </div>
    );
  }

  // If no user or not admin, don't render anything (redirect will happen)
  if (!user || (!isSuperAdmin() && !user.global_role?.role_name?.includes('admin'))) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {children}
    </div>
  );
}
