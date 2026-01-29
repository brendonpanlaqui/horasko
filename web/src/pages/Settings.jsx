import React, { useState, useEffect } from "react";
import { getMe } from "../api/auth";

export default function Settings() {
  // --- STATE ---
  // Initialize with empty strings so inputs are visible immediately (like Profile.jsx)
  const [profile, setProfile] = useState({ 
    name: "", 
    email: "", 
    avatar: null 
  });

  const [config, setConfig] = useState({ 
    hourlyRate: "", 
    otPremium: "" 
  });

  const [status, setStatus] = useState({ 
    loading: true, 
    saving: false, 
    success: null, 
    error: null 
  });

  // --- FETCH DATA ---
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        // 1. Fetch User (Real API)
        const userRes = await getMe();
        const userData = userRes?.data || userRes;

        // 2. Fetch Settings (Simulated DB call)
        // We do not block the UI here, just fetch and update
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockSettings = { hourlyRate: 70, otPremium: 1.25 };

        if (isMounted) {
          if (userData) {
            setProfile({
              name: userData.name || "Unknown",
              email: userData.email || "...",
              avatar: userData.avatar || null
            });
          }

          setConfig({
            hourlyRate: mockSettings.hourlyRate,
            otPremium: mockSettings.otPremium
          });

          setStatus(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        if (isMounted) setStatus(prev => ({ ...prev, loading: false, error: "Failed to load system data." }));
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  // --- HANDLERS ---
  const handleConfigChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ ...status, saving: true, success: null, error: null });

    try {
      // Simulate API Save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ 
        loading: false, 
        saving: false, 
        success: "System configuration updated successfully!", 
        error: null 
      });

      setTimeout(() => setStatus(prev => ({ ...prev, success: null })), 3000);

    } catch (err) {
      setStatus({ 
        loading: false, 
        saving: false, 
        success: null, 
        error: "Failed to save changes." 
      });
    }
  };

  // Helper
  const getInitials = (name) => {
    return name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "U";
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="fw-bold text-dark mb-1">Settings</h5>
          <p className="text-muted small mb-0">Manage global payroll variables and configurations.</p>
        </div>
      </div>

      {/* Alerts */}
      {status.success && <div className="alert alert-success text-white text-sm mb-4 shadow-sm fade show">{status.success}</div>}
      {status.error && <div className="alert alert-danger text-white text-sm mb-4 shadow-sm">{status.error}</div>}

      <div className="row g-4">
        
        {/* LEFT COLUMN: Identity Card (Simplified) */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
             <div className="card-body p-4 text-center d-flex flex-column align-items-center justify-content-center">
                
                {/* Avatar - Consistent Black Background */}
                <div 
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3 bg-gradient-primary text-white shadow-sm position-relative"
                    style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
                >
                    {profile.avatar ? (
                        <img src={profile.avatar} alt="User" className="rounded-circle w-100 h-100" />
                    ) : (
                        getInitials(profile.name)
                    )}
                </div>

                {/* Profile Info */}
                <h5 className="fw-bold text-dark mb-1">
                    {status.loading && !profile.name ? "Loading..." : profile.name}
                </h5>
                <span className="badge bg-white text-secondary border mb-3">{profile.email}</span>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0 pb-0 pt-4 px-4">
               <div className="d-flex align-items-center mb-2">
                  <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md me-3 d-flex align-items-center justify-content-center" style={{width: "36px", height: "36px"}}>
                     <span className="material-symbols-rounded text-white fs-5">payments</span>
                  </div>
                  <h6 className="fw-bold mb-0 text-dark">Payroll Configuration</h6>
               </div>
            </div>

            <div className="card-body p-4">
               {/* FORM (Rendered immediately, values fill when loaded) */}
               <form onSubmit={handleSave}>
                 <div className="row g-3">
                   <div className="col-12">
                       <p className="text-sm text-muted mb-2">
                           These settings directly affect how employee pay is calculated.
                       </p>
                   </div>

                   <div className="col-md-6">
                     <label className="form-label fw-bold text-xs text-uppercase text-muted">Hourly Rate (PHP)</label>
                     <div className="input-group input-group-outline">
                       <input 
                         type="number" 
                         name="hourlyRate"
                         className="form-control shadow-none fw-bold text-dark" 
                         value={config.hourlyRate}
                         onChange={handleConfigChange}
                         required
                       />
                     </div>
                     <span className="text-xs text-muted">Base rate for calculations.</span>
                   </div>

                   <div className="col-md-6">
                     <label className="form-label fw-bold text-xs text-uppercase text-muted">Overtime Multiplier</label>
                     <div className="input-group input-group-outline">
                        <input 
                            type="number" 
                            name="otPremium"
                            step="0.01" 
                            className="form-control shadow-none fw-bold text-dark" 
                            value={config.otPremium}
                            onChange={handleConfigChange}
                            required
                        />
                     </div>
                     <span className="text-xs text-muted">Premium rate (e.g., 1.25).</span>
                   </div>

                   <div className="col-12">
                      <hr className="horizontal dark my-2" />
                      <div className="d-flex align-items-center justify-content-between mt-2 p-3 bg-light border-radius-md">
                         <div>
                           <p className="text-sm fw-bold text-dark mb-0">Currency Lock</p>
                           <p className="text-xs text-muted mb-0">System currency is locked to Philippine Peso.</p>
                         </div>
                         <span className="badge bg-white text-dark border shadow-xs">PHP (₱)</span>
                      </div>
                   </div>
                 </div>

                 {/* Save Button aligned right */}
                 <div className="mt-4 d-flex justify-content-end">
                    <button 
                      type="submit" 
                      disabled={status.saving} 
                      className="btn bg-gradient-primary shadow-sm px-4 mb-0"
                    >
                      {status.saving ? "Saving..." : "Save Changes"}
                    </button>
                 </div>
               </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}