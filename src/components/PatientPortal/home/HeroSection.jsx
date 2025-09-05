// File: components/PatientPortal/home/HeroSection.jsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleFindSpecialty = () => {
    const specialtiesSection = document.getElementById('specialties-section');
    if (specialtiesSection) {
      specialtiesSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleFindDoctor = () => {
    router.push('/patientportal/doctors');
  };

  return (
    <div className="h-auto min-h-[500px] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hi, <span className="text-blue-600">Sarah</span>, how do we get started today?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with qualified healthcare professionals from the comfort of your home. Quality care is just a click away.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              id="btn-specialty"
              onClick={handleFindSpecialty}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Find My Specialty</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-down h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </button>
            <button
              id="btn-doctor"
              onClick={handleFindDoctor}
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search h-5 w-4"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              <span>Find My Doctor</span>
            </button>
          </div>
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-down h-6 w-6 text-gray-400 mx-auto"
              aria-hidden="true"
              >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;