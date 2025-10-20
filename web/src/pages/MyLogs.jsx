import React, { useState } from "react";

export default function MyLogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const logs = [
    { id: 1, date: "2025-09-01", hours: 8, notes: "Project A" },
    { id: 2, date: "2025-09-02", hours: 7, notes: "Project B" },
    { id: 3, date: "2025-09-03", hours: 6, notes: "Documentation" },
  ];

  const filteredLogs = logs.filter(
    (log) =>
      log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.includes(searchTerm)
  );

  return (
    <div className="container-fluid py-2">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-dark fw-bold">My Logs</h5>
            <button className="btn bg-gradient-success shadow-sm d-flex align-items-center">
              <span className="material-symbols-rounded me-2">add_circle</span>
              Add Log
            </button>
          </div>
          <p className="text-muted small mb-0">
            Review, edit, or remove your recorded work hours.
          </p>
        </div>

        {/* Logs Table Card */}
        <div className="col-12">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="text-dark fw-bold mb-0">Work Hours Logs</h6>
              <div className="d-flex align-items-center">
                <span className="material-symbols-rounded text-muted me-2">
                  search
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by date or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: "220px" }}
                />
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Hours Worked
                      </th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">
                        Notes
                      </th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <span className="text-dark text-sm">
                              {new Date(log.date).toDateString()}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark text-sm fw-bold">
                              {log.hours}
                            </span>
                          </td>
                          <td>
                            <span className="text-muted text-sm">
                              {log.notes}
                            </span>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2 d-inline-flex align-items-center">
                              <span className="material-symbols-rounded">
                                edit
                              </span>
                            </button>
                            <button className="btn btn-sm btn-outline-danger d-inline-flex align-items-center">
                              <span className="material-symbols-rounded">
                                delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">
                          No logs found.
                        </td>
                      </tr>
                    )}
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
