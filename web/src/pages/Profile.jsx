import React from "react";

export default function Profile() {
  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-dark mb-1">My Profile</h5>
          <p className="text-muted small mb-0">
            Manage your account information and preferences
          </p>
        </div>
        <button className="btn bg-gradient-primary shadow-sm d-flex align-items-center">
          <span className="material-symbols-rounded me-2">edit</span>
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
            <img
              src="../assets/img/team-2.jpg"
              alt="profile"
              className="rounded-circle me-md-4 mb-3 mb-md-0"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h5 className="fw-bold mb-0">John Doe</h5>
              <p className="text-muted small mb-0">john@example.com</p>
            </div>
          </div>

          {/* Form */}
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <span className="material-symbols-rounded text-primary">
                      person
                    </span>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 shadow-none"
                    defaultValue="John Doe"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <span className="material-symbols-rounded text-primary">
                      mail
                    </span>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 shadow-none"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">
                  Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <span className="material-symbols-rounded text-primary">
                      call
                    </span>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 shadow-none"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">
                  Position / Role
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <span className="material-symbols-rounded text-primary">
                      work
                    </span>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 shadow-none"
                    defaultValue="Employee"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button
                type="submit"
                className="btn bg-gradient-success shadow-sm d-flex align-items-center"
              >
                <span className="material-symbols-rounded me-2">save</span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-header bg-light d-flex align-items-center">
          <span className="material-symbols-rounded text-dark me-2">lock</span>
          <h6 className="mb-0 fw-bold">Change Password</h6>
        </div>
        <div className="card-body p-4">
          <form>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-muted fw-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-none"
                  placeholder="Enter current password"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-muted fw-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-none"
                  placeholder="Enter new password"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-muted fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-none"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button
                type="button"
                className="btn bg-gradient-primary shadow-sm d-flex align-items-center"
              >
                <span className="material-symbols-rounded me-2">key</span>
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
