import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/forgot-password", { email });

      // Store email so Reset.jsx can use it
      localStorage.setItem("resetEmail", email);

      setAlert({
        type: "success",
        message: "Password reset link sent to your email.",
      });

      // Optionally, don't redirect immediately; let them check their email
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      const err =
        error.response?.data?.message || "Failed to send reset link.";
      console.error("Error:", err);
      setAlert({ type: "danger", message: err });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-radius-xl">
            {/* Header */}
            <div className="card-header text-center pb-0">
              <h4 className="fw-bold text-dark">Forgot Password</h4>
              <p className="text-muted small mb-0">
                Enter your email address and we’ll send you a reset link
              </p>
            </div>

            {/* Body */}
            <div className="card-body">
              {alert && (
                <div
                  className={`alert alert-${alert.type} border-radius-md shadow-sm`}
                  role="alert"
                >
                  {alert.message}
                </div>
              )}
              <form onSubmit={handleSendResetLink}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn bg-gradient-primary w-100">
                  Send Reset Link
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="card-footer text-center">
              <p className="text-muted small mb-0">
                Remember your password?{" "}
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
