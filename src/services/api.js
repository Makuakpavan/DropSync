// BACKEND DEPENDENCY: This file is the single integration point between the frontend and the API.
// If the backend is offline or not configured yet, the mock fallbacks below keep the UI usable.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function buildUrl(path) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getMockResponse(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();

  if (path === "/auth/login") {
    return {
      token: "demo-token-123",
      message: "Demo login successful. Backend is offline, so mock session data is active.",
    };
  }

  if (path === "/auth/signup") {
    return {
      token: "demo-signup-token-123",
      message: "Demo account created successfully.",
    };
  }

  if (path === "/auth/verify") {
    return {
      message: "Demo verification successful.",
    };
  }

  if (path === "/companies/signup") {
    return {
      token: "demo-company-token-123",
      message: "Demo company account created successfully.",
    };
  }

  if (path === "/deliveries") {
    return [
      { id: "demo-101", title: "Lagos Retail Drop", status: "In transit", trackingNumber: "DS-101" },
      { id: "demo-102", title: "Abuja Warehouse Dispatch", status: "Out for delivery", trackingNumber: "DS-102" },
      { id: "demo-103", title: "Port Harcourt Restock", status: "Delivered", trackingNumber: "DS-103" },
    ];
  }

  if (path.startsWith("/deliveries/track/")) {
    const trackingNumber = decodeURIComponent(path.split("/").pop());
    return {
      data: {
        trackingNumber,
        status: "Out for delivery",
        updatedAt: new Date().toISOString(),
        courier: "Demo courier",
        eta: "Today, 4:30 PM",
      },
    };
  }

  if (method === "POST" && path.includes("auth")) {
    return { message: "Mock backend response. Connect your API to replace this fallback." };
  }

  return null;
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

  try {
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
  } catch (error) {
    const mockData = getMockResponse(path, options);
    if (mockData) {
      return mockData;
    }

    throw new Error("Request failed", { cause: error });
  }
}

export async function signup(payload) {
  // BACKEND REQUIRED: real sign-up API. Replace this call with your backend when ready.
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload) {
  // BACKEND REQUIRED: real login endpoint. The mock fallback keeps the UI working without a backend.
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyAccount(payload) {
  // BACKEND REQUIRED: account verification endpoint.
  return request("/auth/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createCompanyAccount(payload) {
  // BACKEND REQUIRED: company registration endpoint.
  return request("/companies/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchDeliveries() {
  // BACKEND REQUIRED: returns the authenticated user's delivery list.
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
  // BACKEND REQUIRED: track shipment data by tracking number.
  return request(`/deliveries/track/${encodeURIComponent(trackingNumber)}`);
}
