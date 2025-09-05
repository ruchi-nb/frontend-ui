"use client";
import Image from "next/image";
import { useState } from "react";

// Moved specialties data inside component to avoid import issues
const specialties = {
  Cardiology: {
    description: "Heart and cardiovascular system specialists",
    longDescription: "Our cardiology department specializes in the diagnosis and treatment of heart conditions. Our team of experts provides comprehensive care for all cardiovascular issues, from preventive consultations to complex surgical interventions.",
    doctors: [
      {
        name: "Dr. Sarah Johnson",
        role: "Cardiologist",
        experience: "15 years",
        img: "/doctor1.jpg",
        active: true
      },
      {
        name: "Dr. Michael Chen",
        role: "Cardiac Surgeon",
        experience: "12 years",
        img: "/doctor2.jpg",
        active: true
      }
    ]
  },
  Dermatology: {
    description: "Skin, hair, and nail condition experts",
    longDescription: "Our dermatologists provide expert care for all skin conditions, from acne to skin cancer. We offer both medical and cosmetic treatments using the latest technologies.",
    doctors: [
      {
        name: "Dr. Emily Rodriguez",
        role: "Dermatologist",
        experience: "10 years",
        img: "/doctor3.jpg",
        active: true
      }
    ]
  },
  Neurology: {
    description: "Brain and nervous system specialists",
    longDescription: "Our neurology department offers comprehensive care for disorders of the brain, spinal cord, and nerves. We specialize in conditions like epilepsy, stroke, multiple sclerosis, and Parkinson's disease.",
    doctors: [
      {
        name: "Dr. James Wilson",
        role: "Neurologist",
        experience: "18 years",
        img: "/doctor4.jpg",
        active: false
      }
    ]
  },
  Pediatrics: {
    description: "Healthcare for children and adolescents",
    longDescription: "Our pediatricians provide compassionate care for patients from birth through adolescence. We focus on preventive care, developmental screenings, and treatment of childhood illnesses.",
    doctors: [
      {
        name: "Dr. Lisa Thompson",
        role: "Pediatrician",
        experience: "14 years",
        img: "/doctor5.jpg",
        active: true
      }
    ]
  },
  Orthopedics: {
    description: "Bone, joint, and muscle specialists",
    longDescription: "Our orthopedic specialists diagnose and treat conditions affecting the musculoskeletal system. We offer both surgical and non-surgical treatments for injuries and chronic conditions.",
    doctors: [
      {
        name: "Dr. Robert Kim",
        role: "Orthopedic Surgeon",
        experience: "16 years",
        img: "/doctor6.jpg",
        active: true
      }
    ]
  },
  Psychiatry: {
    description: "Mental health and behavioral specialists",
    longDescription: "Our psychiatry team provides compassionate care for mental health conditions. We offer therapy, medication management, and innovative treatments for depression, anxiety, and other disorders.",
    doctors: [
      {
        name: "Dr. Amanda Lewis",
        role: "Psychiatrist",
        experience: "11 years",
        img: "/doctor7.jpg",
        active: true
      }
    ]
  }
};

const SpecialtiesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const openSpecialtyModal = (specialtyName) => {
    const specialty = specialties[specialtyName];
    if (!specialty) return;

    setShowLanguage(false);
    setModalContent(
      <div className="max-h-[70vh] overflow-y-auto">
        <h2 className="text-2xl text-black font-bold mb-4">{specialtyName}</h2>
        <p className="mb-6 text-gray-700">{specialty.longDescription}</p>
        <h3 className="text-xl text-black font-semibold mb-4 border-b pb-2">Available Doctors</h3>
        <div className="space-y-6">
          {specialty.doctors.map((doc, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start justify-between p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4 sm:mb-0 sm:mr-4 flex-1">
                <h4 className="font-semibold text-gray-900 text-lg">{doc.name}</h4>
                <p className="text-gray-600">{doc.role}</p>
                <p className="text-gray-600 text-sm mt-1">{doc.experience} of experience</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${doc.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
                <button
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm transition-colors"
                  onClick={() => setShowLanguage(true)}
                  disabled={!doc.active}
                >
                  {doc.active ? "Start Consultation" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const renderLanguageModal = () => (
    <div>
      <h2 className="text-2xl text-black font-bold mb-4">Select Language</h2>
      <p className="mb-4 text-gray-600">Please select your preferred language for the consultation:</p>
      <select 
        className="w-full text-gray-700 border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="pt">🇵🇹 Portuguese</option>
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
        <option value="zh">🇨🇳 Mandarin</option>
        <option value="hi">🇮🇳 Hindi</option>
        <option value="gu">🇮🇳 Gujarati</option>
        <option value="kr">🇰🇷 Korean</option>
      </select>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          onClick={() => setShowLanguage(false)}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          onClick={() => { 
            alert(`Consultation started in ${selectedLanguage.toUpperCase()}!`); 
            setModalOpen(false); 
          }}
        >
          Confirm and Proceed
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section id="specialties-section" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Medical Specialty
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of medical specialties and connect with expert doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(specialties).map((name, index) => (
              <div
                key={index}
                onClick={() => openSpecialtyModal(name)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {name}
                  </h3>
                  <p className="text-gray-600 mb-4">{specialties[name].description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>View Specialists</span>
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
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 overflow-y-auto">
              {showLanguage ? renderLanguageModal() : modalContent}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialtiesSection;