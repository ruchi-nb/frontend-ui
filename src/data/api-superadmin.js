import { request } from './api.js';

// =============================================
// SUPER ADMIN APIs
// =============================================

/**
 * Get superadmin profile
 */
export function getSuperAdminProfile() {
  return request("/superadmin/profile", { method: "GET" });
}

/**
 * Onboard hospital with admin
 */
export function onboardHospitalAdmin(payload) {
  return request("/superadmin/onboard/hospital_admin", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

/**
 * Create user for hospital (doctor/patient)
 */
export function createUserForHospital(hospitalId, payload) {
  return request(`/superadmin/hospitals/${hospitalId}/users`, {
    method: "POST", 
    body: JSON.stringify(payload)
  });
}

