// file: frontend/src/data/UserContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, getProfile, refreshTokens } from "@/data/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { email, username, role, permissions, ... }
  const [loading, setLoading] = useState(true);

  // On mount, try to refresh token and load user profile
  useEffect(() => {
    async function initUser() {
      setLoading(true);
      try {
        const refreshed = await refreshTokens(); // refresh JWT if available
        if (refreshed) {
          const profile = await getProfile(); // dynamic profile based on role
          setUser(profile); // profile includes role + permissions
        }
      } catch (e) {
        console.log("No active user:", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initUser();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    await apiLogin({ email, password });
    const profile = await getProfile(); // fetch dynamic profile
    setUser(profile);
    return profile;
  };

  // Logout function
  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  // Update user profile in context
  const updateProfile = (updatedProfile) => {
    setUser((prev) => ({ ...prev, ...updatedProfile }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, updateProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
