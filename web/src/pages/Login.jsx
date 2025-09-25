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
      // 1. Login via auth.js (handles CSRF internally)
      await login(email, password, remember);

      // 2. Fetch authenticated user
      const user = await getMe();

      // 3. Store user locally (optional, keep minimal data only)
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      
      // 4. Show success + redirect
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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(180deg, rgba(246,249,252,1) 0%, rgba(255,255,255,1) 100%)" }}>
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-md-8 col-lg-5">
          <div className="card shadow-sm border-radius-xl">
            {/* Header */}
            <div className="card-header text-center pt-4 pb-1 bg-transparent border-0">
              <h4 className="mb-0 fw-bold">Login your account</h4>
              <p className="text-muted small mb-0">Sign in to access your work hours dashboard</p>
            </div>

            <div className="card-body px-4 py-3">
              {alert && (
                <div className={`alert alert-${alert.type} mb-3 border-radius-md`} role="alert">
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email</label>
                  <div className="input-group">
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

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="input-group">
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
                      className="btn btn-outline-secondary ms-1"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember + forgot */}
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
                  <div>
                    <a href="/forgot" className="text-sm text-primary">Forgot password?</a>
                  </div>
                </div>

                {/* Submit */}
                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary btn-lg"
                    disabled={loading}
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
              </form>

              {/* Divider */}
              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <small className="text-muted mx-2">or</small>
                <hr className="flex-grow-1" />
              </div>

              {/* Google button */}
              <div className="d-grid mb-2">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center"
                  onClick={handleGoogleLogin}
                >
                  <i className="fab fa-google me-2"></i> Continue with Google
                </button>
              </div>

              {/* Signup link */}
              <p className="text-center text-muted small mb-0 mt-2">
                Don’t have an account?{" "}
                <a href="/register" className="text-primary fw-bold">Sign up</a>
              </p>
            </div>
          </div>

          <p className="text-center text-muted small mt-3">
            By continuing, you agree to the <a href="/terms" className="text-primary">Terms</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
