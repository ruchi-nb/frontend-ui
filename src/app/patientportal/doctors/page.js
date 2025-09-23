// File: app/patientportal/doctors/page.js
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import DoctorListing from '@/components/PatientPortal/home/DoctorModal';
import { MoveRight } from 'lucide-react';

export default function DoctorsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/patientportal');
  };

  return (
    <div className="pt-16 mt-10 bg-[#b9d0f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 font-semibold text-lg sm:text-xl mb-4"
        >
          <MoveRight className="transform rotate-180 text-[#fbbf24]" />
          <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#fcd34d] hover:to-[#d97706] bg-clip-text text-transparent">
            Back to Dashboard
          </span>
        </button>

      </div>
      <DoctorListing />
    </div>
  );
}