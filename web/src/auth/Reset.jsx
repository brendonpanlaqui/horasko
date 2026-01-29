import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Extract token & email from query
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const email = query.get("email");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match." });
      return;
    }

    try {
      setLoading(true);
      await API.post("/api/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      setAlert({
        type: "success",
        message: "Password has been reset successfully!",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const err = error.response?.data?.message || "Failed to reset password.";
      console.error("Error:", err);
      setAlert({ type: "danger", message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{
        background: "linear-gradient(180deg, #f8f9fe 0%, #ffffff 100%)",
        padding: "1rem",
      }}
    >
      <div
        className="card shadow border-0 p-4 p-md-5 w-100"
        style={{
          maxWidth: 420,
          borderRadius: "1.25rem",
          animation: "fadeIn 0.6s ease",
        }}
      >
        {/* Brand header */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(63, 81, 181, 0.1)",
            }}
          >
            <i
              className="material-symbols-rounded text-primary"
              style={{ fontSize: 36 }}
            >
              lock_reset
            </i>
          </div>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
            Reset Password
          </h3>
          <p className="text-muted small mb-0">
            Enter your new password to regain access
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div
            className={`alert alert-${alert.type} py-2 text-center border-0`}
            style={{ borderRadius: "0.75rem" }}
          >
            {alert.message}
          </div>
        )}

        {/* Reset form */}
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              New Password
            </label>
            <div className="input-group input-group-outline">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-start-0"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-light border ms-1"
                onClick={() => setShowPassword((s) => !s)}
                style={{ borderRadius: "0.5rem" }}
              >
                <i className="material-symbols-rounded">
                  {showPassword ? "visibility_off" : "visibility"}
                </i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">
              Confirm Password
            </label>
            <div className="input-group input-group-outline">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control border-start-0"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-light border ms-1"
                onClick={() => setShowConfirm((s) => !s)}
                style={{ borderRadius: "0.5rem" }}
              >
                <i className="material-symbols-rounded">
                  {showConfirm ? "visibility_off" : "visibility"}
                </i>
              </button>
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn bg-gradient-primary btn-lg shadow-sm"
              disabled={loading}
              style={{ borderRadius: "0.75rem", fontWeight: 600 }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-muted small mt-4 mb-0">
          Remember your password?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 576px) {
            .card {
              padding: 1.5rem !important;
              border-radius: 1rem !important;
            }
            h3 {
              font-size: 1.4rem;
            }
          }
        `}
      </style>
    </div>
  );
}
