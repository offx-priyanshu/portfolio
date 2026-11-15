/**
 * Neon DB Cloud Synchronization Service for Portfolio
 * Seamlessly handles Cloud Database (Neon) + LocalStorage Cache Fallback
 */

const API_ENDPOINT = "/api/portfolio";

export async function fetchPortfolioFromCloud() {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Cloud fetch failed with status: ${res.status}`);
    }

    const result = await res.json();
    if (result && result.success && result.data) {
      // Update local cache as well
      try {
        localStorage.setItem("portfolio_cms_state", JSON.stringify(result.data));
      } catch (e) {
        console.warn("Could not cache to localStorage:", e);
      }
      return result.data;
    }
  } catch (err) {
    console.info("Neon cloud sync falling back to localStorage cache:", err.message);
  }

  // Fallback to localStorage if cloud fetch fails or offline
  try {
    const local = localStorage.getItem("portfolio_cms_state");
    return local ? JSON.parse(local) : null;
  } catch {
    return null;
  }
}

export async function savePortfolioToCloud(data) {
  // Always update local cache first for instant UI response
  try {
    localStorage.setItem("portfolio_cms_state", JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // Sync to Neon DB via Serverless API
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    if (!res.ok) {
      throw new Error(`Cloud save failed with status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Failed to sync to Neon DB cloud:", err);
    return { success: false, error: err.message };
  }
}

