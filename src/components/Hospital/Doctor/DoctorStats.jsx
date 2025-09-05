"use client";

import React from "react";
import { User, Book, Globe } from "lucide-react";
import { doctors } from "@/components/PatientPortal/home/data/doctors"; // use relative path to your file

const StatsCard = ({ icon: Icon, bgColor, iconColor, label, value }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center space-x-3">
      <div className={`p-2 ${bgColor} rounded-lg`}>
        <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const DoctorStats = () => {
  if (!doctors || doctors.length === 0) return null; // fallback

  const totalDoctors = doctors.length;
  const totalConsultations = doctors.reduce(
    (sum, doc) => sum + Number(doc.consultations || 0),
    0
  );
  const uniqueLanguages = [
    ...new Set(
      doctors.flatMap((doc) =>
        doc.languages.split(",").map((lang) => lang.trim())
      )
    ),
  ].length;

  const statsData = [
    {
      icon: User,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      label: "Total Doctors",
      value: totalDoctors,
    },
    {
      icon: Book,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      label: "Total Consultations",
      value: totalConsultations,
    },
    {
      icon: Globe,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      label: "Languages Spoken",
      value: uniqueLanguages,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default DoctorStats;
