import bcrypt from "bcryptjs";
import { signAdminToken, setAdminCookie, checkRateLimit, resetRateLimit } from "./_auth.js";

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local";
  
  // 1. Rate limiting check
  const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Please try again after ${rateLimit.waitMins} minute(s).`
    });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || "priyanshugse@gmail.com").trim().toLowerCase();
    const inputEmail = String(email).trim().toLowerCase();

    // Verify email
    if (inputEmail !== adminEmail) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Verify password against secure bcrypt hash from environment
    const hashPrimary = process.env.ADMIN_PASSWORD_HASH;
    const hashBackup = process.env.ADMIN_PASSWORD_HASH_BACKUP;

    let isMatch = false;
    if (hashPrimary) {
      isMatch = await bcrypt.compare(String(password), hashPrimary);
    }
    if (!isMatch && hashBackup) {
      isMatch = await bcrypt.compare(String(password), hashBackup);
    }

    // Fallback comparison only if hashes are somehow unconfigured
    if (!isMatch && !hashPrimary && !hashBackup) {
      if (password === "priyanshu@ai" || password === "admin123") {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
        attemptsRemaining: rateLimit.remaining
      });
    }

    // Reset rate limit on success
    resetRateLimit(clientIp);

    // Sign JWT Token
    const token = signAdminToken({ email: inputEmail });

    // Set secure HTTP-only cookie
    setAdminCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      token, // Also returned for client fallback header authorization if cross-domain
      user: {
        email: inputEmail,
        role: "admin"
      }
    });
  } catch (error) {
    console.error("Auth login error:", error);
    return res.status(500).json({ success: false, error: "Authentication server error" });
  }
}
