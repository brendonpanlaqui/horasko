import React from "react";

export default function Cutoff() {
  const cutoffs = [
    {
      period: "Oct 16-31, 2025",
      totalHours: 80,
      regularHours: 75,
      holidayHours: 5,
      overtime: 2,
      payable: "₱5,250.00",
    },
    {
      period: "Nov 1-16, 2025",
      totalHours: 76,
      regularHours: 72,
      holidayHours: 4,
      overtime: 3,
      payable: "₱4,987.50",
    },
  ];

  const totalHours = cutoffs.reduce((sum, c) => sum + c.totalHours, 0);
  const totalOvertime = cutoffs.reduce((sum, c) => sum + c.overtime, 0);
  const currentCutoffPayable = cutoffs[cutoffs.length - 1].payable;

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
                      Current Cutoff Payable
                    </p>
                    <h6 className="fw-bold text-dark mb-0">{currentCutoffPayable}</h6>
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
                    <h6 className="fw-bold text-dark mb-0">{totalHours} hrs</h6>
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
                      Total Overtime
                    </p>
                    <h6 className="fw-bold text-dark mb-0">{totalOvertime} hrs</h6>
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
                Work hours and pay details per cutoff
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Cutoff Period
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Total Hours
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Regular Hours
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Holiday Hours
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
                    {cutoffs.map((c, index) => (
                      <tr key={index}>
                        <td className="text-dark text-sm fw-semibold">{c.period}</td>
                        <td className="text-end fw-bold text-dark text-sm">{c.totalHours}</td>
                        <td className="text-end fw-bold text-dark text-sm">{c.regularHours}</td>
                        <td className="text-end fw-bold text-dark text-sm">{c.holidayHours}</td>
                        <td className="text-end fw-bold text-dark text-sm">{c.overtime}</td>
                        <td className="text-end fw-bold text-success text-sm">{c.payable}</td>
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
          {cutoffs.map((c, index) => (
            <div
              key={index}
              className="border rounded-3 p-3 mb-3 shadow-sm bg-white"
            >
              <h6 className="fw-bold text-dark mb-2">{c.period}</h6>
              <p className="text-muted small mb-1">
                Total Hours: <span className="fw-bold text-dark">{c.totalHours}</span>
              </p>
              <p className="text-muted small mb-1">
                Regular Hours: <span className="fw-bold text-dark">{c.regularHours}</span>
              </p>
              <p className="text-muted small mb-1">
                Holiday Hours: <span className="fw-bold text-dark">{c.holidayHours}</span>
              </p>
              <p className="text-muted small mb-1">
                Overtime: <span className="fw-bold text-dark">{c.overtime}</span>
              </p>
              <p className="text-muted small mb-0">
                Pay: <span className="fw-bold text-success">{c.payable}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="col-12 text-center text-muted small mt-3">
          <p className="mb-0">
            Showing data for current and previous cutoffs. Use “View History” for full payroll review.
          </p>
        </div>
      </div>
    </div>
  );
}
