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
    <div className="container-fluid py-3">
      <div className="row gy-3">
        {/* Header */}
        <div className="col-12">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
            <div>
              <h5 className="mb-1 fw-bold text-dark">My Logs</h5>
              <p className="text-muted small mb-0">
                Review, edit, or remove your recorded work hours.
              </p>
            </div>
            <button className="btn bg-gradient-success shadow-sm mt-2 mt-sm-0 d-flex align-items-center">
              <span className="material-symbols-rounded me-2">add_circle</span>
              Add Log
            </button>
          </div>
        </div>

        {/* Logs Card */}
        <div className="col-12">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
              <h6 className="text-dark fw-bold mb-2 mb-sm-0">Work Hours Logs</h6>
              <div className="d-flex align-items-center w-100 w-sm-auto">
                <span className="material-symbols-rounded text-muted me-2">
                  search
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by date or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>

            <div className="card-body">
              {/* Desktop Table */}
              <div className="table-responsive d-none d-md-block">
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
                            <span className="text-muted text-sm">{log.notes}</span>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2 d-inline-flex align-items-center">
                              <span className="material-symbols-rounded">edit</span>
                            </button>
                            <button className="btn btn-sm btn-outline-danger d-inline-flex align-items-center">
                              <span className="material-symbols-rounded">delete</span>
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

              {/* Mobile Cards */}
              <div className="d-md-none">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="border rounded-3 p-3 mb-3 shadow-sm bg-white"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold text-dark mb-1">
                            {new Date(log.date).toDateString()}
                          </h6>
                          <p className="text-muted mb-1">
                            Hours Worked:{" "}
                            <span className="fw-bold">{log.hours}</span>
                          </p>
                          <p className="text-muted small mb-2">
                            Notes: {log.notes}
                          </p>
                        </div>
                        <div className="d-flex">
                          <button className="btn btn-sm btn-outline-primary me-2 d-inline-flex align-items-center">
                            <span className="material-symbols-rounded">edit</span>
                          </button>
                          <button className="btn btn-sm btn-outline-danger d-inline-flex align-items-center">
                            <span className="material-symbols-rounded">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted py-3">No logs found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
