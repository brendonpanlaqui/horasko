import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      await API.post("/api/forgot-password", { email });
      localStorage.setItem("resetEmail", email);

      setAlert({
        type: "success",
        message: "Password reset link sent to your email.",
      });

      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      const err =
        error.response?.data?.message || "Failed to send reset link.";
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
              mail_lock
            </i>
          </div>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
            HorasKo
          </h3>
          <p className="text-muted small mb-0">
            Forgot your password? No worries — we’ll help you reset it.
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

        {/* Forgot form */}
        <form onSubmit={handleSendResetLink}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              Email Address
            </label>
            <div className="input-group input-group-outline">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn bg-gradient-primary btn-lg shadow-sm"
              disabled={loading}
              style={{ borderRadius: "0.75rem", fontWeight: 600 }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>

          <p className="text-center text-muted small mt-4 mb-0">
            Remember your password?{" "}
            <span
              className="text-primary fw-semibold text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </span>
          </p>
        </form>
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
