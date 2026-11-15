import { parseTokenFromReq, verifyAdminToken, clearAdminCookie } from "./_auth.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Logout action
  if (req.method === "POST" && (req.query.action === "logout" || req.body?.action === "logout")) {
    clearAdminCookie(res);
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  }

  // Session verification
  const token = parseTokenFromReq(req);
  const payload = verifyAdminToken(token);

  if (!payload || payload.role !== "admin") {
    return res.status(401).json({ success: false, authenticated: false, error: "Invalid or expired session" });
  }

  return res.status(200).json({
    success: true,
    authenticated: true,
    user: {
      email: payload.email,
      role: "admin"
    }
  });
}

