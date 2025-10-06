"use client";
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CheckCircle, XCircle, AlertCircle, User, Shield, Building2, Stethoscope } from 'lucide-react';
import { useUser } from '@/data/UserContext';
import { checkBackendHealth } from '@/data/api';

const StatusIndicator = ({ className = '' }) => {
  const { user, loading, error, isAuthenticated, getUserRole } = useUser();
  const [connectionStatus, setConnectionStatus] = useState('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isHealthy = await checkBackendHealth();
        setConnectionStatus(isHealthy ? 'connected' : 'error');
      } catch {
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Checking...';
    }
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getRoleIcon = () => {
    const role = getUserRole();
    switch (role) {
      case 'superadmin':
        return <Shield className="w-4 h-4 text-purple-500" />;
      case 'hospital_admin':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      case 'doctor':
        return <Stethoscope className="w-4 h-4 text-green-500" />;
      case 'patient':
        return <User className="w-4 h-4 text-gray-500" />;
      default:
        return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleText = () => {
    const role = getUserRole();
    switch (role) {
      case 'superadmin':
        return 'Super Admin';
      case 'hospital_admin':
        return 'Hospital Admin';
      case 'doctor':
        return 'Doctor';
      case 'patient':
        return 'Patient';
      default:
        return 'Guest';
    }
  };

  const getAuthStatus = () => {
    if (loading) return { icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, text: 'Loading...', color: 'text-yellow-600' };
    if (error) return { icon: <XCircle className="w-4 h-4 text-red-500" />, text: 'Error', color: 'text-red-600' };
    if (isAuthenticated()) return { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: 'Authenticated', color: 'text-green-600' };
    return { icon: <XCircle className="w-4 h-4 text-gray-400" />, text: 'Not Authenticated', color: 'text-gray-600' };
  };

  const authStatus = getAuthStatus();

  return (
    <div className={`flex items-center space-x-4 text-sm ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center space-x-1">
        {getConnectionIcon()}
        <span className={getConnectionColor()}>{getConnectionText()}</span>
      </div>

      {/* Authentication Status */}
      <div className="flex items-center space-x-1">
        {authStatus.icon}
        <span className={authStatus.color}>{authStatus.text}</span>
      </div>

      {/* User Role */}
      {isAuthenticated() && (
        <div className="flex items-center space-x-1">
          {getRoleIcon()}
          <span className="text-gray-600">{getRoleText()}</span>
        </div>
      )}

      {/* User Info */}
      {isAuthenticated() && user && (
        <div className="flex items-center space-x-1">
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{user.username || user.email}</span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
