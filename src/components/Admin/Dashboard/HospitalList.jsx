"use client";

import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const HospitalList = () => {
    const router = useRouter();
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Sunrise IVF Clinic",
      type: "Fertility & IVF",
      location: "Mumbai, Maharashtra",
      contact: "info@sunriseivf.com",
      doctors: 18,
      status: "Active",
    },
    {
      id: 2,
      name: "Nova HealthCare",
      type: "Multi-specialty",
      location: "Bengaluru, Karnataka",
      contact: "contact@novahealth.in",
      doctors: 12,
      status: "Suspended",
    },
    {
      id: 3,
      name: "Metro Hospital",
      type: "General Hospital",
      location: "Delhi, NCR",
      contact: "metrocare@gmail.com",
      doctors: 25,
      status: "Active",
    },
    {
      id: 4,
      name: "City Care Medical",
      type: "Emergency Care",
      location: "Chennai, Tamil Nadu",
      contact: "info@citycare.com",
      doctors: 15,
      status: "Active",
    },
    {
      id: 5,
      name: "Wellness Hospital",
      type: "Wellness & Preventive",
      location: "Pune, Maharashtra",
      contact: "contact@wellness.in",
      doctors: 20,
      status: "Active",
    },
  ]);

  const deleteHospital = (id) => {
    setHospitals(hospitals.filter((h) => h.id !== id));
  };

  return (
    <div className="hospital-section bg-white rounded-xl shadow p-6">
      {/* Section Header */}
      <div className="section-header mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Hospital List</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left text-sm font-semibold text-slate-700">
              <th className="px-4 py-3">Hospital Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Doctors</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr
                key={hospital.id}
                className="border-b last:border-0 hover:bg-slate-50 transition-colors"
              >
                {/* Hospital Name + Type */}
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">
                    {hospital.name}
                  </div>
                  <div className="text-xs text-slate-500">{hospital.type}</div>
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-sm text-slate-700">
                  {hospital.location}
                </td>

                {/* Contact */}
                <td className="px-4 py-3 text-sm text-slate-700">
                  {hospital.contact}
                </td>

                {/* Doctors */}
                <td className="px-4 py-3 text-sm text-slate-700">
                  {hospital.doctors}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hospital.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {hospital.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <button onClick={() => router.push(`/admin/management`)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button
                    onClick={() => deleteHospital(hospital.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalList;
