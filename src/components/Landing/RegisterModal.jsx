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

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const submitLabel = kind === "patient"
    ? "Create Patient Account"
    : "Create Doctor Account";

  // Validation functions
  const isTextValid = (value) => /^[A-Za-z\s'-]+$/.test(value);
  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhoneValid = (value) => /^[0-9]+$/.test(value);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    let error;

    // Real-time filtering
    if ((name === "firstName" || name === "lastName") && value) {
      newValue = value.replace(/[^A-Za-z\s'-]/g, ""); // block numbers & symbols
      if (!isTextValid(newValue)) error = "No numbers or special characters allowed.";
    }

    if (name === "phone" && value) {
      newValue = value.replace(/[^0-9]/g, ""); // block letters & symbols
      if (!isPhoneValid(newValue)) error = "Phone must contain only numbers.";
    }

    if (name === "email" && value && !isEmailValid(value)) {
      error = "Enter a valid email address.";
    }

    if (name === "doctorLicense" && kind === "doctor" && !newValue) {
      error = "Doctor license number is required.";
    }

    if (name === "dob" && !newValue) {
      error = "Date of birth is required.";
    }

    if (name === "address" && !newValue) {
      error = "Address is required.";
    }

    if (name === "agree" && !checked) {
      error = "You must agree to the terms.";
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !isEmailValid(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.phone || !isPhoneValid(formData.phone)) newErrors.phone = "Phone is required and must contain only numbers.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (kind === "doctor" && !formData.doctorLicense) newErrors.doctorLicense = "Doctor license number is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    alert(`${submitLabel} successful!`);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      doctorLicense: "",
      agree: false,
    });
    setErrors({});
    onClose();
  };

  const handleGoogleSignUp = () => {
    if (onRegisterDoctor) {
      onRegisterDoctor();
    } else {
      router.push("/doctorportal");
    }
    onClose();
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
              {submitLabel}
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

        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}

          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}

          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dob && <span className="text-red-500 text-xs">{errors.dob}</span>}

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}

          {kind === "doctor" && (
            <>
              <input
                name="doctorLicense"
                placeholder="Doctor License Number"
                value={formData.doctorLicense}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none ${errors.doctorLicense ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.doctorLicense && <span className="text-red-500 text-xs">{errors.doctorLicense}</span>}
            </>
          )}

          <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          {errors.agree && <span className="text-red-500 text-xs">{errors.agree}</span>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-3 font-semibold hover:shadow-lg transition-all duration-300 mb-3"
        >
          {submitLabel}
        </button>

        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 font-medium hover:shadow-md transition-all duration-300"
        >
          Google Sign Up
        </button>
      </div>
    </div>
  );
}
