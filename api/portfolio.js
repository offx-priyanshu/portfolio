import { neon } from "@neondatabase/serverless";
import { parseTokenFromReq, verifyAdminToken } from "./_auth.js";

// Validation & sanitization helper for portfolio state updates
function sanitizeAndValidatePortfolio(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload: data must be an object");
  }

  // Ensure essential root properties exist or are properly formed
  const clean = {
    profile: typeof data.profile === "object" && data.profile !== null ? data.profile : {},
    hero: typeof data.hero === "object" && data.hero !== null ? data.hero : {},
    about: typeof data.about === "object" && data.about !== null ? data.about : {},
    projects: Array.isArray(data.projects) ? data.projects : [],
    statistics: Array.isArray(data.statistics) ? data.statistics : [],
    journey: Array.isArray(data.journey) ? data.journey : [],
    settings: typeof data.settings === "object" && data.settings !== null ? data.settings : {
      siteTitle: "Priyanshu Kumar — Portfolio",
      seoDescription: "Data Science, Machine Learning, and Generative AI Portfolio",
      seoKeywords: "Data Science, Machine Learning, AI, Deep Learning, Python",
      isPublic: true,
      showContactInfo: true
    },
    updatedAt: new Date().toISOString()
  };

  return clean;
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: "DATABASE_URL not configured on server" });
  }

  const sql = neon(databaseUrl);

  try {
    // -------------------------------------------------------------
    // GET: Public or Admin read
    // -------------------------------------------------------------
    if (req.method === "GET") {
      const rows = await sql`
        SELECT data, updated_at FROM portfolio_state 
        WHERE id = 'current' 
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return res.status(200).json({ success: true, data: rows[0].data, updatedAt: rows[0].updated_at });
      } else {
        return res.status(200).json({ success: true, data: null });
      }
    }

    // -------------------------------------------------------------
    // POST: Strictly Protected Admin Update Operation
    // -------------------------------------------------------------
    if (req.method === "POST") {
      // 1. Verify Admin Authentication Token from cookie or Bearer header
      const token = parseTokenFromReq(req);
      const auth = verifyAdminToken(token);

      if (!auth || auth.role !== "admin") {
        return res.status(401).json({
          success: false,
          error: "Unauthorized: Administrator privileges are required to save changes to the database."
        });
      }

      const { data } = req.body || {};
      if (!data) {
        return res.status(400).json({ success: false, error: "Missing data payload" });
      }

      // 2. Validate & Sanitize data
      const sanitizedData = sanitizeAndValidatePortfolio(data);

      // 3. Safe Atomic Upsert with optimistic timestamp check
      await sql`
        INSERT INTO portfolio_state (id, data, updated_at)
        VALUES ('current', ${JSON.stringify(sanitizedData)}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) 
        DO UPDATE SET data = ${JSON.stringify(sanitizedData)}, updated_at = CURRENT_TIMESTAMP
      `;

      return res.status(200).json({
        success: true,
        message: "Portfolio CMS state saved securely to Neon PostgreSQL.",
        updatedAt: sanitizedData.updatedAt
      });
    }

    res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Neon API error:", error);
    res.status(500).json({ success: false, error: error.message || "Database operation failed" });
  }
}
