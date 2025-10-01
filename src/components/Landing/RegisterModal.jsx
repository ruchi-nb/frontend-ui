// file: frontend/src/components/Landing/RegisterModal.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerPatient, loginWithGoogle } from "@/data/api";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterModal({ open, onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
    dob: "",
    address: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submitLabel = "Create Account";

  // Validation helpers
  const isTextValid = (v) => /^[A-Za-z\s'-]+$/.test(v);
  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhoneValid = (v) => /^[0-9]+$/.test(v);
  const isUsernameValid = (v) => /^[a-zA-Z0-9_]+$/.test(v);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    let error;

    // Field-specific validation
    if ((name === "first_name" || name === "last_name") && value) {
      newValue = value.replace(/[^A-Za-z\s'-]/g, "");
      if (!isTextValid(newValue)) error = "No numbers or special characters allowed.";
    }
    
    if (name === "username" && value) {
      newValue = value.replace(/[^a-zA-Z0-9_]/g, "");
      if (!isUsernameValid(newValue)) error = "Only letters, numbers, and underscores allowed.";
    }
    
    if (name === "phone" && value) {
      newValue = value.replace(/[^0-9]/g, "");
      if (!isPhoneValid(newValue)) error = "Phone must contain only numbers.";
    }
    
    if (name === "email" && value && !isEmailValid(value)) {
      error = "Enter a valid email address.";
    }
    
    if (name === "password" && value && value.length < 6) {
      error = "Password must be at least 6 characters.";
    }
    
    if (name === "confirmPassword" && value && value !== formData.password) {
      error = "Passwords do not match.";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email || !isEmailValid(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.first_name) newErrors.first_name = "First name is required.";
    if (!formData.last_name) newErrors.last_name = "Last name is required.";
    if (!formData.phone || !isPhoneValid(formData.phone)) newErrors.phone = "Valid phone is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      };

      await registerPatient(registrationData);
      onClose();
    } catch (e) {
      alert(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const idToken = credentialResponse.credential;
      await loginWithGoogle(idToken);
      localStorage.setItem("isLoggedIn", "true");
      router.push("/patientportal");
      onClose();
    } catch (err) {
      console.error("Google sign up failed", err);
      setErrors({ general: "Google sign up failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-gotham"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-lg border border-[#c8c8c8] p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[2.5rem] font-normal font-poppins text-[#000] leading-snug">
            {submitLabel}
          </h3>
          <button
            onClick={onClose}
            className="text-[#767676] hover:text-[#000] text-2xl font-light"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <p className="text-[1rem] font-light text-[#767676] mb-8 leading-relaxed">
          {"Join thousands of patients getting quality healthcare"}
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {/* Account Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.username ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.username && <span className="text-[#9f0202] text-xs">{errors.username}</span>}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.email ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.email && <span className="text-[#9f0202] text-xs">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.password ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.password && <span className="text-[#9f0202] text-xs">{errors.password}</span>}
            </div>
            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.confirmPassword ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.confirmPassword && <span className="text-[#9f0202] text-xs">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.first_name ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.first_name && <span className="text-[#9f0202] text-xs">{errors.first_name}</span>}
            </div>
            <div>
              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.last_name ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.last_name && <span className="text-[#9f0202] text-xs">{errors.last_name}</span>}
            </div>
          </div>

          {["phone", "dob"].map((field) => (
            <div key={field}>
              <input
                name={field}
                type={field === "dob" ? "date" : "text"}
                placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors[field] ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors[field] && <span className="text-[#9f0202] text-xs">{errors[field]}</span>}
            </div>
          ))}

          <label className="flex items-start gap-2 text-sm text-[#767676] cursor-pointer">
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          {errors.agree && <span className="text-[#9f0202] text-xs">{errors.agree}</span>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-full border border-[#c8c8c8] text-black py-3 hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all mb-3 disabled:opacity-50"
        >
          {loading ? "Processing..." : submitLabel}
        </button>

        {/* Google Sign Up */}
        <div className="w-full">
          <GoogleLogin
            onSuccess={handleGoogleSignUpSuccess}
            onError={() => {
              console.error("Google sign up failed");
              setErrors({ general: "Google sign up failed. Please try again." });
            }}
            theme="outline"
            size="large"
            width="100%"
            text="signup_with"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
}