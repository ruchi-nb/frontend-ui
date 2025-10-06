"use client";

import React, { useState, useEffect } from "react";
import { User, Book, Globe } from "lucide-react";
import { listHospitalDoctors } from "@/data/api";
import { useUser } from "@/data/UserContext";

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
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function loadHospitalDoctors() {
      try {
        // Get hospital_id from user context
        const hospitalId = user?.hospital_id || user?.hospital_roles?.[0]?.hospital_id;
        
        if (!hospitalId) {
          console.error("No hospital ID found for user");
          setLoading(false);
          return;
        }

        const doctorsList = await listHospitalDoctors(hospitalId);
        setDoctors(doctorsList || []);
      } catch (error) {
        console.error("Failed to load hospital doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }

    // Only load if user is available
    if (user) {
      loadHospitalDoctors();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalDoctors = doctors.length;
  // For now, we'll use mock data for consultations since we don't have that data from the API yet
  const totalConsultations = doctors.length * 15; // Mock calculation
  const uniqueLanguages = 3; // Mock data

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
