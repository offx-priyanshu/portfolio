import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-portfolio-dev-secret-key-2026";
const COOKIE_NAME = "portfolio_admin_token";

export function signAdminToken(payload = {}) {
  return jwt.sign(
    {
      role: "admin",
      email: payload.email || process.env.ADMIN_EMAIL || "priyanshugse@gmail.com",
      timestamp: Date.now()
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyAdminToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function parseTokenFromReq(req) {
  // 1. From Authorization Header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 2. From Cookies
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookie.parse(cookieHeader);
    if (cookies[COOKIE_NAME]) {
      return cookies[COOKIE_NAME];
    }
  }

  return null;
}

export function setAdminCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  const cookieStr = cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
  res.setHeader("Set-Cookie", cookieStr);
}

export function clearAdminCookie(res) {
  const isProd = process.env.NODE_ENV === "production";
  const cookieStr = cookie.serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  });
  res.setHeader("Set-Cookie", cookieStr);
}

// In-memory rate limiting map for login attempts (per IP address)
const loginAttempts = new Map();

export function checkRateLimit(ip, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + windowMs;
    loginAttempts.set(ip, entry);
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (entry.count >= maxAttempts) {
    const waitMins = Math.ceil((entry.resetTime - now) / 60000);
    return { allowed: false, waitMins };
  }

  entry.count += 1;
  loginAttempts.set(ip, entry);
  return { allowed: true, remaining: maxAttempts - entry.count };
}

export function resetRateLimit(ip) {
  loginAttempts.delete(ip);
}

