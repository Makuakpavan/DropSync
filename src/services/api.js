const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function buildUrl(path) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function request(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("dropsync_token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(data?.message || data || "Request failed");
  }

  return data;
}

export async function signup(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyAccount(payload) {
  return request("/auth/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createCompanyAccount(payload) {
  return request("/companies/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchDeliveries() {
  const response = await request("/deliveries");
  if (Array.isArray(response)) {
    return response;
  }

  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

export async function trackDelivery(trackingNumber) {
  return request(`/deliveries/track/${encodeURIComponent(trackingNumber)}`);
}
