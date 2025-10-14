"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onboardHospitalAdmin } from "@/data/api-superadmin";

export default function AddHospitalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    hospital_name: "",
    admin_email: "",
    admin_username: "",
    admin_password: "",
    admin_first_name: "",
    admin_last_name: "",
    admin_phone: "",
    subscription_plan: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!form.hospital_name || !form.admin_email || !form.admin_password) {
        throw new Error("Please fill in all required fields (Hospital Name, Admin Email, Admin Password)");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.admin_email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate password strength
      if (form.admin_password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      console.log("Creating hospital with admin:", form);

      // Prepare payload for API
      const payload = {
        hospital_name: form.hospital_name.trim(),
        admin_email: form.admin_email.trim(),
        admin_username: form.admin_username.trim() || form.admin_email.split("@")[0],
        admin_password: form.admin_password,
        admin_first_name: form.admin_first_name.trim() || null,
        admin_last_name: form.admin_last_name.trim() || null,
        admin_phone: form.admin_phone.trim() || null,
        auto_login: false // Don't auto-login, just create the account
      };

      // Call the API to create hospital and admin
      const result = await onboardHospitalAdmin(payload);

      console.log("Hospital creation successful:", result);

      setSuccess(`Hospital "${form.hospital_name}" and admin "${form.admin_email}" created successfully! The admin now has all required permissions.`);

      // Reset form after successful submission
      setForm({
        hospital_name: "",
        admin_email: "",
        admin_username: "",
        admin_password: "",
        admin_first_name: "",
        admin_last_name: "",
        admin_phone: "",
        subscription_plan: ""
      });

      // Redirect back to hospitals list after a delay
      setTimeout(() => {
        router.push('/admin/management');
      }, 3000);

    } catch (err) {
      console.error("Failed to create hospital:", err);
      setError(err.message || "Failed to create hospital. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear messages when user starts typing
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Hospital
          </h1>
          <p className="text-slate-600 mt-2">
            Fill in the details to add a new hospital to the system. The admin will automatically get all required permissions.
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-800 font-medium">✅ {success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-800 font-medium">❌ {error}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  value={form.hospital_name}
                  onChange={handleChange('hospital_name')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter hospital name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={form.admin_first_name} // Using this field for address temporarily
                  onChange={handleChange('admin_first_name')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter hospital address"
                />
              </div>
            </div>
          </div>

          {/* Admin Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Admin Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Email *
                </label>
                <input
                  type="email"
                  value={form.admin_email}
                  onChange={handleChange('admin_email')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter admin email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={form.admin_username}
                  onChange={handleChange('admin_username')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Auto-generated from email if empty"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Password *
                </label>
                <input
                  type="password"
                  value={form.admin_password}
                  onChange={handleChange('admin_password')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter admin password (min 8 characters)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Phone
                </label>
                <input
                  type="tel"
                  value={form.admin_phone}
                  onChange={handleChange('admin_phone')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter admin phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={form.admin_first_name}
                  onChange={handleChange('admin_first_name')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter admin first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={form.admin_last_name}
                  onChange={handleChange('admin_last_name')}
                  className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                  placeholder="Enter admin last name"
                />
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plan</h3>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subscription Plan
              </label>
              <select
                value={form.subscription_plan}
                onChange={handleChange('subscription_plan')}
                className="text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
              >
                <option value="">Select subscription plan</option>
                <option value="basic">Basic Plan - $99/month</option>
                <option value="professional">
                  Professional Plan - $299/month
                </option>
                <option value="enterprise">
                  Enterprise Plan - $599/month
                </option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Link
              href="/admin/management" 
              className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Add Hospital"}
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">ℹ️ What happens when you create a hospital?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• A new hospital record is created in the system</li>
          <li>• A hospital admin user account is created with the provided credentials</li>
          <li>• The admin automatically gets all required permissions (21 permissions)</li>
          <li>• Default roles (hospital_admin, doctor, patient) are created for the hospital</li>
          <li>• The admin can immediately log in and manage their hospital</li>
        </ul>
      </div>
    </div>
  );
}