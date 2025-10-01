'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'

export default function FormHeader() {
  return (
    <div className="flex items-center space-x-4 mb-8">
        <button className="p-2 text-zinc-800 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
        <p className="text-gray-600 mt-2">
          Create a new AI doctor avatar for your platform
        </p>
      </div>
    </div>
  );
}
