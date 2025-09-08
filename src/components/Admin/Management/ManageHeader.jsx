"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddHospitalModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with actual hospital creation logic (API call)
    alert("Hospital added successfully!");
    closeModal();
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      {/* Left side - Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Hospital Management
        </h1>
        <p className="text-slate-600 mt-2">
        Manage hospitals and their information
        </p>
      </div>

      {/* Right side - Add Hospital Button */}
      <div>
        <button
          onClick={openModal}
          className="px-4 py-2 rounded-lg bg-teal-600 text-white font-medium shadow-sm hover:bg-teal-700 transition-colors"
        >
          + Add Hospital
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Add New Hospital
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    className="mt-1 text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="mt-1 text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="mt-1 text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Address *
                  </label>
                  <input
                    type="text"
                    className="mt-1 text-gray-700 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Subscription Plan *
                  </label>
                  <select
                    className="mt-1 text-gray-400 block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 focus:border-teal-500 focus:ring focus:ring-teal-200"
                    required
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
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700"
                >
                  Add Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
