// File: components/PatientPortal/Settings.jsx
"use client";
import { useEffect, useState } from "react";
import { getPatientProfile, updatePatientProfile } from "@/data/api";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getPatientProfile();
        if (!mounted) return;
        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          dob: data.dob || "",
          phone: data.phone || "",
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          zip: data.address?.zip || "",
        });
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updatePatientProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dob,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      });
      alert("Saved");
    } catch (e) {
      setError(e?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-user h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Personal Information</span>
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-mail h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span>Email Address</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address cannot be changed as it's used for account identification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-map-pin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Home Address</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      name="zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="ZIP Code"
                      className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-save h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                  <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                </svg>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// File: components/PatientPortal/Settings.jsx
// "use client";
// import { useState, useEffect } from "react";

// export default function ProfileForm() {
//   const userId = 1; 
//   const API_BASE = "http://localhost:8000"; // ✅ adjust if backend runs elsewhere

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dob: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);

//   // ------------------ FETCH DATA ------------------
//   useEffect(() => {
//     async function fetchPatient() {
//       try {
//         const res = await fetch(`${API_BASE}/patients/${userId}`);
//         if (!res.ok) throw new Error("Failed to fetch patient data");
//         const data = await res.json();

//         // Map backend fields to frontend formData
//         setFormData({
//           firstName: data.first_name || "",
//           lastName: data.last_name || "",
//           email: data.email || "",
//           dob: data.dob || "",
//           phone: data.phone || "",
//           street: data.street || "",
//           city: data.city || "",
//           state: data.state || "",
//           zip: data.zip || "",
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPatient();
//   }, [userId]);

//   // ------------------ HANDLE INPUT ------------------
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ------------------ SUBMIT UPDATE ------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError(null);

//     try {
//       const res = await fetch(`${API_BASE}/patients/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           dob: formData.dob,
//           phone: formData.phone,
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           zip: formData.zip,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update patient profile");
//       const updated = await res.json();
//       console.log("✅ Updated:", updated);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Profile Settings
//           </h1>
//           <p className="text-gray-600">
//             Update your personal information and preferences
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-xl shadow-lg overflow-hidden"
//         >
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
//               <span>Personal Information</span>
//             </h2>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* First & Last Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   First Name
//                 </label>
//                 <input
//                   name="firstName"
//                   type="text"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Enter your first name"
//                   className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   name="lastName"
//                   type="text"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Enter your last name"
//                   className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                 />
//               </div>
//             </div>

//             {/* Email (disabled) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 disabled
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
//               />
//             </div>

//             {/* DOB + Phone */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date of Birth
//                 </label>
//                 <input
//                   name="dob"
//                   type="date"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                   className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 Home Address
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Street Address
//                   </label>
//                   <input
//                     name="street"
//                     type="text"
//                     value={formData.street}
//                     onChange={handleChange}
//                     className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     name="city"
//                     type="text"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                   />
//                   <input
//                     name="state"
//                     type="text"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                   />
//                   <input
//                     name="zip"
//                     type="text"
//                     value={formData.zip}
//                     onChange={handleChange}
//                     placeholder="ZIP Code"
//                     className="w-full text-black border border-gray-300 rounded-lg px-4 py-3"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border-t border-gray-200 bg-gray-50">
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className={`px-6 py-3 rounded-lg font-medium text-white ${
//                   saving
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
