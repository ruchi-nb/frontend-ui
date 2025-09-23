// File: app/patientportal/consult/page.jsx
"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { doctors } from '@/data/doctors';
import Consult from '@/components/PatientPortal/home/Consult';

export default function ConsultPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor = doctors.find(d => d.id === doctorId);
      setDoctor(foundDoctor);
    }
    setLoading(false);
  }, [doctorId]);

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading consultation...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h2>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return <Consult doctor={doctor} onBack={handleBack} />;
}