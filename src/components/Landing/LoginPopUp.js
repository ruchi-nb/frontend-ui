"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function LoginPopup({ open, onClose, onLogin }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>

          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</DialogTitle>
          <p className="text-gray-600 mb-6">Sign in with Google to access your dashboard</p>

          <button
            onClick={() => {
              onLogin();  // Trigger login in page.js
              onClose();  // Close popup
            }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all mb-4"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span>Continue with Google Account</span>
          </button>

          <p className="text-xs text-gray-500 text-center mb-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
