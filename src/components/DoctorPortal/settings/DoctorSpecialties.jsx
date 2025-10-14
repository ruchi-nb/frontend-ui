import React, { useState, useEffect } from 'react';
import { getDoctorSpecialties, setDoctorSpecialties, listSpecialities } from '@/data/api';
import { Plus, X, Check } from 'lucide-react';

const DoctorSpecialties = ({ isEditing }) => {
  const [currentSpecialties, setCurrentSpecialties] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [doctorSpecs, allSpecs] = await Promise.all([
          getDoctorSpecialties(),
          listSpecialities(1) // Using hospital_id=1 as default
        ]);
        setCurrentSpecialties(doctorSpecs || []);
        setAvailableSpecialties(allSpecs || []);
      } catch (error) {
        console.error("Failed to load specialties:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddSpecialty = async (specialtyId) => {
    if (currentSpecialties.some(s => s.specialty_id === specialtyId)) return;
    
    setSaving(true);
    try {
      const newSpecialtyIds = [...currentSpecialties.map(s => s.specialty_id), specialtyId];
      const updatedSpecialties = await setDoctorSpecialties(newSpecialtyIds);
      setCurrentSpecialties(updatedSpecialties || []);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add specialty:", error);
      alert("Failed to add specialty. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveSpecialty = async (specialtyId) => {
    setSaving(true);
    try {
      const newSpecialtyIds = currentSpecialties
        .filter(s => s.specialty_id !== specialtyId)
        .map(s => s.specialty_id);
      const updatedSpecialties = await setDoctorSpecialties(newSpecialtyIds);
      setCurrentSpecialties(updatedSpecialties || []);
    } catch (error) {
      console.error("Failed to remove specialty:", error);
      alert("Failed to remove specialty. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const availableToAdd = availableSpecialties.filter(
    spec => !currentSpecialties.some(current => current.specialty_id === spec.specialty_id)
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="opacity-50">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Medical Specialties</h2>
        {isEditing && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Specialty</span>
          </button>
        )}
      </div>

      {/* Current Specialties */}
      <div className="space-y-3 mb-6">
        {currentSpecialties.length > 0 ? (
          currentSpecialties.map((specialty) => (
            <div
              key={specialty.specialty_id}
              className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{specialty.name}</h3>
                {specialty.description && (
                  <p className="text-sm text-gray-600">{specialty.description}</p>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSpecialty(specialty.specialty_id)}
                  disabled={saving}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                  title="Remove specialty"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No specialties assigned yet.</p>
            {isEditing && (
              <p className="text-sm mt-1">Click "Add Specialty" to get started.</p>
            )}
          </div>
        )}
      </div>

      {/* Add Specialty Form */}
      {showAddForm && isEditing && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Specialty</h3>
          {availableToAdd.length > 0 ? (
            <div className="space-y-2">
              {availableToAdd.map((specialty) => (
                <div
                  key={specialty.specialty_id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{specialty.name}</h4>
                    {specialty.description && (
                      <p className="text-sm text-gray-600">{specialty.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddSpecialty(specialty.specialty_id)}
                    disabled={saving}
                    className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded transition-colors"
                    title="Add specialty"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              All available specialties have been added.
            </p>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {saving && (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Saving...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSpecialties;
