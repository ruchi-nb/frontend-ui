"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/DoctorPortal/Navbar";
import DashboardHeader from "@/components/DoctorPortal/home/DashboardHeader";
import StatCard from "@/components/DoctorPortal/home/StatCards";
import { patients } from "@/components/DoctorPortal/data/patients";
import TranscriptModal from "@/components/DoctorPortal/home/TranscriptModal";
import PatientCard from "@/components/DoctorPortal/home/PatientCard";

// Import Lucide React icons
import { User, FileText, Layers } from "lucide-react";

export default function DoctorPortalPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const user = { name: "Emily Chen", firstLogin: true };

  const specialties = useMemo(
    () => ["All", ...new Set(patients.map((p) => p.specialty))],
    []
  );

  const filteredPatients =
    selectedSpecialty === "All"
      ? patients
      : patients.filter((p) => p.specialty === selectedSpecialty);

  // Dynamically calculate stats
  const stats = useMemo(
    () => [
      {
        title: "Total Patients",
        value: patients.length,
        icon: User,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: "Total Transcripts",
        value: patients.reduce(
          (sum, p) => sum + (p.transcripts?.length || 0),
          0
        ),
        icon: FileText,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        title: "Specialties",
        value: specialties.length - 1,
        icon: Layers,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
    ],
    [patients, specialties]
  );

  return (
    <div className="p-16 min-h-screen overflow-hidden">
      <Navbar />
      <DashboardHeader user={user} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Patients List */}
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Patients ({filteredPatients.length})
          </h2>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Render Patient Cards */}
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            {...patient}
            onViewTranscript={() => setSelectedPatient(patient)}
          />
        ))}

        {/* Transcript Modal */}
        <TranscriptModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patient={selectedPatient || {}}
        />
      </div>
    </div>
  );
}
