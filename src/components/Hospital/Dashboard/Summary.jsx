"use client";

import React from 'react';

const Dashboard = () => {
  // Sample data for the weekly usage
  const weeklyData = [
    { day: 'Mon', consultations: 120, doctors: 18, percentage: '66.6667%' },
    { day: 'Tue', consultations: 145, doctors: 20, percentage: '80.5556%' },
    { day: 'Wed', consultations: 165, doctors: 22, percentage: '91.6667%' },
    { day: 'Thu', consultations: 140, doctors: 19, percentage: '77.7778%' },
    { day: 'Fri', consultations: 180, doctors: 24, percentage: '100%' },
    { day: 'Sat', consultations: 95, doctors: 15, percentage: '52.7778%' },
    { day: 'Sun', consultations: 85, doctors: 12, percentage: '47.2222%' }
  ];

  // Sample data for recent activity
  const activities = [
    {
      icon: 'user-plus',
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'Dr. Emily Chen was successfully onboarded',
      time: '2 hours ago'
    },
    {
      icon: 'message-square',
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      title: 'Dr. Rodriguez completed 15 consultations today',
      time: '4 hours ago'
    },
    {
      icon: 'credit-card',
      iconColor: 'text-slate-600',
      bgColor: 'bg-slate-50',
      title: 'Monthly subscription payment processed successfully',
      time: '6 hours ago'
    },
    {
      icon: 'settings',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: 'Avatar response time improved by 15%',
      time: '8 hours ago'
    },
    {
      icon: 'shield',
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'HIPAA compliance audit completed successfully',
      time: '1 day ago'
    },
  ];

  // Function to render the correct SVG icon
  const renderIcon = (iconName, className) => {
    switch (iconName) {
      case 'trending-up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M16 7h6v6"></path>
            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
        );
      case 'user-plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" x2="19" y1="8" y2="14"></line>
            <line x1="22" x2="16" y1="11" y2="11"></line>
          </svg>
        );
      case 'message-square':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'credit-card':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 极 4.5-1.2 6.24-2.72a1.17 1.17 极 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 极 1 1z"></path>
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Weekly Usage Overview */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Weekly Usage Overview</h3>
              <p className="text-sm text-slate-600">Consultations and active doctors this week</p>
            </div>
            <div className="flex items-center space-x-2 text-teal-600">
              {renderIcon('trending-up', 'h-4 w-4')}
              <span className="text-sm font-medium">+12% vs last week</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((dayData, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-slate-600">{dayData.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700">Consultations</span>
                    <span className="text-sm font-medium text-slate-900">{dayData.consultations}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: dayData.percentage }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <div className="text-xs text-slate-500">Doctors</div>
                  <div className="text-sm font-medium text-slate-900">{dayData.doctors}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">1,030</div>
                <div className="text-xs text-slate-500">Total Consultations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">24</div>
                <div className="text-xs text-slate-500">Active Doctors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${activity.iconColor} ${activity.bgColor}`}>
                  {renderIcon(activity.icon, 'h-4 w-4')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;