'use client';
import React, { useMemo, useState, useContext, useEffect } from "react";
import { User, FileText, Save, X } from "lucide-react";
import { addDoctorToHospital } from '@/data/api-hospital-admin';
import Credentials from '@/components/Hospital/form/Credentials';
import { request } from '@/data/api.js';
import { useUser } from '@/data/UserContext';

// Function to get hospital-specific custom roles
const getHospitalCustomRoles = async (hospitalId) => {
  try {
    const response = await request(`/api/hospitals/${hospitalId}/roles?type=custom`, { 
      method: "GET" 
    });
    return response || [];
  } catch (error) {
    console.error("Failed to fetch custom roles:", error);
    return [];
  }
};

const SPECIALTIES = [
  { id: "general", name: "General" },
  { id: "emergency", name: "Emergency" },
  { id: "outpatient", name: "Outpatient" },
  { id: "surgery", name: "Surgery" },
  { id: "icu", name: "ICU" },
  { id: "cardiology", name: "Cardiology" },
  { id: "neurology", name: "Neurology" },
  { id: "pediatrics", name: "Pediatrics" },
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

const CustomRoleForm = ({ onSuccess, onCancel }) => {
  const { user, getHospitalId } = useUser();
  const hospitalId = getHospitalId();
  const hasHospitalAccess = !!hospitalId;
  const [customRoles, setCustomRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  
  // Load custom roles dynamically
  useEffect(() => {
    async function loadCustomRoles() {
      try {
        if (!hospitalId) {
          setLoadingRoles(false);
          return;
        }

        const roles = await getHospitalCustomRoles(hospitalId);
        setCustomRoles(roles);
      } catch (error) {
        console.error("Failed to load custom roles:", error);
        setCustomRoles([]);
      } finally {
        setLoadingRoles(false);
      }
    }

    if (hospitalId) {
      loadCustomRoles();
    }
  }, [hospitalId]);
  
  if (!hasHospitalAccess) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
          <p className="text-red-600">You don't have permission to access this hospital's data.</p>
        </div>
      </div>
    );
  }

  if (loadingRoles) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="opacity-50">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (customRoles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Custom Roles Available</h3>
          <p className="text-yellow-600 mb-4">You need to create custom roles first before adding users.</p>
          <button
            onClick={() => window.location.href = '/Hospital/createRole'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Custom Role
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    firstName: "",
    lastName: "",
    phone: "",
    specialty: "",
    languages: [],
    experience: "",
    qualifications: "",
    bio: "",
  });

  // Set default role when custom roles are loaded
  useEffect(() => {
    if (customRoles.length > 0 && !formData.role) {
      setFormData(prev => ({ ...prev, role: customRoles[0].role_name }));
    }
  }, [customRoles, formData.role]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const password = randFrom(chars, 12);
    setFormData(prev => ({ ...prev, password, confirmPassword: password }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        role_name: formData.role,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      };

      await addDoctorToHospital(payload);
      
      // Success - reset form or redirect
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "nurse",
        firstName: "",
        lastName: "",
        phone: "",
        specialty: "",
        languages: [],
        experience: "",
        qualifications: "",
        bio: "",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        alert("Custom role user added successfully!");
      }
    } catch (error) {
      console.error("Error adding custom role user:", error);
      alert("Failed to add custom role user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Add Custom Role User</h2>
            <p className="text-blue-100 text-sm">Create a new user with custom hospital role</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Credentials Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            User Credentials
          </h3>
          <Credentials
            username={formData.username}
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onUsernameChange={(value) => handleInputChange('username', value)}
            onEmailChange={(value) => handleInputChange('email', value)}
            onPasswordChange={(value) => handleInputChange('password', value)}
            onConfirmPasswordChange={(value) => handleInputChange('confirmPassword', value)}
            onGeneratePassword={generatePassword}
            errors={errors}
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a custom role</option>
            {customRoles.map(role => (
              <option key={role.hospital_role_id} value={role.role_name}>
                {role.role_name.charAt(0).toUpperCase() + role.role_name.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Specialty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          <select
            value={formData.specialty}
            onChange={(e) => handleInputChange('specialty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select specialty</option>
            {SPECIALTIES.map(specialty => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages Spoken
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INDIAN_LANGUAGES.map(language => (
              <label key={language} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageToggle(language)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience (Years)
          </label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter years of experience"
            min="0"
            max="50"
          />
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualifications
          </label>
          <textarea
            value={formData.qualifications}
            onChange={(e) => handleInputChange('qualifications', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter qualifications (e.g., B.Sc Nursing, Diploma in Lab Technology)"
            rows="3"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a brief bio"
            rows="3"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Adding...' : 'Add Custom Role User'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomRoleForm;
