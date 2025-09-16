import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'danger', message: string }

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      // Step 1: Get CSRF cookie
      await API.get("/sanctum/csrf-cookie");

      // Step 2: Login
      await API.post("/login", { email, password });

      // Step 3: Fetch user info
      const res = await API.get("/me");
      const user = res.data;

      // Save user to localStorage (not token, just info)
      localStorage.setItem("user", JSON.stringify(user));

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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(180deg, rgba(246,249,252,1) 0%, rgba(255,255,255,1) 100%)" }}>
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-md-8 col-lg-5">
          <div className="card shadow-sm border-radius-xl">
            {/* header / brand */}
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

              <form onSubmit={handleLogin} aria-label="login form">
                {/* email */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0"><i className="fas fa-envelope text-muted"></i></span>
                    <input
                      type="email"
                      className="form-control border-start-0"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required="true"
                      aria-label="email"
                    />
                  </div>
                </div>

                {/* password */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0"><i className="fas fa-lock text-muted"></i></span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-start-0"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-required="true"
                      aria-label="password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary ms-1"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-pressed={showPassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* remember + forgot */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="rememberMe" checked={remember} onChange={() => setRemember((r) => !r)} />
                    <label className="form-check-label small" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="/forgot" className="text-sm text-primary">Forgot password?</a>
                  </div>
                </div>

                {/* primary button */}
                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary btn-lg"
                    disabled={loading}
                    aria-disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>

              {/* divider */}
              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <small className="text-muted mx-2">or</small>
                <hr className="flex-grow-1" />
              </div>

              {/* Google button (visual consistent with template) */}
              <div className="d-grid mb-2">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center"
                  onClick={handleGoogleLogin}
                >
                  <i className="fab fa-google me-2"></i> Continue with Google
                </button>
              </div>

              {/* signup link */}
              <p className="text-center text-muted small mb-0 mt-2">
                Don’t have an account?{" "}
                <a href="/register" className="text-primary fw-bold">Sign up</a>
              </p>
            </div>
          </div>

          {/* subtle footer hint */}
          <p className="text-center text-muted small mt-3">
            By continuing, you agree to the <a href="/terms" className="text-primary">Terms</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
