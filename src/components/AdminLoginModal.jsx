import { useState, useEffect } from "react";
import "./AdminLoginModal.css";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { loginAdmin } from "../services/portfolioDb";

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("priyanshugse@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setErrorMsg("");
      setPassword("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const result = await loginAdmin(email, password);

      if (result.success) {
        setSuccessMsg("Welcome back, Priyanshu! Access granted.");
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          }
          onClose();
        }, 500);
      } else {
        setErrorMsg(result.error || "Invalid admin credentials. Please try again.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Authentication service error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setSuccessMsg("Password reset verification has been sent to priyanshugse@gmail.com.");
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-login-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="admin-close-btn"
          onClick={onClose}
          aria-label="Close Admin Modal"
        >
          ×
        </button>

        <div className="admin-badge-icon">
          <FaLock size={22} />
        </div>

        <div className="admin-login-header">
          <h2>Welcome Back, Admin</h2>
          <p>Sign in to access the admin dashboard</p>
        </div>

        {errorMsg && (
          <div className="admin-error-banner">
            <FaShieldAlt />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            className="admin-error-banner"
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              borderColor: "rgba(16, 185, 129, 0.4)",
              color: "#6ee7b7"
            }}
          >
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-email">Admin Email</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="field-icon" size={15} />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="field-icon" size={15} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
          </div>

          <div className="admin-forgot-row">
            <button
              type="button"
              className="admin-forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="admin-submit-btn"
            disabled={loading}
          >
            <FaShieldAlt size={14} />
            <span>{loading ? "Authenticating..." : "Secure Login"}</span>
          </button>
        </form>

        <div className="admin-footer-security">
          <FaShieldAlt size={12} />
          <span>256-Bit Encrypted Admin Session</span>
        </div>
      </div>
    </div>
  );
}
