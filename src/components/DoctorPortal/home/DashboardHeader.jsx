"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ import useRouter

const DashboardHeader = ({ user }) => {
  const router = useRouter(); // ✅ initialize router

  // State to track if first login (can also come from user data)
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    // Example: Check a user property to determine first login
    if (user?.firstLogin) {
      setIsFirstLogin(true);
    }
  }, [user]);

  const handleSetupClick = () => {
    router.push("/doctorportal/setup/Step1"); // ✅ navigate to SetupModal1 page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hi, {user?.name || "Dr. Doctor"}, welcome to your dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              6 patients • 3 transcripts available
            </p>
          </div>

          {isFirstLogin && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleSetupClick} // ✅ added click handler
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
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
                  className="lucide lucide-settings h-5 w-5 mr-2"
                  aria-hidden="true"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
