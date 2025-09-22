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

  const specialties = ['all'];
  patients.forEach(patient => {
    if (!specialties.includes(patient.specialty)) {
      specialties.push(patient.specialty);
    }
  });

  const doctorsWithTranscripts = patients.filter(patient => patient.transcriptCount > 0);

  const filteredDoctors = doctorsWithTranscripts.filter(doctor => 
    doctorSpecialtyFilter === 'all' || doctor.specialty === doctorSpecialtyFilter
  );

  const filteredConsultations = patients.filter(patient => 
    consultationSpecialtyFilter === 'all' || patient.specialty === consultationSpecialtyFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">My History</h1>

        {/* Doctors Section */}
        {doctorsWithTranscripts.length > 0 && (
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-0">Doctors</h2>
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4">
                <div className="flex flex-col w-full xs:w-auto">
                  <label htmlFor="doctor-specialty-filter" className="text-sm font-medium text-black mb-1">
                    Specialty
                  </label>
                  <select
                    id="doctor-specialty-filter"
                    value={doctorSpecialtyFilter}
                    onChange={(e) => setDoctorSpecialtyFilter(e.target.value)}
                    className="w-full border border-gray-300 text-black rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div className="text-center py-6 md:py-8 bg-white rounded-xl shadow-lg">
                <p className="text-gray-500 text-base md:text-lg">No doctors match your selected filters.</p>
                <button
                  onClick={() => setDoctorSpecialtyFilter('all')}
                  className="mt-3 md:mt-4 px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <span className="text-xl md:text-2xl font-bold text-blue-600">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 text-center">{doctor.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600 text-center">{doctor.specialty}</p>
                    </div>
                    <div className="flex flex-col space-y-2 md:space-y-3">
                      <button
                        onClick={() => openModal(doctor)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 md:py-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base"
                      >
                        View Transcript
                      </button>
                      <button
                        onClick={() => console.log('Consult again with:', doctor.name)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 md:py-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base"
                      >
                        Consult Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Consultations Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-0">Consultations</h2>
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4">
              <div className="flex flex-col w-full xs:w-auto">
                <label htmlFor="consultation-specialty-filter" className="text-sm font-medium text-black mb-1">
                  Specialty
                </label>
                <select
                  id="consultation-specialty-filter"
                  value={consultationSpecialtyFilter}
                  onChange={(e) => setConsultationSpecialtyFilter(e.target.value)}
                  className="w-full border border-gray-300 text-black rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-500 text-base md:text-lg">No consultations match your selected filters.</p>
                <button
                  onClick={() => setConsultationSpecialtyFilter('all')}
                  className="mt-3 md:mt-4 px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base"
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

      <TranscriptModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default ConsultationHistory;