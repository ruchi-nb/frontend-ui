"use client";

import { useRouter } from "next/navigation";
  
const DoctorsManagementHeader = () => {
  const router = useRouter();
  
  const handleAddDoctor = () => {
    console.log('Add Doctor button clicked');
    router.push("/Hospital/addDoctor");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your AI doctor avatars and their configurations
        </p>
      </div>
      <button
        onClick={handleAddDoctor}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
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
          className="lucide lucide-plus h-4 w-4"
          aria-hidden="true"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        <span>Add Doctor</span>
      </button>
    </div>
  );
};

export default DoctorsManagementHeader;