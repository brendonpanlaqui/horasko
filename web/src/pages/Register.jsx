import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/signup", { name, email, password });
      console.log("Signup success:", response.data);

      setAlert({ type: "success", message: "Account created. Please log in." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const err = error.response?.data?.message || "Something went wrong.";
      console.log("Signup error:", err);
      setAlert({ type: "danger", message: err });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header text-center pb-0">
              <h4 className="fw-bold text-dark">Create an Account</h4>
              <p className="text-muted small mb-0">
                Fill in the details below to sign up
              </p>
            </div>
            <div className="card-body">
              {alert && (
                <div
                  className={`alert alert-${alert.type} border-radius-md shadow-sm`}
                  role="alert"
                >
                  {alert.message}
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-gradient-primary w-100"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="text-muted small mb-0">
                Already have an account?{" "}
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
