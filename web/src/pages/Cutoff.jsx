import React from "react";

export default function Cutoff() {
  const cutoffs = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      hours: 80,
      overtime: 5,
      pay: "₱5,250.00",
      image: "../assets/img/team-2.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      hours: 76,
      overtime: 2,
      pay: "₱4,987.50",
      image: "../assets/img/team-4.jpg",
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
          <div>
            <h5 className="fw-bold text-dark mb-1">Cutoff Summary</h5>
            <p className="text-muted small mb-0">
              Review total hours, overtime, and pay for this payroll period.
            </p>
          </div>
          <button className="btn bg-gradient-primary shadow-sm d-flex align-items-center mt-2 mt-sm-0">
            <span className="material-symbols-rounded me-2">history</span>
            View History
          </button>
        </div>

        {/* Summary Cards */}
        <div className="col-12 mb-4">
          <div className="row g-3">
            <div className="col-md-4 col-sm-6">
              <div className="card shadow-sm border-radius-xl h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted text-uppercase small mb-1 fw-semibold">
                      Current Cutoff
                    </p>
                    <h6 className="fw-bold text-dark mb-0">
                      Oct 16 – Oct 31, 2025
                    </h6>
                  </div>
                  <span className="material-symbols-rounded text-primary fs-2">
                    schedule
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="card shadow-sm border-radius-xl h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted text-uppercase small mb-1 fw-semibold">
                      Total Hours
                    </p>
                    <h6 className="fw-bold text-dark mb-0">156 hrs</h6>
                  </div>
                  <span className="material-symbols-rounded text-success fs-2">
                    schedule_add
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="card shadow-sm border-radius-xl h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted text-uppercase small mb-1 fw-semibold">
                      Overtime
                    </p>
                    <h6 className="fw-bold text-dark mb-0">8 hrs</h6>
                  </div>
                  <span className="material-symbols-rounded text-info fs-2">
                    trending_up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table (Desktop) */}
        <div className="col-12 mb-4 d-none d-md-block">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header d-flex justify-content-between align-items-center pb-0">
              <h6 className="fw-bold text-dark mb-0">Cutoff Breakdown</h6>
              <div className="d-flex align-items-center text-muted small">
                <span className="material-symbols-rounded me-1">info</span>
                Employee work hours and pay details
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Employee
                      </th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Email
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Hours
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Overtime
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutoffs.map((cutoff, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center">
                          <img
                            src={cutoff.image}
                            alt={cutoff.name}
                            className="avatar avatar-sm me-2 border-radius-lg"
                          />
                          <span className="text-dark text-sm fw-semibold">
                            {cutoff.name}
                          </span>
                        </td>
                        <td>
                          <span className="text-muted text-sm">{cutoff.email}</span>
                        </td>
                        <td className="text-end fw-bold text-dark text-sm">
                          {cutoff.hours}
                        </td>
                        <td className="text-end fw-bold text-dark text-sm">
                          {cutoff.overtime}
                        </td>
                        <td className="text-end fw-bold text-success text-sm">
                          {cutoff.pay}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="col-12 d-md-none">
          {cutoffs.map((cutoff, index) => (
            <div
              key={index}
              className="border rounded-3 p-3 mb-3 shadow-sm bg-white"
            >
              <div className="d-flex align-items-center mb-2">
                <img
                  src={cutoff.image}
                  alt={cutoff.name}
                  className="avatar avatar-sm me-2 border-radius-lg"
                />
                <div>
                  <h6 className="fw-bold text-dark mb-0">{cutoff.name}</h6>
                  <p className="text-muted small mb-0">{cutoff.email}</p>
                </div>
              </div>
              <p className="text-muted small mb-1">
                Hours: <span className="fw-bold text-dark">{cutoff.hours}</span>
              </p>
              <p className="text-muted small mb-1">
                Overtime:{" "}
                <span className="fw-bold text-dark">{cutoff.overtime}</span>
              </p>
              <p className="text-muted small mb-0">
                Pay: <span className="fw-bold text-success">{cutoff.pay}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="col-12 text-center text-muted small mt-3">
          <p className="mb-0">
            Showing data for current cutoff only. Use “View History” to review
            previous payrolls.
          </p>
        </div>
      </div>
    </div>
  );
}
