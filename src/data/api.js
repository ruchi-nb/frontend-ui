// Enhanced API client with robust error handling and fallback logic
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
console.log("API_BASE:", API_BASE);
console.log("NEXT_PUBLIC_API_BASE env:", process.env.NEXT_PUBLIC_API_BASE);

// Token management with better error handling
function getStoredTokens() {
  if (typeof window === "undefined") return { accessToken: "", refreshToken: "" };
  try {
    const accessToken = localStorage.getItem("access_token") || "";
    const refreshToken = localStorage.getItem("refresh_token") || "";
    
    // Validate token format (basic check)
    const isValidAccessToken = accessToken && accessToken.split('.').length === 3;
    const isValidRefreshToken = refreshToken && refreshToken.split('.').length === 3;
    
    if (!isValidAccessToken || !isValidRefreshToken) {
      console.warn("❌ Invalid token format detected, clearing tokens");
      clearTokens();
      return { accessToken: "", refreshToken: "" };
    }
    
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Error reading tokens from localStorage:", error);
    return { accessToken: "", refreshToken: "" };
  }
}

function setStoredTokens(accessToken, refreshToken) {
  if (typeof window === "undefined") return;
  try {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      console.log("💾 Access token stored, length:", accessToken.length);
    }
    if (refreshToken !== undefined) {
      localStorage.setItem("refresh_token", refreshToken);
      console.log("💾 Refresh token stored, length:", refreshToken?.length);
    }
    // Also set isLoggedIn flag
    localStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    console.error("❌ Error storing tokens in localStorage:", error);
  }
}

function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// Health check function
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE}/docs`, { 
      method: "HEAD",
      cache: "no-cache"
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Enhanced request function with better error handling
async function request(path, options = {}, { withAuth = true } = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  if (withAuth) {
    const { accessToken } = getStoredTokens();
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    console.log("Making request to:", url);
    console.log("Request headers:", headers);
    console.log("Request body:", options.body);
    
    const fetchOptions = { ...options, headers };
    console.log("Fetch options:", fetchOptions);
    
    const res = await fetch(url, fetchOptions);
    
    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));
    
    if (res.status === 401 && withAuth) {
      console.log("Token expired, attempting refresh...");
      const ok = await refreshTokens();
      if (ok) {
        const { accessToken } = getStoredTokens();
        if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        const retry = await fetch(url, { ...options, headers, credentials: "include" });
        return handleResponse(retry);
      }
    }
    return handleResponse(res);
  } catch (error) {
    console.error("Request failed:", error);
    console.error("Request URL:", url);
    console.error("Request options:", options);
    throw new Error(`Network error: ${error.message}`);
  }
}

async function handleResponse(res) {
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();
  
  console.log("Response data:", data);
  console.log("Response ok:", res.ok);
  console.log("Response status:", res.status);
  
  if (!res.ok) {
    const message = (data && (data.detail || data.message)) || res.statusText;
    console.log("Error message:", message);
    console.log("Error data:", data);
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

// Token refresh function
export async function refreshTokens() {
  const { refreshToken } = getStoredTokens();
  console.log("🔄 Attempting token refresh with refreshToken:", !!refreshToken);
  
  if (!refreshToken) {
    console.log("❌ No refresh token available");
    return false;
  }
  
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}` 
      },
    });
    
    console.log("🔄 Refresh token response status:", res.status);
    
    if (res.ok) {
      const data = await res.json();
      console.log("✅ Token refresh successful");
      setStoredTokens(data.access_token, data.refresh_token);
      return true;
    } else {
      console.log("❌ Token refresh failed with status:", res.status);
      clearTokens();
      return false;
    }
  } catch (error) {
    console.error("❌ Token refresh error:", error);
    clearTokens();
    return false;
  }
}

// Authentication functions
export async function login({ email, password }) {
  try {
    const payload = { email, password };
    console.log("Login payload:", payload);
    console.log("Login payload JSON:", JSON.stringify(payload));
    
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }, { withAuth: false });
    
    setStoredTokens(data.access_token, data.refresh_token);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    clearTokens();
  }
}

export async function loginWithGoogle(idToken) {
  try {
    const data = await request("/auth/google-login", {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    }, { withAuth: false });
    
    setStoredTokens(data.access_token, data.refresh_token);
    return data;
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
}

// Enhanced profile functions with fallback logic
async function tryProfileEndpoints() {
  console.log("Attempting to determine user role by trying different profile endpoints...");
  
  const endpoints = [
    { name: "patient", fn: getPatientProfile },
    { name: "doctor", fn: getDoctorProfile }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Trying ${endpoint.name} profile...`);
      const profile = await endpoint.fn();
      console.log(`Successfully got ${endpoint.name} profile`);
      return { ...profile, _detectedRole: endpoint.name };
    } catch (error) {
      console.log(`${endpoint.name} profile failed:`, error.status || error.message);
      
      // If it's a 404 for patient profile, it might be a missing UserDetails record
      if (endpoint.name === "patient" && error.status === 404) {
        console.log("Patient profile 404 - likely missing UserDetails record");
        // We'll handle this in the main getProfile function
      }
    }
  }
  
  console.warn("Could not determine user role from available endpoints");
  throw new Error("Unable to determine user role. Please contact support or try logging in again.");
}

// Dynamic multi-role profile function with enhanced error handling
// Enhanced profile function with better patient detection
export async function getProfile() {
  const tokens = getStoredTokens();
  if (!tokens.accessToken) {
    throw new Error("Not authenticated");
  }
  
  try {
    // Decode JWT to get user info
    const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
    console.log("JWT Payload:", payload);
    
    const userData = payload.user || payload;
    const roleName = userData.global_role?.role_name;
    
    console.log("User Data from JWT:", userData);
    console.log("Role Name from JWT:", roleName);
    console.log("User ID from token:", userData.user_id);
    
    // If we have a clear role from JWT, use it
    if (roleName) {
      console.log(`Using role from JWT: ${roleName}`);
      return {
        ...userData,
        _detectedRole: roleName
      };
    }
    
    // If no role in JWT, try to determine role by hitting profile endpoints
    console.warn("No role name found in JWT token. Trying to determine role via profile endpoints...");
    
    // Try patient profile first (most common case)
    try {
      console.log("Trying patient profile endpoint...");
      const patientProfile = await getPatientProfile();
      console.log("Successfully got patient profile");
      return {
        ...patientProfile,
        _detectedRole: 'patient'
      };
    } catch (patientError) {
      console.log("Patient profile failed:", patientError.status || patientError.message);
      
      // Try doctor profile
      try {
        console.log("Trying doctor profile endpoint...");
        const doctorProfile = await getDoctorProfile();
        console.log("Successfully got doctor profile");
        return {
          ...doctorProfile,
          _detectedRole: 'doctor'
        };
      } catch (doctorError) {
        console.log("Doctor profile failed:", doctorError.status || doctorError.message);
        
        // Try hospital admin
        try {
          console.log("Trying hospital admin profile...");
          // For hospital admin, we need to get the hospital ID first
          if (userData.hospital_roles?.[0]?.hospital_id) {
            const hospitalId = userData.hospital_roles[0].hospital_id;
            const hospitalProfile = await getHospitalProfile(hospitalId);
            console.log("Successfully got hospital profile");
            return {
              ...hospitalProfile,
              _detectedRole: 'hospital_admin'
            };
          }
        } catch (hospitalError) {
          console.log("Hospital profile failed:", hospitalError.message);
        }
      }
    }
    
    // If all endpoints failed, create a minimal profile from JWT
    console.warn("All profile endpoints failed, creating minimal profile from JWT");
    return {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name || userData.username || "User",
      last_name: userData.last_name || "",
      global_role: userData.global_role,
      hospital_roles: userData.hospital_roles,
      _detectedRole: 'patient', // Default to patient as fallback
      _warning: "Profile created from JWT data - all endpoints failed"
    };
    
  } catch (error) {
    console.error("Critical error in getProfile:", error);
    throw new Error(`Failed to load user profile: ${error.message}`);
  }
}

// Patient functions
export function getPatientProfile() {
  return request("/patients/profile", { method: "GET" });
}

// Create missing UserDetails record for new patients
export async function createMissingUserDetails(userData) {
  console.log("Creating missing UserDetails record for user:", userData);
  
  // Try to get stored registration data
  let storedData = {};
  try {
    const stored = localStorage.getItem('pending_user_details');
    if (stored) {
      storedData = JSON.parse(stored);
      console.log("Found stored registration data:", storedData);
      // Clear the stored data after using it
      localStorage.removeItem('pending_user_details');
    }
  } catch (e) {
    console.log("No stored registration data found");
  }
  
  try {
    const result = await request("/patients/profile", { 
      method: "PUT", 
      body: JSON.stringify({
        first_name: storedData.first_name || userData.first_name || userData.username || "User",
        last_name: storedData.last_name || userData.last_name || "",
        phone: storedData.phone || userData.phone || null,
        address: userData.address || null,
        dob: userData.dob || null,
        gender: userData.gender || null
      })
    });
    
    console.log("UserDetails record created successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to create UserDetails record:", error);
    throw error;
  }
}

export function updatePatientProfile(update) {
  return request("/patients/profile", { method: "PUT", body: JSON.stringify(update) });
}

export async function registerPatient(payload) {
  console.log("Registering patient with payload:", payload);
  
  try {
    const result = await request("/patients/auth/register/patient", { 
      method: "POST", 
      body: JSON.stringify(payload) 
    }, { withAuth: false });
    
    console.log("Patient registration successful:", result);
    return result;
  } catch (error) {
    console.error("Patient registration failed:", error);
    
    // Enhanced error handling for registration failures
    if (error.status === 400) {
      throw new Error(`Registration failed: ${error.message}`);
    } else if (error.status === 500) {
      throw new Error("Registration failed due to server error. Please try again or contact support.");
    } else if (error.status === 404) {
      throw new Error("Registration endpoint not found. Please contact support.");
    } else {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}

export function getPatientConsultations() { 
  return request("/patients/consultations", { method: "GET" });
}

// Doctor functions
export function getDoctorProfile() {
  return request("/doctors/profile", { method: "GET" });
}

export function updateDoctorProfile(update) {
  return request("/doctors/profile", { method: "PUT", body: JSON.stringify(update || {}) });
}

export function getDoctorSpecialties() {
  return request("/doctors/specialties", { method: "GET" });
}

export function setDoctorSpecialties(specialtyIds = []) {
  return request("/doctors/specialties", { method: "PUT", body: JSON.stringify(specialtyIds || []) });
}

export function listDoctorPatients() {
  return request("/doctors/patients", { method: "GET" });
}

export function getDoctorPatient(patientId) {
  return request(`/doctors/patients/${patientId}`, { method: "GET" });
}

export function getDoctorPatientConsultations(patientId) {
  return request(`/doctors/patients/${patientId}/consultations`, { method: "GET" });
}

export function getDoctorPatientsAnalytics() {
  return request("/doctors/analytics/patients", { method: "GET" });
}

export function getDoctorMonthlyConsultations() {
  return request("/doctors/consultations/monthly", { method: "GET" });
}

// Hospital functions
function withQuery(path, params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) {
      v.forEach((val) => usp.append(k, String(val)));
    } else {
      usp.set(k, String(v));
    }
  });
  const qs = usp.toString();
  return qs ? `${path}?${qs}` : path;
}

export function getHospitalProfile(hospitalId) {
  return request(withQuery("/hospitals/profile", { hospital_id: hospitalId }), { method: "GET" });
}

export function updateHospitalProfile(hospitalId, payload) {
  return request(withQuery("/hospitals/profile", { hospital_id: hospitalId }), {
    method: "PUT",
    body: JSON.stringify(payload || {}),
  });
}

export function listSpecialities(hospitalId) {
  return request(withQuery("/hospitals/specialities", { hospital_id: hospitalId }), { method: "GET" });
}

export function createSpeciality(hospitalId, payload) {
  return request(withQuery("/hospitals/specialities", { hospital_id: hospitalId }), {
    method: "POST",
    body: JSON.stringify(payload || {}),
  });
}

export function updateSpeciality(hospitalId, id, payload) {
  return request(withQuery(`/hospitals/specialities/${id}`, { hospital_id: hospitalId }), {
    method: "PUT",
    body: JSON.stringify(payload || {}),
  });
}

export function deleteSpeciality(hospitalId, id) {
  return request(withQuery(`/hospitals/specialities/${id}`, { hospital_id: hospitalId }), { method: "DELETE" });
}

export function listHospitalDoctors(hospitalId) {
  return request(withQuery("/hospitals/doctors", { hospital_id: hospitalId }), { method: "GET" });
}

export function addDoctorToHospital(hospitalId, payload, specialtyIds) {
  const path = withQuery("/hospitals/doctors", {
    hospital_id: hospitalId,
    ...(Array.isArray(specialtyIds) && specialtyIds.length ? { specialty_ids: specialtyIds } : {}),
  });
  return request(path, { method: "POST", body: JSON.stringify(payload || {}) });
}

export function updateDoctorInHospital(hospitalId, doctorUserId, payload, specialtyIds) {
  const path = withQuery(`/hospitals/doctors/${doctorUserId}`, {
    hospital_id: hospitalId,
    ...(Array.isArray(specialtyIds) && specialtyIds.length ? { specialty_ids: specialtyIds } : {}),
  });
  return request(path, { method: "PUT", body: JSON.stringify(payload || {}) });
}

export function removeDoctorFromHospital(hospitalId, doctorUserId) {
  return request(withQuery(`/hospitals/doctors/${doctorUserId}`, { hospital_id: hospitalId }), { method: "DELETE" });
}

// File upload functions
export async function uploadPatientAvatar(file) {
  const url = `${API_BASE}/patients/profile/avatar`;
  const form = new FormData();
  form.append("file", file);
  const headers = {};
  const { accessToken } = getStoredTokens();
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  
  try {
    const res = await fetch(url, { method: "POST", body: form, headers, credentials: "include" });
    return handleResponse(res);
  } catch (error) {
    console.error("Avatar upload failed:", error);
    throw error;
  }
}

// Doctor registration (requires privileged auth)
export function registerDoctor(payload) {
  return request("/auth/register/doctor", { method: "POST", body: JSON.stringify(payload) }, { withAuth: true });
}

// Internal API functions for contexts
export const apiInternal = { getStoredTokens, setStoredTokens, clearTokens };

// Named exports for token helpers (used by contexts/UserContext.jsx)
export { getStoredTokens, setStoredTokens, clearTokens };

// Admin API functions
export async function getPermissionsCatalog() {
  return request("/api/permissions/catalog", { method: "GET" });
}

export async function getHospitalById(hospitalId) {
  return request(`/api/hospitals/${hospitalId}`, { method: "GET" });
}

export async function getHospitalUsers(hospitalId) {
  return request(`/api/hospitals/${hospitalId}/users`, { method: "GET" });
}

export async function getHospitalRoles(hospitalId) {
  return request(`/api/hospitals/${hospitalId}/roles`, { method: "GET" });
}

export async function createHospitalRole(hospitalId, roleData) {
  return request(`/api/hospitals/${hospitalId}/roles`, {
    method: "POST",
    body: JSON.stringify(roleData)
  });
}

export async function getHospitalRole(hospitalId, roleId) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}`, { method: "GET" });
}

export async function updateHospitalRole(hospitalId, roleId, roleData) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}`, {
    method: "PUT",
    body: JSON.stringify(roleData)
  });
}

export async function deleteHospitalRole(hospitalId, roleId) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}`, { method: "DELETE" });
}

export async function getRolePermissions(hospitalId, roleId) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}/permissions`, { method: "GET" });
}

export async function setRolePermissions(hospitalId, roleId, permissionNames) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}/permissions`, {
    method: "PUT",
    body: JSON.stringify({ permission_names: permissionNames })
  });
}

export async function addRolePermission(hospitalId, roleId, permissionKey) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}/permissions/${permissionKey}`, {
    method: "POST"
  });
}

export async function removeRolePermission(hospitalId, roleId, permissionKey) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}/permissions/${permissionKey}`, {
    method: "DELETE"
  });
}

export async function getUserRoles(hospitalId, userId) {
  return request(`/api/hospitals/${hospitalId}/users/${userId}/roles`, { method: "GET" });
}

export async function assignUserRole(hospitalId, userId, roleId) {
  return request(`/api/hospitals/${hospitalId}/users/${userId}/roles`, {
    method: "POST",
    body: JSON.stringify({ role_id: roleId })
  });
}

export async function updateUserRole(hospitalId, userId, roleId, isActive) {
  return request(`/api/hospitals/${hospitalId}/users/${userId}/roles/${roleId}`, {
    method: "PUT",
    body: JSON.stringify({ is_active: isActive })
  });
}

export async function deleteUserRole(hospitalId, userId, roleId) {
  return request(`/api/hospitals/${hospitalId}/users/${userId}/roles/${roleId}`, {
    method: "DELETE"
  });
}

export async function getUsersWithRole(hospitalId, roleId) {
  return request(`/api/hospitals/${hospitalId}/roles/${roleId}/users`, { method: "GET" });
}

// Additional admin functions for dashboard
export async function getAllHospitals() {
  return request("/search/hospitals", { method: "GET" });
}

export async function getAllDoctors() {
  return request("/search/doctors", { method: "GET" });
}