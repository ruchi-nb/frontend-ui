// File: app/patientportal/doctors/page.js
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import DoctorListing from '@/components/PatientPortal/home/DoctorModal';
import Navbar from '@/components/PatientPortal/Navbar';

export default function DoctorsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/patientportal');
  };

  return (
    <div className="pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-5 w-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <span>Back to Dashboard</span>
        </button>
      </div>
      <DoctorListing />
    </div>
  );
}