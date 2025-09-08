"use client";

import { 
  Building2, 
  CheckCircle2, 
  UserCog, 
  Bot
} from "lucide-react";

const Overview = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Hospitals */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-1">Total Hospitals</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">8</p>
              <p className="text-sm font-medium text-slate-600"># hospitals onboarded</p>
            </div>
            <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Active Hospitals */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-1">Active Hospitals</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">6</p>
              <p className="text-sm font-medium text-slate-600"># hospitals active</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-1">Total Doctors</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">65</p>
              <p className="text-sm font-medium text-slate-600"># doctors registered</p>
            </div>
            <div className="p-3 rounded-lg bg-sky-50 text-sky-600">
              <UserCog className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Active Avatars */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-1">Active Avatars</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">73</p>
              <p className="text-sm font-medium text-slate-600"># avatars live</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Bot className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
