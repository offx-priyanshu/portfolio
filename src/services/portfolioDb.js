/**
 * Neon DB Cloud Synchronization & Authentication Service
 * Communicates with secure serverless /api endpoints with cookie & token support
 */

const API_BASE = "/api";

// In-memory token storage (never stores plain password)
let cachedAuthToken = null;

export function setAuthToken(token) {
  cachedAuthToken = token;
  if (token) {
    try {
      sessionStorage.setItem("portfolio_jwt_session", token);
    } catch (e) {
      // ignore
    }
  } else {
    try {
      sessionStorage.removeItem("portfolio_jwt_session");
    } catch (e) {
      // ignore
    }
  }
}

export function getAuthToken() {
  if (cachedAuthToken) return cachedAuthToken;
  try {
    return sessionStorage.getItem("portfolio_jwt_session") || null;
  } catch {
    return null;
  }
}

/**
 * Perform server-side administrator login
 */
export async function loginAdmin(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Sends & receives HTTP-only cookies
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || "Authentication failed" };
    }

    if (data.token) {
      setAuthToken(data.token);
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message || "Network error during login" };
  }
}

/**
 * Check active admin session from server
 */
export async function checkAdminSession() {
  try {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/auth-session`, {
      method: "GET",
      headers,
      credentials: "include"
    });

    if (!res.ok) return { authenticated: false };
    const data = await res.json();
    return { authenticated: Boolean(data?.authenticated), user: data?.user };
  } catch {
    return { authenticated: false };
  }
}

/**
 * Logout admin from server and clear cookies
 */
export async function logoutAdmin() {
  try {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    await fetch(`${API_BASE}/auth-session`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ action: "logout" })
    });
  } catch {
    // proceed to clear client state
  } finally {
    setAuthToken(null);
  }
}

/**
 * Upload an image or document (PDF) to the server / Cloudinary
 */
export async function uploadPortfolioFile(file, folder = "assets") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const fileData = reader.result;
        const token = getAuthToken();
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({
            fileData,
            fileName: file.name,
            folder,
            fileType: file.type.includes("pdf") ? "pdf" : "image"
          })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Upload failed");
        }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Fetch portfolio data from Neon DB
 */
export async function fetchPortfolioFromCloud() {
  try {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!res.ok) {
      throw new Error(`Cloud fetch failed with status: ${res.status}`);
    }

    const result = await res.json();
    if (result && result.success && result.data) {
      try {
        localStorage.setItem("portfolio_cms_state", JSON.stringify(result.data));
      } catch (e) {
        console.warn("Could not cache to localStorage:", e);
      }
      return result.data;
    }
  } catch (err) {
    console.info("Neon sync using local cache:", err.message);
  }

  // Fallback to local storage if offline or during build
  try {
    const local = localStorage.getItem("portfolio_cms_state");
    return local ? JSON.parse(local) : null;
  } catch {
    return null;
  }
}

/**
 * Save portfolio updates to Neon DB with secure token
 */
export async function savePortfolioToCloud(data) {
  // 1. Instant local cache update for snappy UI
  try {
    localStorage.setItem("portfolio_cms_state", JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // 2. Transmit to secure backend API
  try {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/portfolio`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ data })
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return { success: false, error: result.error || "Failed to save to database" };
    }

    return { success: true, message: result.message };
  } catch (err) {
    console.error("Neon cloud save error:", err);
    return { success: false, error: err.message };
  }
}
