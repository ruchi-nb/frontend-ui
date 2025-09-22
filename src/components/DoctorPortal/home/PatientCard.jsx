"use client";

import React from "react";
import { jsPDF } from "jspdf";

const PatientCard = ({
  name,
  specialty,
  reason,
  date,
  time,
  transcriptCount,
  transcript, // array of { speaker: "Doctor" | "Patient", text: "..." }
  onViewTranscript,
}) => {
  // PDF download function
  const handleDownloadPdf = () => {
    if (!transcript || transcript.length === 0) return;

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Consultation Transcript", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Patient: ${name}`, 10, y);
    y += 6;
    doc.text(`Specialty: ${specialty}`, 10, y);
    y += 6;
    doc.text(`Date: ${date}`, 10, y);
    y += 6;
    doc.text(`Transcript Count: ${transcriptCount}`, 10, y);
    y += 10;

    transcript.forEach((entry) => {
      const text = `${entry.speaker}: ${entry.text}`;
      const splitText = doc.splitTextToSize(text, 180);

      // Set color based on speaker
      if (entry.speaker === "Doctor") {
        doc.setTextColor(0, 80, 200); // blue
      } else {
        doc.setTextColor(0, 150, 0); // green
      }

      doc.text(splitText, 10, y);
      y += splitText.length * 6;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    // Reset color to black
    doc.setTextColor(0, 0, 0);

    doc.save(`transcript-${name}.pdf`);
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-4 xl:space-y-0">
        {/* Patient Info */}
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
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
              className="lucide lucide-user h-6 w-6 text-blue-600"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {specialty}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{reason}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
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
                  className="lucide lucide-calendar h-4 w-4 mr-2"
                  aria-hidden="true"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                {date}
              </div>
              <div className="flex items-center">
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
                  className="lucide lucide-clock h-4 w-4 mr-2"
                  aria-hidden="true"
                >
                  <path d="M12 6v6l4 2"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                {time}
              </div>
              <div className="flex items-center">
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
                  className="lucide lucide-file-text h-4 w-4 mr-2"
                  aria-hidden="true"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                {transcriptCount} transcript{transcriptCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onViewTranscript}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              className="lucide lucide-file-text h-4 w-4 mr-2"
              aria-hidden="true"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            View Transcript
          </button>
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
                            className="lucide lucide-download h-4 w-4 mr-2"
                            aria-hidden="true">
                            <path d="M12 15V3"></path>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <path d="m7 10 5 5 5-5"></path>
                        </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
