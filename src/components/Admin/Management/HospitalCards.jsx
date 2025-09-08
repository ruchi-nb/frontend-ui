"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import hospitalsData from "@/components/Admin/Management/data/hospital";
import ViewModal from "./ViewModal";
import EditHospitalModal from "./EditModal";

export default function HospitalCards() {
  const [hospitals, setHospitals] = useState(hospitalsData); // Local state for dynamic updates
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirm) return;
    setHospitals((prev) => prev.filter((h) => h.id !== id));
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setIsEditOpen(true);
  };

  const handleView = (hospital) => {
    setSelectedHospital(hospital);
    setIsViewOpen(true);
  };

  // Callback to update hospital after editing
  const handleUpdateHospital = (updatedHospital) => {
    setHospitals((prev) =>
      prev.map((h) => (h.id === updatedHospital.id ? updatedHospital : h))
    );
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
          >
            {/* Status */}
            <div
              className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
                hospital.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              ● {hospital.status}
            </div>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${hospital.color}`}
              >
                {hospital.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{hospital.name}</h3>
                <p className="text-sm text-slate-500">{hospital.specialty}</p>
                <p className="text-xs text-slate-400">{hospital.email}</p>
              </div>
            </div>

            {/* Location */}
            <p className="mt-3 text-sm text-slate-600">📍 {hospital.location}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <p className="text-sm text-slate-500">Doctors</p>
                <p className="text-base font-semibold text-slate-800">{hospital.doctors}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Consultations</p>
                <p className="text-base font-semibold text-slate-800">{hospital.consultations}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="text-xs font-medium text-slate-700">{hospital.phone}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleView(hospital)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                onClick={() => handleEdit(hospital)}
                className="flex items-center gap-1 text-amber-500 hover:text-amber-700 text-sm font-medium"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(hospital.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ViewModal
        hospital={selectedHospital}
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
      />

      <EditHospitalModal
        hospital={selectedHospital}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={handleUpdateHospital}
      />
    </>
  );
}
