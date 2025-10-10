import { request } from './api.js';

// =============================================
// AUTHENTICATION APIs
// =============================================

/**
 * Login user 
 */
export async function login({ email, password }) {
  console.log("🔐 Attempting login for:", email);
  
  const response = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }, { withAuth: false });
  
  console.log("✅ Login successful, response:", response);
  
  // Store tokens and set login flag
  if (response.access_token && response.refresh_token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("isLoggedIn", "true"); // Add this line
      console.log("💾 Tokens stored in localStorage");
    }
  }
  
  return response;
}

/**
 * Logout user
 */
export async function logout() {
  console.log("🚪 Attempting logout");
  
  try {
    const response = await request("/auth/logout", {
      method: "POST"
    });
    
    // Clear tokens regardless of API response
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("superadmin_access_token");
      localStorage.removeItem("superadmin_refresh_token");
      console.log("🧹 All tokens cleared from localStorage");
    }
    
    return response;
  } catch (error) {
    console.error("❌ Logout error:", error);
    // Still clear tokens even if API call fails
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("superadmin_access_token");
      localStorage.removeItem("superadmin_refresh_token");
      console.log("🧹 Tokens cleared despite API error");
    }
    throw error;
  }
}

/**
 * Register new user
 */
export async function register(userData) {
  console.log("📝 Attempting registration for:", userData.email);
  
  const response = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  }, { withAuth: false });
  
  console.log("✅ Registration successful");
  return response;
}

/**
 * Request password reset
 */
export async function forgotPassword(email) {
  console.log("🔑 Requesting password reset for:", email);
  
  const response = await request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  }, { withAuth: false });
  
  console.log("✅ Password reset email sent");
  return response;
}

/**
 * Reset password with token
 */
export async function resetPassword(token, newPassword) {
  console.log("🔄 Resetting password with token");
  
  const response = await request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, new_password: newPassword })
  }, { withAuth: false });
  
  console.log("✅ Password reset successful");
  return response;
}

/**
 * Verify email
 */
export async function verifyEmail(token) {
  console.log("📧 Verifying email with token");
  
  const response = await request("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token })
  }, { withAuth: false });
  
  console.log("✅ Email verification successful");
  return response;
}