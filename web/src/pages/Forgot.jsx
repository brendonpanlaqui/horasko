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
    <div className="d-flex min-vh-100 bg-white">
      {/* -----------------------------------------------------------
          LEFT COLUMN: Visual/Brand
       ----------------------------------------------------------- */}
      <div 
        className="d-none d-md-flex col-md-6 col-lg-7 position-relative align-items-center justify-content-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: "linear-gradient(310deg, #141727 0%, #3A416F 100%)", 
            opacity: 0.85
          }}
        ></div>

        <div className="position-relative text-white text-center p-5" style={{ zIndex: 2, maxWidth: "600px" }}>
          <h2 className="display-5 fw-bold mb-3" style={{ letterSpacing: "-1px" }}>Security first.</h2>
          <p className="lead text-white opacity-8">
            Forgot your password? No worries. We'll help you get back to tracking your time in seconds.
          </p>
        </div>
      </div>

      {/* -----------------------------------------------------------
          RIGHT COLUMN: Forgot Form
       ----------------------------------------------------------- */}
      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center p-4 p-sm-5">
        <div className="w-100" style={{ maxWidth: "420px" }}>
          
          {/* Header */}
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
            <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>
              HorasKo
            </h3>
            <p className="text-muted text-sm">
              Enter your email to receive a reset link.
            </p>
          </div>

          {/* Alert */}
          {alert && (
            <div
              className={`alert alert-${alert.type} py-2 text-center border-0 mb-4`}
              style={{ borderRadius: "0.75rem" }}
            >
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSendResetLink}>
            {/* Email Field - Clean Style */}
            <div className="mb-3">
              <label className="form-label text-xs fw-bold text-muted text-uppercase">
                Email Address
              </label>
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

            {/* Button */}
            <div className="d-grid mb-3 mt-4">
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

            {/* Back to Login */}
            <p className="text-center text-muted small mt-4 mb-0">
              Remember your password?{" "}
              <span
                className="text-primary text-gradient fw-bold text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Back to Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}