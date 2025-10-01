'use client';

import { useState } from 'react';
import InvertedGradientButton from '@/components/common/InvertedGradientButton';
import { Trash2, Plus, Play, Mic, Star } from 'lucide-react';

export default function VoiceSamples({ isEditing }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [voiceSamples, setVoiceSamples] = useState([
    {
      id: '1',
      name: 'Primary Voice',
      language: 'en-US',
      isPrimary: true
    }
  ]);

  const handleAddVoice = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  const handleDeleteVoice = (id) => {
    setVoiceSamples(voiceSamples.filter(sample => sample.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl flex justify-center gap-2 font-semibold text-gray-900">
          <Mic className='w-6 h-7 text-black'/>
          Voice Samples
        </h2>
        <InvertedGradientButton
          onClick={handleAddVoice}
          color='blue'
        >
          <Plus className='w-6 h-6 text-blue'/>
          Add Voice
        </InvertedGradientButton>
      </div>

      <div className="space-y-4 mb-6">
        {voiceSamples.map((sample) => (
          <div key={sample.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {sample.isPrimary && (
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  )}
                  <h3 className="font-medium text-gray-900">{sample.name}</h3>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  {sample.language}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <InvertedGradientButton 
                color='green'
                >
                  <Play className="w-6 h-6 text-green"/>
                  Play
                </InvertedGradientButton>
                {isEditing && (
                  <InvertedGradientButton
                    onClick={() => handleDeleteVoice(sample.id)}
                    color='red'
                  >
                    <Trash2 className='w-6 h-6 text-red'/>
                    Delete
                  </InvertedGradientButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add New Voice Sample
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Name *
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Primary Voice, Meeting Voice"
                type="text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="lucide lucide-globe h-4 w-4 inline mr-2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                Language *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Sample *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  className="lucide lucide-mic h-8 w-8 text-gray-400 mx-auto mb-2"
                  aria-hidden="true"
                >
                  <path d="M12 19v3"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <rect x="9" y="2" width="6" height="13" rx="3"></rect>
                </svg>
                <div className="space-x-2">
                  <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
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
                      className="lucide lucide-mic h-4 w-4 mr-2"
                      aria-hidden="true"
                    >
                      <path d="M12 19v3"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <rect x="9" y="2" width="6" height="13" rx="3"></rect>
                    </svg>
                    Record Voice
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
                      className="lucide lucide-upload h-4 w-4 mr-2"
                      aria-hidden="true"
                    >
                      <path d="M12 3v12"></path>
                      <path d="m17 8-5-5-5 5"></path>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    </svg>
                    Upload Audio
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Record or upload a voice sample for recognition
                </p>
              </div>
              <input accept="audio/*" className="hidden" type="file" />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Voice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}