"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterModal({ kind, open, onClose, onRegisterDoctor }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    doctorLicense: "",
    agree: false,
  });

  if (!open) return null;

  const submitLabel = kind === "patient" 
    ? "Create Patient Account" 
    : "Create Doctor Account";

  const handleGoogleSignUp = () => {
    // If an onRegisterDoctor prop is provided, use it
    if (onRegisterDoctor) {
      onRegisterDoctor();
    } else {
      // Otherwise, navigate to the doctor portal
      router.push("/doctorportal");
    }
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {kind === "patient" ? "Create Patient Account" : "Create Doctor Account"}
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-gray-800 text-2xl font-light"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-700">
            {kind === "patient"
              ? "Join thousands of patients getting quality healthcare"
              : "Join thousands of doctors providing quality healthcare"}
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {kind === "doctor" && (
            <input
              placeholder="Doctor License Number"
              value={formData.doctorLicense}
              onChange={(e) => handleInputChange("doctorLicense", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
          <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agree}
              onChange={(e) => handleInputChange("agree", e.target.checked)}
              className="mt-1"
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-3 font-semibold hover:shadow-lg transition-all duration-300 mb-3">
          {submitLabel}
        </button>

        {/* Google sign up button with navigation */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 font-medium hover:shadow-md transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
          </svg>
          <span className="text-gray-800">Or sign up with Google instead</span>
        </button>
      </div>
    </div>
  );
}