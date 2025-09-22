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

  const submitLabel = kind === "patient" ? "Create Patient Account" : "Submit Application";

  // Validation helpers
  const isTextValid = (v) => /^[A-Za-z\s'-]+$/.test(v);
  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhoneValid = (v) => /^[0-9]+$/.test(v);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    let error;

    if ((name === "firstName" || name === "lastName") && value) {
      newValue = value.replace(/[^A-Za-z\s'-]/g, "");
      if (!isTextValid(newValue)) error = "No numbers or special characters allowed.";
    }
    if (name === "phone" && value) {
      newValue = value.replace(/[^0-9]/g, "");
      if (!isPhoneValid(newValue)) error = "Phone must contain only numbers.";
    }
    if (name === "email" && value && !isEmailValid(value)) error = "Enter a valid email address.";
    if (name === "doctorLicense" && kind === "doctor" && !newValue) error = "Doctor license is required.";

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !isEmailValid(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.phone || !isPhoneValid(formData.phone)) newErrors.phone = "Valid phone is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (kind === "doctor" && !formData.doctorLicense) newErrors.doctorLicense = "Doctor license is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    alert(`${submitLabel} successful!`);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-gotham"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-lg border border-[#c8c8c8] p-8"
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
          {kind === "patient"
            ? "Join thousands of patients getting quality healthcare"
            : "Join thousands of doctors providing quality healthcare"}
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {["firstName", "lastName", "email", "phone", "dob", "address"].map((field) => (
            <div key={field}>
              <input
                name={field}
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

          {kind === "doctor" && (
            <div>
              <input
                name="doctorLicense"
                placeholder="Doctor License Number"
                value={formData.doctorLicense}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg w-full text-black placeholder-[#c8c8c8] focus:outline-none ${
                  errors.doctorLicense ? "border-[#9f0202]" : "border-[#c8c8c8]"
                }`}
              />
              {errors.doctorLicense && <span className="text-[#9f0202] text-xs">{errors.doctorLicense}</span>}
            </div>
          )}

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
          className="w-full rounded-full border border-[#c8c8c8] text-black py-3 hover:bg-gradient-to-r hover:from-[#004dd6] hover:to-[#3d85c6] hover:text-white transition-all mb-3"
        >
          {submitLabel}
        </button>

        {/* Google Sign Up (Patients only) */}
        {kind === "patient" && (
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-[#c8c8c8] text-black rounded-full py-3 hover:shadow-md transition-all"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Google Sign Up</span>
          </button>
        )}
      </div>
    </div>
  );
}
