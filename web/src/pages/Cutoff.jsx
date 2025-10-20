import React from "react";

export default function Cutoff() {
  const cutoffs = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      hours: 80,
      overtime: 5,
      pay: "$800",
      image: "../assets/img/team-2.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      hours: 76,
      overtime: 2,
      pay: "$760",
      image: "../assets/img/team-4.jpg",
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold text-dark mb-1">Cutoff Summary</h5>
            <p className="text-muted small mb-0">
              Review work hours, overtime, and pay for the current cutoff period.
            </p>
          </div>
          <button className="btn bg-gradient-primary shadow-sm d-flex align-items-center">
            <span className="material-symbols-rounded me-2">history</span>
            View History
          </button>
        </div>

        {/* Summary Cards */}
        <div className="col-12 mb-4">
          <div className="row g-3">
            <div className="col-xl-4 col-sm-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-sm text-muted mb-1 fw-semibold">
                      Current Cutoff
                    </p>
                    <h6 className="fw-bold text-dark mb-0">
                      Sept 1 - Sept 15, 2025
                    </h6>
                  </div>
                  <span className="material-symbols-rounded text-primary fs-2">
                    schedule
                  </span>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-sm text-muted mb-1 fw-semibold">
                      Total Hours
                    </p>
                    <h6 className="fw-bold text-dark mb-0">80</h6>
                  </div>
                  <span className="material-symbols-rounded text-success fs-2">
                    schedule_add
                  </span>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-sm text-muted mb-1 fw-semibold">
                      Overtime
                    </p>
                    <h6 className="fw-bold text-dark mb-0">5 hrs</h6>
                  </div>
                  <span className="material-symbols-rounded text-info fs-2">
                    trending_up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cutoff Table */}
        <div className="col-12">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="fw-bold text-dark mb-0">Cutoff Breakdown</h6>
              <div className="d-flex align-items-center">
                <span className="material-symbols-rounded text-muted me-2">
                  info
                </span>
                <p className="text-sm text-muted mb-0">Employee hours and pay</p>
              </div>
            </div>

            <div className="card-body px-3 pt-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Employee
                      </th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Total Hours
                      </th>
                      <th className="text-center text-secondary text-xs font-weight-bolder opacity-7">
                        Overtime
                      </th>
                      <th className="text-center text-secondary text-xs font-weight-bolder opacity-7">
                        Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutoffs.map((c, i) => (
                      <tr key={i}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={c.image}
                              alt={c.name}
                              className="avatar avatar-sm me-3 border-radius-lg"
                            />
                            <div className="d-flex flex-column">
                              <h6 className="mb-0 text-sm">{c.name}</h6>
                              <p className="text-xs text-muted mb-0">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-sm fw-bold text-dark mb-0">
                            {c.hours}
                          </p>
                          <p className="text-xs text-muted mb-0">Hours</p>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-gradient-success">
                            {c.overtime}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-dark text-sm fw-bold">
                            {c.pay}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
