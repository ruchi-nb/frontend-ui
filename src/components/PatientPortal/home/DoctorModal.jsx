// File: components/PatientPortal/home/DoctorModal.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doctors } from '@/components/PatientPortal/home/data/doctors';
import Consult from './Consult';

const DoctorCard = ({ doctor, onView, onConsult }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48">
        <img 
          alt={doctor.name} 
          className="w-full h-full object-cover" 
          src={doctor.image}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Available
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-4 w-4 mr-2" aria-hidden="true">
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
            <span className="text-sm">{doctor.specialty}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4 mr-2" aria-hidden="true">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span className="text-sm">{doctor.experience}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-4 w-4 mr-2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span className="text-sm">{doctor.languages}</span>
          </div>          
        </div>
        <div className="mb-4">
          <div className="flex items-start text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-4 w-4 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm">{doctor.hospitals}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => onView(doctor)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4" aria-hidden="true">
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>View</span>
          </button>
          <button 
            onClick={() => onConsult(doctor)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Consult
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorListing = () => {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Extract unique specialties and languages from doctors data
  const specialties = ['all'];
  const languages = ['all'];
  
  // Get unique specialties
  doctors.forEach(doctor => {
    if (!specialties.includes(doctor.specialty)) {
      specialties.push(doctor.specialty);
    }
  });
  
  // Get unique languages
  doctors.forEach(doctor => {
    const doctorLanguages = doctor.languages.split(',').map(lang => lang.trim());
    doctorLanguages.forEach(lang => {
      if (!languages.includes(lang)) {
        languages.push(lang);
      }
    });
  });
  
  // Sort languages alphabetically
  languages.sort();

  // Filter doctors based on selected filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    
    const doctorLanguages = doctor.languages.split(',').map(lang => lang.trim());
    const matchesLanguage = selectedLanguage === 'all' || doctorLanguages.includes(selectedLanguage);
    return matchesSpecialty && matchesLanguage;
  });

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConsultDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowConsultation(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleConsultFromModal = () => {
    if (selectedDoctor) {
      closeModal();
      setShowConsultation(true);
    }
  };

  const handleCloseConsultation = () => {
    setShowConsultation(false);
    setSelectedDoctor(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && (isModalOpen || showConsultation)) {
        if (showConsultation) {
          handleCloseConsultation();
        } else {
          closeModal();
        }
      }
    };

    if (isModalOpen || showConsultation) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, showConsultation]);

  return (
    <>
      {showConsultation ? (
        <div className="fixed inset-0 bg-white z-50">
          <Consult doctor={selectedDoctor} onBack={handleCloseConsultation} />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Doctors</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {/* Filter options */}
              <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="specialty-filter" className="text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <select
                      id="specialty-filter"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>
                          {specialty === 'all' ? 'All Specialties' : specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="language-filter" className="text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      id="language-filter"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {languages.map(language => (
                        <option key={language} value={language}>
                          {language === 'all' ? 'All Languages' : language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No doctors match your selected filters.</p>
                <button
                  onClick={() => {
                    setSelectedSpecialty('all');
                    setSelectedLanguage('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor, index) => (
                  <DoctorCard 
                    key={index} 
                    doctor={doctor} 
                    onView={handleViewDoctor}
                    onConsult={handleConsultDoctor}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isModalOpen && selectedDoctor && (
        <div 
          className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Doctor Profile</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-6">
                  <img 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-2">{selectedDoctor.name}</h1>
                    <p className="text-lg opacity-90">{selectedDoctor.specialty}</p>
                    <div className="flex items-center mt-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedDoctor.biography}</p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Education</h4>
                  <p className="text-gray-600 mb-6">{selectedDoctor.education}</p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Hospital Affiliations</h4>
                  <p className="text-gray-600 mb-6">{selectedDoctor.hospitals}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Details</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-5 w-5 text-blue-600">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <span className="text-gray-700">{selectedDoctor.experience}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-5 w-5 text-blue-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span className="text-gray-700">{selectedDoctor.languages}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-id-card h-5 w-5 text-blue-600">
                        <rect width="18" height="14" x="5" y="5" rx="2" ry="2"></rect>
                        <circle cx="9" cy="11" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                      <span className="text-gray-700">License: {selectedDoctor.license}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleConsultFromModal}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Start Consultation
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorListing;