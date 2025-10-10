import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../api/auth";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      await login(email, password, remember);
      const user = await getMe();
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      setAlert({ type: "success", message: "Login successful — redirecting…" });
      setTimeout(() => navigate("/", { replace: true }), 800);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Login failed.";
      setAlert({ type: "danger", message: msg });
      setLoading(false);
      setTimeout(() => setAlert(null), 5000);
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
        background:
          "linear-gradient(180deg, #f8f9fe 0%, #ffffff 100%)",
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
              lock_open
            </i>
          </div>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
            HorasKo
          </h3>
          <p className="text-muted small mb-0">
            Login to access your dashboard.
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

        {/* Login form */}
        <form onSubmit={handleLogin}>
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={remember}
                onChange={() => setRemember((r) => !r)} 
              />
              <label className="form-check-label small" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a
              href="/forgot"
              className="text-sm text-primary text-decoration-none"
            >
              Forgot password?
            </a>
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
                  Signing in...
                </>
              ) : (
                "Sign in"
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
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary fw-semibold text-decoration-none"
            >
              Sign up
            </a>
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
