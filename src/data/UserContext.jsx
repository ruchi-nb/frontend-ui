"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, getProfile, refreshTokens, getStoredTokens, clearTokens } from "@/data/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Initialize user on mount
useEffect(() => {
  const initializeUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug: Check what tokens are available
      const tokens = getStoredTokens();
      console.log("🔍 Initializing user - tokens found:", {
        hasAccessToken: !!tokens.accessToken,
        hasRefreshToken: !!tokens.refreshToken,
        accessTokenLength: tokens.accessToken?.length,
        refreshTokenLength: tokens.refreshToken?.length
      });
      
      // Try to refresh tokens first
      const refreshed = await refreshTokens();
      console.log("🔄 Token refresh result:", refreshed);
      
      if (refreshed) {
        console.log("✅ Tokens refreshed successfully");
        const profile = await getProfile();
        setUser(profile);
        console.log("✅ User profile loaded:", profile);
      } else {
        console.log("❌ No valid tokens found - user not authenticated");
        setUser(null);
      }
    } catch (e) {
      console.error("❌ Failed to initialize user:", e);
      setError(e.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  initializeUser();
}, []);

  // Enhanced login function with better error handling
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Attempting login for:", email);
      await apiLogin({ email, password });
      
      console.log("Login successful, fetching profile...");
      const profile = await getProfile();
      console.log("Profile fetched:", profile);
      
      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logout function
  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData
    }));
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Get user role helper
  const getUserRole = () => {
    if (!user) return null;
    
    // Check if role was detected from endpoint fallback
    if (user._detectedRole) {
      return user._detectedRole;
    }
    
    // Check JWT role
    if (user.global_role?.role_name) {
      return user.global_role.role_name;
    }
    
    // Fallback role detection based on available data
    if (user.hospital_id) return 'hospital_admin';
    if (user.specialties) return 'doctor';
    return 'patient';
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return getUserRole() === role;
  };

  // Get user permissions helper
  const getUserPermissions = () => {
    if (!user) return [];
    
    // Extract permissions from user object
    if (user.permissions && Array.isArray(user.permissions)) {
      return user.permissions.flatMap(p => p.permissions || []);
    }
    
    return [];
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    const permissions = getUserPermissions();
    return permissions.includes(permission);
  };

  // Get hospital ID for hospital admin users
  const getHospitalId = () => {
    if (!user) return null;
    
    // Check if hospital_id is directly available
    if (user.hospital_id) return user.hospital_id;
    
    // Check hospital_roles array
    if (user.hospital_roles && user.hospital_roles.length > 0) {
      return user.hospital_roles[0].hospital_id;
    }
    
    return null;
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Guest";
    
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    
    if (user.first_name) return user.first_name;
    if (user.username) return user.username;
    if (user.email) return user.email.split('@')[0];
    
    return "User";
  };

  // Get user avatar URL
  const getUserAvatar = () => {
    if (!user) return "/images/man.png";
    
    if (user.avatar_url) return user.avatar_url;
    
    // Default avatar based on gender
    if (user.gender === 'female') return "/images/woman.png";
    return "/images/man.png";
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Get user ID
  const getUserId = () => {
    return user?.user_id || user?.id || null;
  };

  const value = {
    // State
    user,
    loading,
    error,
    
    // Actions
    login,
    logout,
    updateUser,
    clearError,
    
    // Helpers
    getUserRole,
    hasRole,
    getUserPermissions,
    hasPermission,
    getHospitalId,
    getUserDisplayName,
    getUserAvatar,
    isAuthenticated,
    getUserId,
    
    // Role checks
    isPatient: () => hasRole('patient'),
    isDoctor: () => hasRole('doctor'),
    isHospitalAdmin: () => hasRole('hospital_admin'),
    isSuperAdmin: () => hasRole('superadmin'),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider> 
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Export the context for advanced usage
export { UserContext };