import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await register(name, email, password);
      setAlert({
        type: "success",
        message: "Account created successfully — redirecting to login…",
      });
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl}/auth/google/redirect`;
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
              person_add
            </i>
          </div>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
            HorasKo
          </h3>
          <p className="text-muted small mb-0">
            Create your account and start tracking your time.
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

        {/* Register form */}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              Name
            </label>
            <div className="input-group input-group-outline">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-user text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              Email
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

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              Password
            </label>
            <div className="input-group input-group-outline">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-start-0"
                placeholder="••••••••"
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
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="text-center my-3 position-relative">
            <hr className="m-0" />
            <span
              className="bg-white px-3 position-absolute top-50 start-50 translate-middle text-muted small"
              style={{ lineHeight: 1 }}
            >
              or
            </span>
          </div>

          <div className="d-grid mt-4">
            <button
              type="button"
              className="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
              style={{
                borderRadius: "0.75rem",
                fontWeight: 500,
              }}
            >
              <i className="fab fa-google me-2"></i> Continue with Google
            </button>
          </div>

          <p className="text-center text-muted small mt-4 mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary fw-semibold text-decoration-none"
            >
              Log in
            </a>
          </p>
        </form>

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
    </div>
  );
}
