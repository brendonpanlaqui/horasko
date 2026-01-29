import React, { useState } from "react";

export default function Settings({ user }) {
  // State for form fields
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [config, setConfig] = useState({ hourlyRate: 70, otPremium: 1.25 });
  const [notifications, setNotifications] = useState({ email: true, push: false });
  const [isSaving, setIsSaving] = useState(false);

  // Simulation of saving data
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0 text-dark fw-bold">Settings</h5>
          <p className="text-muted small mb-0">Manage your account and system preferences.</p>
        </div>
        <button 
            className="btn bg-gradient-dark shadow-sm d-flex align-items-center mb-0"
            onClick={handleSave}
            disabled={isSaving}
        >
          {isSaving ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : (
            <span className="material-symbols-rounded me-2 fs-6">save</span>
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="row g-4">
        
        {/* LEFT COLUMN - Account & Security */}
        <div className="col-lg-4 col-md-5">
          {/* Profile Card */}
          <div className="card shadow-sm border-radius-xl mb-4">
            <div className="card-body text-center p-4">
              <div 
                className="mx-auto bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm mb-3"
                style={{ width: "64px", height: "64px", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                {user?.name?.charAt(0) || "U"}
              </div>
              <h5 className="fw-bold text-dark mb-0">{user?.name || "User"}</h5>
              <p className="text-muted text-sm mb-2">{user?.email || "user@example.com"}</p>
              <span className="badge bg-light text-dark border">Administrator</span>
            </div>
          </div>

          {/* Preferences */}
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header pb-0">
              <h6 className="fw-bold text-dark mb-0">Notifications</h6>
            </div>
            <div className="card-body">
              <div className="form-check form-switch ps-0 mb-3 d-flex align-items-center justify-content-between">
                <label className="form-check-label text-body text-truncate w-80 mb-0" htmlFor="emailNotifs">
                  Email Notifications
                </label>
                <input 
                  className="form-check-input ms-auto" 
                  type="checkbox" 
                  id="emailNotifs"
                  checked={notifications.email}
                  onChange={() => setNotifications({...notifications, email: !notifications.email})}
                />
              </div>
              <div className="form-check form-switch ps-0 d-flex align-items-center justify-content-between">
                <label className="form-check-label text-body text-truncate w-80 mb-0" htmlFor="pushNotifs">
                  Desktop Alerts
                </label>
                <input 
                  className="form-check-input ms-auto" 
                  type="checkbox" 
                  id="pushNotifs"
                  checked={notifications.push}
                  onChange={() => setNotifications({...notifications, push: !notifications.push})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Configuration Forms */}
        <div className="col-lg-8 col-md-7">
          
          {/* Payroll Configuration (Connects to logic in Cutoff.jsx) */}
          <div className="card shadow-sm border-radius-xl mb-4">
            <div className="card-header pb-0 d-flex align-items-center">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-gradient-success text-center me-2 d-flex align-items-center justify-content-center">
                <span className="material-symbols-rounded text-white" style={{ fontSize: "1.1rem" }}>payments</span>
              </div>
              <h6 className="fw-bold text-dark mb-0">Payroll Configuration</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-muted">Hourly Rate (PHP)</label>
                  <div className="input-group input-group-outline">
                    <input 
                      type="number" 
                      className="form-control fw-bold" 
                      value={config.hourlyRate}
                      onChange={(e) => setConfig({...config, hourlyRate: e.target.value})}
                    />
                  </div>
                  <small className="text-muted text-xs">Base rate used for all calculations.</small>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-muted">OT Premium Multiplier</label>
                  <div className="input-group input-group-outline">
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-control fw-bold" 
                      value={config.otPremium}
                      onChange={(e) => setConfig({...config, otPremium: e.target.value})}
                    />
                  </div>
                  <small className="text-muted text-xs">Multiplier for overtime hours (e.g., 1.25 = 125%).</small>
                </div>
              </div>
            </div>
          </div>

          {/* Security / Password */}
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header pb-0 d-flex align-items-center">
               <div className="icon icon-shape icon-sm shadow border-radius-md bg-gradient-danger text-center me-2 d-flex align-items-center justify-content-center">
                <span className="material-symbols-rounded text-white" style={{ fontSize: "1.1rem" }}>lock</span>
              </div>
              <h6 className="fw-bold text-dark mb-0">Security</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-xs fw-bold text-uppercase text-muted">Current Password</label>
                  <div className="input-group input-group-outline">
                    <input 
                      type="password" 
                      className="form-control"
                      value={passwords.current}
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-muted">New Password</label>
                  <div className="input-group input-group-outline">
                    <input 
                      type="password" 
                      className="form-control"
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-muted">Confirm New Password</label>
                  <div className="input-group input-group-outline">
                    <input 
                      type="password" 
                      className="form-control"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <button className="btn btn-outline-danger btn-sm mb-0">Deactivate Account</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}