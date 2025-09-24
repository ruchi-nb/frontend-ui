// central API client
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

function getStoredTokens() {
  if (typeof window === "undefined") return {};
  try {
    const accessToken = localStorage.getItem("access_token") || "";
    const refreshToken = localStorage.getItem("refresh_token") || "";
    return { accessToken, refreshToken };
  } catch {
    return {};
  }
}

function setStoredTokens(accessToken, refreshToken) {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", accessToken || "");
  if (refreshToken !== undefined) {
    localStorage.setItem("refresh_token", refreshToken || "");
  }
}

function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function request(path, options = {}, { withAuth = true } = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  if (withAuth) {
    const { accessToken } = getStoredTokens();
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, { ...options, headers, credentials: "include" });
  if (res.status === 401 && withAuth) {
    // try refresh once
    const ok = await refreshTokens();
    if (ok) {
      const { accessToken } = getStoredTokens();
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
      const retry = await fetch(url, { ...options, headers, credentials: "include" });
      return handleResponse(retry);
    }
  }
  return handleResponse(res);
}

async function handleResponse(res) {
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const message = (data && (data.detail || data.message)) || res.statusText;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function login({ email, password }) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }, { withAuth: false });
  setStoredTokens(data.access_token, data.refresh_token);
  return data;
}

export async function logout() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    clearTokens();
  }
}

export async function refreshTokens() {
  const { refreshToken } = getStoredTokens();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
      credentials: "include",
    });
    const data = await handleResponse(res);
    setStoredTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// Patient endpoints
export function getPatientProfile() {
  return request("/patients/profile", { method: "GET" });
}

export function updatePatientProfile(update) {
  return request("/patients/profile", { method: "PUT", body: JSON.stringify(update) });
}

export function registerPatient(payload) {
  return request("/auth/register/patient", { method: "POST", body: JSON.stringify(payload) }, { withAuth: true });
}

export const apiInternal = { getStoredTokens, setStoredTokens, clearTokens };




