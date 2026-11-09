export const STORAGE_KEYS = {
  token: "dropsync_token",
  role: "dropsync_role",
};

export function setSession(token, role) {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.token, token);
  }

  if (role) {
    localStorage.setItem(STORAGE_KEYS.role, role);
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.role);
}

export function getStoredRole() {
  return localStorage.getItem(STORAGE_KEYS.role) || "customer";
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.token));
}

export function getDashboardPathForRole(role) {
  if (role === "driver") {
    return "/driver-dashboard";
  }

  if (role === "company") {
    return "/settings";
  }

  return "/customer-overview";
}
