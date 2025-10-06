// file: frontend/src/components/Landing/LoginPopUp.js
"use client";

import { useState, useEffect } from "react";
import RegisterModal from "@/components/Landing/RegisterModal";
import { login, getProfile, loginWithGoogle, getStoredTokens } from "@/data/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, AlertCircle, X } from "lucide-react";

export default function LoginPopup({ open, onClose, onLogin, onRegisterClick }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({});

  // State management for modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Open Register Modal (from anywhere)
  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  // Open Login Modal (from anywhere)
  const openLoginModal = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  // Close Register Modal
  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  // Close Login Modal
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Switch from Login to Register
  const switchToRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  // Close modal when clicking overlay (for both modals)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeRegisterModal();
      closeLoginModal();
    }
  };

  // Close modal with Escape key (for both modals)
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        closeRegisterModal();
        closeLoginModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Clear error message
    if (error) setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    setError("Please fix the validation errors below");
    return;
  }

  setLoading(true);
  setError("");

  try {
    console.log("Attempting login for:", formData.email);
    await login({ email: formData.email, password: formData.password });
    
    // Double-check tokens are stored
    const tokens = getStoredTokens();
    console.log("🔍 Tokens after login:", {
      hasAccessToken: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken
    });
    
    // Get role-aware profile
    const profile = await getProfile();
    console.log("Login successful, profile:", profile);
    
    onLogin && onLogin(profile);
    
    // Route based on user role
    const role = profile._detectedRole || profile.global_role?.role_name || 'patient';
    console.log("Final determined role for routing:", role);
    
    // Use window.location as fallback to ensure navigation
    const portalPath = role === 'hospital_admin' ? '/Hospital' : `/${role}portal`;
    console.log("Redirecting to:", portalPath);
    
    // Try router first, then fallback to window.location
    router.push(portalPath);
    
    // Fallback in case router doesn't work
    setTimeout(() => {
      if (window.location.pathname !== portalPath) {
        console.log("Router didn't navigate, using window.location");
        window.location.href = portalPath;
      }
    }, 1000);
    
    onClose();
  } catch (error) {
    console.error("Login failed:", error);
    setError(error.message || "Login failed. Please check your credentials and try again.");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      console.log("Google login credential received");
      await loginWithGoogle(credentialResponse.credential);
      
      // Get role-aware profile after Google login
      const profile = await getProfile();
      console.log("Google login successful, profile:", profile);
      
      onLogin && onLogin(profile);
      
      // Route based on user role
      const role = profile._detectedRole || profile.global_role?.role_name || 'patient';
      console.log("User role:", role);
      console.log("Profile global_role:", profile.global_role);
      
      switch (role) {
        case 'superadmin':
          router.push('/admin');
          break;
        case 'hospital_admin':
          router.push('/Hospital');
          break;
        case 'doctor':
          router.push('/doctorportal');
          break;
        case 'patient':
        default:
          router.push('/patientportal');
          break;
      }
      
      onClose();
    } catch (error) {
      console.error("Google login failed:", error);
      setError(error.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login error");
    setError("Google login failed. Please try again.");
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ email: "", password: "" });
      setError("");
      setValidationErrors({});
      onClose();
    }
  };

  const handleRegisterClick = () => {
    handleClose();
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  const handleRegisterSuccess = (profile) => { 
    setIsRegisterOpen(false);
    onLogin && onLogin(profile);
    
    // Route based on user role
    const role = profile._detectedRole || profile.global_role?.role_name;
    switch (role) {
      case 'hospital_admin':
        router.push('/Hospital');
        break;
      case 'doctor':
        router.push('/doctorportal');
        break;
      case 'patient':
      default:
        router.push('/patientportal');
        break;
    }
  };

  // Don't render anything if not open
  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={handleOverlayClick}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/30" 
          aria-hidden="true"
          onClick={handleClose}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="mx-auto max-w-md w-full bg-white rounded-2xl p-6 shadow-xl relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#004dd6] to-[#3d85c6] mb-4">
              Welcome Back
            </h2>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#004dd6] to-[#3d85c6] text-white rounded-lg hover:from-[#003cb3] hover:to-[#2d6ba3] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                logo_alignment="left"
                disabled={loading}
              />
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={switchToRegister}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={handleRegisterClose}
        onLogin={handleRegisterSuccess}
      />
    </>
  );
}