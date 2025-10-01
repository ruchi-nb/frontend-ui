// file: frontend/src/components/Landing/LoginPopUp.js
"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import RegisterModal from "@/components/Landing/RegisterModal";
import { login, getPatientProfile, loginWithGoogle } from "@/data/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function LoginPopup({ open, onClose, onLogin, onRegisterDoctor }) {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
  
    setLoading(true);
    setError("");
    try {
      await login({ email: formData.email, password: formData.password });
      // Fetch and update user profile after login
      const profile = await getPatientProfile();
      onLogin && onLogin(profile); // Pass the user data to parent if provided
      // Navigate into patient portal so UserProvider can initialize
      router.push("/patientportal");
      onClose();
    } catch (e) {
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-50 font-gotham">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-lg border border-[#c8c8c8] p-8 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#767676] hover:text-[#000] text-xl"
            >
              ✕
            </button>

            {/* Heading */}
            <DialogTitle className="text-[2.5rem] font-normal font-poppins text-[#000] mb-4 leading-snug">
              Welcome Back
            </DialogTitle>
            <p className="text-[1rem] font-light text-[#767676] mb-8 leading-relaxed">
              Sign in to access your dashboard
            </p>

            {/* Login Form */}
            <div className="space-y-4 mb-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-[#c8c8c8] px-4 py-3 rounded-lg text-black placeholder-[#c8c8c8] focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-[#c8c8c8] px-4 py-3 rounded-lg text-black placeholder-[#c8c8c8] focus:outline-none"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-[#c8c8c8] text-black px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all mb-6 disabled:opacity-50"
            >
              <span className="font-medium">{loading ? "Signing in..." : "Sign In"}</span>
            </button>

            {error && (
              <p className="text-[#9f0202] text-sm text-center mb-4">{error}</p>
            )}

            {/* Google Login */}
            <div className="w-full mb-4">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    setLoading(true);
                    setError("");
                    const idToken = credentialResponse.credential;
                    await loginWithGoogle(idToken);
                    onLogin && onLogin();
                    onClose();
                  } catch (e) {
                    setError(e?.message || "Google login failed");
                  } finally {
                    setLoading(false);
                  }
                }}
                onError={() => {
                  setError("Google login failed. Please try again.");
                }}
                theme="outline"
                size="large"
                width="100%"
                text="signin_with"
                shape="pill"
              />
            </div>

            {/* Terms */}
            <p className="text-xs text-[#767676] text-center mb-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#004dd6] underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#004dd6] underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Register CTA */}
            <p className="text-center text-sm text-[#000]">
              New here?{" "}
              <button
                onClick={() => {
                  setIsRegisterOpen(true);
                  onClose();
                }}
                className="text-[#004dd6] underline font-medium"
              >
                Register an account
              </button>
            </p>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Register Modal */}
      <RegisterModal
        kind="patient"
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterDoctor={onRegisterDoctor}
      />
    </>
  );
}