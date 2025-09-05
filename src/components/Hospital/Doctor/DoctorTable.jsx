'use client';

import React from "react";
import {
  Mail,
  Phone,
  SquarePen,
  Pause,
  Trash2,
} from "lucide-react";

const DoctorTable = ({ doctors, onView, onPause, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-900">
                Doctor
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">
                Specialty
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">
                Languages
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">
                Consultations
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {/* Doctor Info */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {doctor.initials}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {doctor.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{doctor.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{doctor.phone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Specialty */}
                <td className="py-4 px-6 text-gray-900">
                  {doctor.specialty}
                </td>

                {/* Languages */}
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Consultations */}
                <td className="py-4 px-6 text-gray-900 font-medium">
                  {doctor.consultations}
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onView?.(doctor)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onPause?.(doctor)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Pause"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(doctor)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;
