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
    <div className="d-flex min-vh-100 bg-white">
      {/* LEFT COLUMN: Visual/Brand */}
      <div 
        className="d-none d-md-flex col-md-6 col-lg-7 position-relative align-items-center justify-content-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: "linear-gradient(310deg, #141727 0%, #3A416F 100%)", 
            opacity: 0.85
          }}
        ></div>

        <div className="position-relative text-white text-center p-5" style={{ zIndex: 2, maxWidth: "600px" }}>
          <h2 className="display-5 fw-bold mb-3" style={{ letterSpacing: "-1px" }}>Join the movement.</h2>
          <p className="lead text-white opacity-8">
            Start tracking your productivity, managing tasks, and streamlining your workflow with HorasKo today.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Register Form */}
      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center p-4 p-sm-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          
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
            <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>
              HorasKo
            </h3>
            <p className="text-muted text-sm">
              Create your account to get started.
            </p>
          </div>

          {alert && (
            <div className={`alert alert-${alert.type} text-white border-radius-md shadow-sm d-flex align-items-center mb-4`} role="alert">
              <span className="text-sm">{alert.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} role="form">
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label text-xs fw-bold text-muted text-uppercase">Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control ps-3 border-radius-lg"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ minHeight: "45px" }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label text-xs fw-bold text-muted text-uppercase">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control ps-3 border-radius-lg"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ minHeight: "45px" }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label text-xs fw-bold text-muted text-uppercase">Password</label>
              <div className="input-group position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control ps-3 border-radius-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ minHeight: "45px" }}
                />
                <button
                  type="button"
                  className="btn bg-transparent border-0 position-absolute end-0 top-50 translate-middle-y me-2 text-muted z-index-5"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 5 }}
                >
                  <i className="material-symbols-rounded fs-5">
                    {showPassword ? "visibility_off" : "visibility"}
                  </i>
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn bg-gradient-primary w-100 py-3 mb-4 fw-bold border-radius-lg shadow-sm"
                disabled={loading}
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

            <div className="d-flex align-items-center mb-3">
               <div className="flex-grow-1 border-bottom"></div>
               <span className="px-3 text-muted text-xs font-weight-bold opacity-7">or</span>
               <div className="flex-grow-1 border-bottom"></div>
            </div>

            <button
              type="button"
              className="btn btn-outline-light text-dark border w-100 py-2 d-flex align-items-center justify-content-center border-radius-lg shadow-sm mb-4"
              onClick={handleGoogleLogin}
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                width="18" 
                className="me-2"
              />
              <span className="fw-bold text-sm">Continue with Google</span>
            </button>

            <p className="text-sm text-center mt-3 mb-0 text-muted">
              Already have an account?{" "}
              <a href="/login" className="text-primary text-gradient fw-bold text-decoration-none">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}