import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  // ✅ get token + email from query string
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
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-radius-xl">
            {/* Header */}
            <div className="card-header text-center pb-0">
              <h4 className="fw-bold text-dark">Reset Password</h4>
              <p className="text-muted small mb-0">
                Enter your new password to regain access
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
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn bg-gradient-primary w-100">
                  Reset Password
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="card-footer text-center">
              <p className="text-muted small mb-0">
                Back to{" "}
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
