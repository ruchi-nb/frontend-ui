'use client';
import React, { useMemo, useState } from "react";
import { User, FileText, Save, Key } from "lucide-react";

const ROLES = ["patient", "doctor", "nurse", "lab technician"];

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "Internal Medicine",
  "General Surgery",
];

const INDIAN_LANGUAGES = [
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Malayalam",
];

function randFrom(chars, n) {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

const DoctorForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    specialty: "",
    languages: [],
    password: "",
    genMode: "pattern", // 'pattern' | 'random'
  });

  const username = useMemo(() => form.email.trim(), [form.email]);

  const onChange = (field) => (e) => {
    const value = e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value ?? e;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const toggleLanguage = (lang) => {
    setForm((f) => {
      const exists = f.languages.includes(lang);
      return { ...f, languages: exists ? f.languages.filter((l) => l !== lang) : [...f.languages, lang] };
    });
  };

  const isClinician = form.role === "doctor" || form.role === "nurse" || form.role === "lab technician";

  const generatePassword = () => {
    if (form.genMode === "random") {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
      const pw = randFrom(chars, 12);
      setForm((f) => ({ ...f, password: pw }));
      return;
    }
    // pattern: first 2 of first name + first 2 of last name + last 4 of phone + random 2
    const f2 = (form.firstName || "").replace(/\s+/g, "").slice(0, 2).toLowerCase();
    const l2 = (form.lastName || "").replace(/\s+/g, "").slice(0, 2).toLowerCase();
    const last4 = (form.phone || "").replace(/\D/g, "").slice(-4);
    const extra = randFrom("!@#$%abcdefghijkmnpqrstuvwxyz23456789", 2);
    const base = `${f2}${l2}${last4}${extra}`;
    setForm((f) => ({ ...f, password: base || randFrom("abcdefghijkmnpqrstuvwxyz23456789", 8) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up submit to API as needed
    // Payload example:
    // {
    //   firstName, lastName, email, phone, role,
    //   specialty: isClinician ? specialty : null,
    //   languages: isClinician ? languages : [],
    //   credentials: { username: email, password }
    // }
    console.log("Create user payload", {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      role: form.role,
      specialty: isClinician ? form.specialty : null,
      languages: isClinician ? form.languages : [],
      credentials: { username, password: form.password },
    });
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              required
              type="text"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={onChange("firstName")}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              required
              type="text"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={onChange("lastName")}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (username) *
            </label>
            <input
              required
              type="email"
              placeholder="user@hospital.com"
              value={form.email}
              onChange={onChange("email")}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={onChange("phone")}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role *
            </label>
            <select
              required
              value={form.role}
              onChange={(e) => {
                const newRole = e.target.value;
                setForm((f) => ({
                  ...f,
                  role: newRole,
                  // reset clinician-only fields if switching to patient
                  specialty: newRole === "patient" ? "" : f.specialty,
                  languages: newRole === "patient" ? [] : f.languages,
                }));
              }}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select role</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Key className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Login Credentials
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              readOnly
              placeholder="Auto-filled from email"
              className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              required
              type="text"
              placeholder="Click Generate or type your own"
              value={form.password}
              onChange={onChange("password")}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generation Mode
            </label>
            <div className="flex items-center gap-2">
              <select
                value={form.genMode}
                onChange={onChange("genMode")}
                className="flex-1 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pattern">Name+Phone Pattern</option>
                <option value="random">Random Secure</option>
              </select>
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Generate Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information (conditional) */}
      {isClinician && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Professional Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty *
              </label>
              <select
                required
                value={form.specialty}
                onChange={onChange("specialty")}
                className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select specialty</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Languages (Select any)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INDIAN_LANGUAGES.map((lang) => (
                  <label key={lang} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form.languages.includes(lang)}
                      onChange={() => toggleLanguage(lang)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Create User</span>
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;