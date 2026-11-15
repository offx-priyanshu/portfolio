import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
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

    if (req.method === "POST") {
      const { data } = req.body || {};
      if (!data) {
        return res.status(400).json({ error: "Missing data payload" });
      }

      await sql`
        INSERT INTO portfolio_state (id, data, updated_at)
        VALUES ('current', ${JSON.stringify(data)}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) 
        DO UPDATE SET data = ${JSON.stringify(data)}, updated_at = CURRENT_TIMESTAMP
      `;

      return res.status(200).json({ success: true, message: "Saved to Neon DB successfully" });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Neon API error:", error);
    res.status(500).json({ error: error.message || "Database operation failed" });
  }
}

