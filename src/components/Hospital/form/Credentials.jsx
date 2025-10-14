"use client";
import { Key } from "lucide-react";

const Credentials = ({ 
  username, 
  password, 
  genMode, 
  loading, 
  onPasswordChange, 
  onGenModeChange, 
  onGeneratePassword 
}) => {
  const handleGeneratePassword = () => {
    if (onGeneratePassword) {
      onGeneratePassword();
    }
  };

  const handlePasswordChange = (e) => {
    if (onPasswordChange) {
      onPasswordChange(e.target.value);
    }
  };

  const handleGenModeChange = (e) => {
    if (onGenModeChange) {
      onGenModeChange(e.target.value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Key className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Login Credentials
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            readOnly
            placeholder="Auto-filled from email"
            className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input
            required
            type="text"
            placeholder="Click Generate or type your own"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generation Mode
          </label>
          <div className="flex items-center gap-2">
            <select
              value={genMode}
              onChange={handleGenModeChange}
              disabled={loading}
              className="flex-1 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="pattern">Name+Phone Pattern</option>
              <option value="random">Random Secure</option>
            </select>
            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;