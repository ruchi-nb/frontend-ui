"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";

const TranscriptModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  // State to track which transcript is currently selected
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const currentTranscript = patient?.transcripts?.[currentTranscriptIndex];

  const handleDownloadTxt = () => {
    if (!currentTranscript?.entries) return;

    let content = `Consultation Transcript\n`;
    content += `Patient: ${patient.name}\n`;
    content += `Specialty: ${patient.specialty}\n`;
    content += `Date: ${currentTranscript.date}\n`;
    content += `Transcript ID: ${currentTranscript.id}\n\n`;

    currentTranscript.entries.forEach((entry) => {
      content += `${entry.speaker}: ${entry.text}\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `transcript-${currentTranscript.id}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!currentTranscript?.entries) return;

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Consultation Transcript", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Patient: ${patient.name}`, 10, y);
    y += 6;
    doc.text(`Specialty: ${patient.specialty}`, 10, y);
    y += 6;
    doc.text(`Date: ${currentTranscript.date}`, 10, y);
    y += 6;
    doc.text(`Transcript ID: ${currentTranscript.id}`, 10, y);
    y += 10;

    currentTranscript.entries.forEach((entry) => {
      const text = `${entry.speaker}: ${entry.text}`;
      const splitText = doc.splitTextToSize(text, 180);

      if (entry.speaker === "Doctor") {
        doc.setTextColor(0, 80, 200);
      } else {
        doc.setTextColor(0, 150, 0);
      }

      doc.text(splitText, 10, y);
      y += splitText.length * 6;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.setTextColor(0, 0, 0);
    doc.save(`transcript-${currentTranscript.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user h-6 w-6 text-blue-600"
                viewBox="0 0 24 24"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Consultation Transcript
              </h2>
              <p className="text-sm text-gray-600">{patient.name}</p>
            </div>
          </div>

          {/* Dropdown to select transcript */}
          {patient?.transcripts?.length > 1 && (
            <select
              value={currentTranscriptIndex}
              onChange={(e) => setCurrentTranscriptIndex(Number(e.target.value))}
              className="text-black border border-gray-800 rounded-lg p-1 text-sm"
            >
              {patient.transcripts.map((t, index) => (
                <option key={t.id} value={index}>
                  {t.date} - {t.specialty}
                </option>
              ))}
            </select>
          )}

          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Transcript info */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <span>{currentTranscript?.date}</span>
          </div>
          <div className="flex items-center">{patient.specialty}</div>
          <div className="flex items-center">{currentTranscript?.duration}</div>
        </div>

        {/* Conversation content */}
        <div className="flex-1 overflow-y-auto p-6 prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {currentTranscript?.entries?.map((entry, index) => (
              <div key={index} className="mb-4">
                <div className="mb-3 flex items-start space-x-3">
                  <div
                    className={`p-1.5 rounded-full mt-1 ${
                      entry.speaker === "Doctor" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-user h-3 w-3 ${
                        entry.speaker === "Doctor"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <span
                      className={`font-semibold ${
                        entry.speaker === "Doctor"
                          ? "text-blue-700"
                          : "text-green-700"
                      }`}
                    >
                      {entry.speaker}:
                    </span>
                    <span className="ml-2">{entry.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Transcript ID: {currentTranscript?.id}
          </div>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleDownloadTxt}
            >
              Download TXT
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptModal;
