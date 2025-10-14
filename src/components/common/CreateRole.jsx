'use client';
import { ArrowLeft, User, X, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ScaleIn, FadeIn } from "@/components/common/animations";
import { createHospitalRole } from '@/data/api-hospital-admin';
import { useUser } from '@/data/UserContext';
import { useHospitalId } from '@/hooks/useHospitalId';

export default function Create() {
  const router = useRouter();
  const { user } = useUser();
  const { hospitalId, hasHospitalAccess } = useHospitalId();
  const [form, setForm] = useState({
    firstName: "",
    description: "",
    permissions: [] // Added missing permissions field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBack = () => {
    router.push('/Hospital/roles');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!form.firstName) {
        throw new Error("Please fill in all required fields");
      }

      // Validate hospital access
      if (!hasHospitalAccess || !hospitalId) {
        throw new Error("No hospital ID found for user. Please ensure you are logged in as a hospital admin.");
      }

      console.log("🔍 Debug - User object:", user);
      console.log("🔍 Debug - Hospital ID:", hospitalId);
      console.log("🔍 Debug - User hospital_id:", user?.hospital_id);
      console.log("🔍 Debug - User hospital_roles:", user?.hospital_roles);
      console.log("🔍 Debug - User global_role:", user?.global_role);

      // Prepare payload according to API expectations
      const payload = {
        role_name: form.firstName,
        description: form.description || undefined,
        permissions: form.permissions || [] // Include permissions in payload
      };

      // Call the actual API
      const result = await createHospitalRole(payload);
      
      setSuccess(`Role ${form.firstName} created successfully!`);
      
      // Reset form after successful submission
      setForm({
        firstName: "",
        description: "",
        permissions: []
      });

      // Optionally redirect back to roles page after a delay
      setTimeout(() => {
        router.push('/Hospital/roles');
      }, 2000);

    } catch (err) {
      console.error("Failed to create role:", err);
      setError(err.message || "Failed to create role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((f) => ({ ...f, [field]: value }));
    // Clear messages when user starts typing
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (permission) => (e) => {
    const currentPermissions = Array.isArray(form.permissions) ? form.permissions : [];
    let newPermissions;

    if (e.target.checked) {
      newPermissions = [...currentPermissions, permission];
    } else {
      newPermissions = currentPermissions.filter(perm => perm !== permission);
    }

    setForm((f) => ({ ...f, permissions: newPermissions }));
    
    // Clear messages when user makes changes
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  // Available permissions
  const AVAILABLE_PERMISSIONS = [
    { id: "view_patients", label: "View Patients" },
    { id: "view_doctors", label: "View Doctors" },
    { id: "manage_patients", label: "Manage Patients" },
    { id: "manage_doctors", label: "Manage Doctors" },
    { id: "view_reports", label: "View Reports" },
    { id: "manage_reports", label: "Manage Reports" },
    { id: "view_appointments", label: "View Appointments" },
    { id: "manage_appointments", label: "Manage Appointments" }
  ];

  return (
    <>
    <FadeIn direction="up" duration={0.8} delay={0.2} speed={1}>
      <ScaleIn direction="up" duration={0.8} delay={0.4} speed={1}>
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={handleBack}
          className="p-2 text-zinc-800 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Role</h1>
          <p className="text-gray-600 mt-2">
            Create custom roles and assign permissions to manage user access.
          </p>
        </div>
      </div>
      </ScaleIn>
      </FadeIn>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              className="text-green-500 hover:text-green-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Role name and description */}
        <FadeIn direction="up" duration={0.8} delay={0.4} speed={1}>
          <ScaleIn direction="up" duration={0.8} delay={0.6} speed={1}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  About Role
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter role name"
                    value={form.firstName}
                    onChange={onChange("firstName")}
                    disabled={loading}
                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="A description of this role and its responsibilities"
                    value={form.description}
                    onChange={onChange("description")}
                    disabled={loading}
                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </ScaleIn>
        </FadeIn>

        {/* Set permissions */}
        <FadeIn direction="up" duration={0.8} delay={0.6} speed={1}>
          <ScaleIn direction="up" duration={0.8} delay={0.8} speed={1}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Set Permissions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select permissions for this role:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {AVAILABLE_PERMISSIONS.map((permission) => (
                      <label key={permission.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={Array.isArray(form.permissions) && form.permissions.includes(permission.id)}
                          onChange={handlePermissionChange(permission.id)}
                          disabled={loading}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                        <span className="text-sm text-gray-700 font-medium">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </FadeIn>

        {/* Submit Button */}
        <FadeIn direction="up" duration={0.8} delay={0.8} speed={1}>
          <ScaleIn direction="up" duration={0.8} delay={1.0} speed={1}>
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <span>Create Role</span>
            )}
          </button>
        </div>
          </ScaleIn>
        </FadeIn>
      </form>
    </>
  );
}