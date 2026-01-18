import React, { useState, useEffect } from "react";
import { getMe } from "../api/auth";

// --- HELPERS ---
const getInitials = (name) => {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
};

export default function Profile() {
  // --- STATE ---
  // Initial state acts as the "Default Values"
  const [formData, setFormData] = useState({
    id: null, 
    name: "",      // Starts empty, fills on load
    email: "...",  // Starts as "...", fills on load
    avatar: null, 
    isGoogleUser: false,
  });

  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [status, setStatus] = useState({ loading: true, savingProfile: false, success: null, error: null });

  // --- FETCH DATA ---
  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const response = await getMe(); 
        if (isMounted && response) {
            const data = response.data || response; 
            
            // Updates state with real data
            setFormData({
                id: data.id,
                name: data.name || "",
                email: data.email || "",
                avatar: data.avatar || null,
                isGoogleUser: !!data.google_id || (data.avatar && data.avatar.includes("googleusercontent"))
            });
            setStatus({ loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) setStatus({ loading: false, error: "Failed to load profile." });
      }
    };
    loadProfile();
    return () => { isMounted = false; };
  }, []);

  // --- HANDLERS ---
  const handleProfileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setStatus({ ...status, savingProfile: true, success: null, error: null });
    
    // Simulate API delay
    setTimeout(() => {
        setStatus({ ...status, savingProfile: false, success: "Profile updated successfully!" });
    }, 800);
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="fw-bold text-dark mb-1">My Profile</h5>
          <p className="text-muted small mb-0">Manage your account information.</p>
        </div>
      </div>

      {status.success && <div className="alert alert-success text-white text-sm mb-4 shadow-sm fade show">{status.success}</div>}
      {status.error && <div className="alert alert-danger text-white text-sm mb-4 shadow-sm">{status.error}</div>}

      <div className="row g-4">
        
        {/* LEFT COLUMN: Profile Details */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0 pb-0 pt-4 px-4">
                 <h6 className="fw-bold mb-0 text-dark">Profile Information</h6>
            </div>
            
            <div className="card-body p-4">
              
              {/* Avatar Header */}
              <div className="d-flex flex-column flex-sm-row align-items-center mb-5 p-3 rounded-3 bg-light border border-dashed">
                <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-sm-4 mb-3 mb-sm-0 bg-white border shadow-sm position-relative overflow-hidden"
                    style={{ width: "80px", height: "80px", flexShrink: 0 }}
                >
                    {formData.avatar ? (
                        <img src={formData.avatar} alt="Profile" className="rounded-circle w-100 h-100" />
                    ) : (
                        <div className="w-100 h-100 bg-gradient-primary d-flex align-items-center justify-content-center text-white fw-bold fs-2">
                            {getInitials(formData.name)}
                        </div>
                    )}
                </div>

                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-1 text-dark">
                      {formData.name || <span className="text-muted">Loading...</span>}
                  </h5>
                  <div className="d-flex justify-content-center justify-content-sm-start gap-2">
                    <span className="badge bg-white text-secondary border">{formData.email}</span>
                    
                    {formData.isGoogleUser && (
                        <span className="badge bg-white text-dark border d-flex align-items-center">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{width:12, marginRight:4}}/>
                            Google Account
                        </span>
                    )}
                  </div>
                </div>
              </div>

              {/* --- UPDATED FORM SECTION --- */}
              <form onSubmit={handleSaveProfile}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold text-xs text-uppercase text-muted">Full Name</label>
                        <input type="text" name="name" className="form-control shadow-none" value={formData.name} onChange={handleProfileChange} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label fw-bold text-xs text-uppercase text-muted">Email</label>
                        <input type="text" className="form-control bg-light shadow-none" value={formData.email} readOnly />
                    </div>
                </div>
                
                <div className="mt-4 d-flex justify-content-end">
                    <button type="submit" disabled={status.savingProfile} className="btn bg-gradient-success shadow-sm px-4">
                    {status.savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                </div>
              </form>
              {/* --- END UPDATED FORM SECTION --- */}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Security */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom pb-0 pt-4 px-4">
              <div className="d-flex align-items-center mb-2">
                 <div className="icon icon-shape bg-gradient-warning shadow text-center border-radius-md me-3 d-flex align-items-center justify-content-center" style={{width: "36px", height: "36px"}}>
                    <span className="material-symbols-rounded text-white fs-5">lock</span>
                 </div>
                 <h6 className="fw-bold mb-0 text-dark">Security</h6>
              </div>
            </div>
            
            <div className="card-body p-4">
              {formData.isGoogleUser ? (
                <div className="text-center py-4">
                    <span className="material-symbols-rounded text-secondary fs-1 mb-3">g_id_collab</span>
                    <h6 className="fw-bold text-dark">Managed by Google</h6>
                    <p className="text-sm text-muted mb-0">
                        You signed in using your Google account.
                    </p>
                    <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm mt-3">
                        Go to Google Account
                    </a>
                </div>
              ) : (
                <>
                  <p className="text-xs text-muted mb-4">
                    Ensure your account is using a long, random password to stay secure.
                  </p>
                  <form>
                    <div className="mb-3">
                      <label className="form-label text-xs fw-bold text-uppercase text-muted">Current Password</label>
                      <input type="password" name="current" className="form-control shadow-none" value={passwordData.current} onChange={handlePasswordChange} disabled={status.loading} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-xs fw-bold text-uppercase text-muted">New Password</label>
                      <input type="password" name="new" className="form-control shadow-none" value={passwordData.new} onChange={handlePasswordChange} disabled={status.loading} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-xs fw-bold text-uppercase text-muted">Confirm Password</label>
                      <input type="password" name="confirm" className="form-control shadow-none" value={passwordData.confirm} onChange={handlePasswordChange} disabled={status.loading} />
                    </div>
                    <button type="button" className="btn bg-gradient-primary shadow-sm w-100 mb-0 d-flex align-items-center justify-content-center" disabled={status.loading}>
                      <span className="material-symbols-rounded me-2 fs-6">lock_reset</span>
                      Update Password
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}