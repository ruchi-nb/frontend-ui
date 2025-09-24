"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import RegisterModal from "@/components/Landing/RegisterModal";
import { login } from "@/data/api";

export default function LoginPopup({ open, onClose, onLogin, onRegisterDoctor }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
              Sign in with Google to access your dashboard
            </p>

            {/* Demo Login Button (replace with real form or OAuth) */}
            <button
              onClick={async () => {
                setLoading(true);
                setError("");
                try {
                  // TODO: Replace hardcoded creds with real inputs or Google callback
                  await login({ email: "patient@example.com", password: "password123" });
                  onLogin && onLogin();
                  onClose();
                } catch (e) {
                  setError(e?.message || "Login failed");
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full flex items-center justify-center gap-3 border border-[#c8c8c8] text-black px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all mb-6"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span className="font-medium">{loading ? "Signing in..." : "Continue (Demo Login)"}</span>
            </button>

            {error && (
              <p className="text-[#9f0202] text-sm text-center mb-4">{error}</p>
            )}

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
