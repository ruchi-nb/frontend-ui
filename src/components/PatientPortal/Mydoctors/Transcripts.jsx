"use client";
import React, { useState } from 'react';
import PatientCard from '../../DoctorPortal/home/PatientCard';
import TranscriptModal from '../../DoctorPortal/home/TranscriptModal';
import { patients } from '../../DoctorPortal/data/patients';

const ConsultationHistory = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState('all');
  const [consultationSpecialtyFilter, setConsultationSpecialtyFilter] = useState('all');

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Extract unique specialties from patients data
  const specialties = ['all'];
  
  patients.forEach(patient => {
    if (!specialties.includes(patient.specialty)) {
      specialties.push(patient.specialty);
    }
  });

  // Filter doctors who have transcripts available
  const doctorsWithTranscripts = patients.filter(patient => 
    patient.transcriptCount > 0
  );

  // Filter doctors based on selected filters
  const filteredDoctors = doctorsWithTranscripts.filter(doctor => {
    const matchesSpecialty = doctorSpecialtyFilter === 'all' || doctor.specialty === doctorSpecialtyFilter;
    return matchesSpecialty;
  });

  // Filter consultations based on selected filters
  const filteredConsultations = patients.filter(patient => {
    const matchesSpecialty = consultationSpecialtyFilter === 'all' || patient.specialty === consultationSpecialtyFilter;
    return matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My History</h1>
        </div>
        
        {/* Doctors with transcripts section */}
        {doctorsWithTranscripts.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Doctors</h2>
              
              {/* Doctors filter options */}
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col">
                  <label htmlFor="doctor-specialty-filter" className="text-sm font-medium text-black mb-1">
                    Specialty
                  </label>
                  <select
                    id="doctor-specialty-filter"
                    value={doctorSpecialtyFilter}
                    onChange={(e) => setDoctorSpecialtyFilter(e.target.value)}
                    className="border border-gray-300 text-black rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl shadow-lg">
                <p className="text-gray-500 text-lg">No doctors match your selected filters.</p>
                <button
                  onClick={() => {
                    setDoctorSpecialtyFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 text-center">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 text-center">{doctor.specialty}</p>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => openModal(doctor)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mr-2">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" x2="8" y1="13" y2="13"/>
                          <line x1="16" x2="8" y1="17" y2="17"/>
                          <line x1="10" x2="8" y1="9" y2="9"/>
                        </svg>
                        View Transcript
                      </button>
                      <button
                        onClick={() => console.log('Consult again with:', doctor.name)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video mr-2">
                          <path d="m22 8-6 4 6 4V8Z"/>
                          <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                        </svg>
                        Consult Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Consultations section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Consultations</h2>
            
            {/* Consultations filter options */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label htmlFor="consultation-specialty-filter" className="text-sm font-medium text-black mb-1">
                  Specialty
                </label>
                <select
                  id="consultation-specialty-filter"
                  value={consultationSpecialtyFilter}
                  onChange={(e) => setConsultationSpecialtyFilter(e.target.value)}
                  className="border border-gray-300 text-black rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Main consultation history */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No consultations match your selected filters.</p>
                <button
                  onClick={() => {
                    setConsultationSpecialtyFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredConsultations.map(patient => (
                <PatientCard 
                  key={patient.id}
                  name={patient.name}
                  specialty={patient.specialty}
                  reason={patient.reason}
                  date={patient.date}
                  time={patient.time}
                  transcriptCount={patient.transcriptCount}
                  transcript={patient.transcript}
                  onViewTranscript={() => openModal(patient)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Transcript Modal */}
      <TranscriptModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default ConsultationHistory;