import React, { useEffect, useState, useMemo } from "react";
import { fetchEntries } from "../api/entries";

export default function MyLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = useMemo(() => new Date(), []);

  // Fetch all entries
  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        const data = await fetchEntries();
        setLogs(Array.isArray(data) ? data : data.data || []);
      } catch {
        setError("Failed to load work entries.");
      } finally {
        setLoading(false);
      }
    };
    loadEntries();
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Summary Calculations
  const totalHours = logs.reduce((sum, log) => sum + Number(log.hours), 0);
  const totalOvertime = logs.reduce((sum, log) => sum + Number(log.overtime || 0), 0);
  const cutoffHours = logs
    .filter((log) => {
      const date = new Date(log.date);
      // Example cutoff (dynamic logic can replace these static dates)
      const cutoffStart = new Date("2025-10-16");
      const cutoffEnd = new Date("2025-10-31");
      return date >= cutoffStart && date <= cutoffEnd;
    })
    .reduce((sum, log) => sum + Number(log.hours), 0);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h5 className="mb-0 text-dark fw-bold">My Logs</h5>
            <p className="text-muted small mb-0">
              Review, edit, or delete your recorded work hours.
            </p>
          </div>
          <button className="btn bg-gradient-success shadow-sm d-flex align-items-center mt-3 mt-sm-0">
            <span className="material-symbols-rounded me-2">add_circle</span>
            Add Log
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { title: "Total Hours", value: `${totalHours.toFixed(2)} hrs`, icon: "schedule_add", color: "text-success" },
          { title: "Total Overtime", value: `${totalOvertime.toFixed(2)} hrs`, icon: "trending_up", color: "text-info" },
          { title: "Current Cutoff Hours", value: `${cutoffHours.toFixed(2)} hrs`, icon: "schedule", color: "text-primary" },
        ].map((card, i) => (
          <div key={i} className="col-md-4 col-sm-6">
            <div className="card shadow-sm border-radius-xl h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted text-uppercase small mb-1 fw-semibold">{card.title}</p>
                  <h6 className="fw-bold text-dark mb-0">{card.value}</h6>
                </div>
                <span className={`material-symbols-rounded fs-2 ${card.color}`}>{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="row mb-4 d-none d-md-block">
        <div className="col-12">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header d-flex justify-content-between align-items-center pb-0">
              <h6 className="fw-bold text-dark mb-2">Work Hour Logs</h6>
              <div className="d-flex align-items-center pb-3">
                <span className="material-symbols-rounded text-muted me-2">search</span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>
            <div className="card-body pt-0">
              {loading && <p className="text-center text-muted py-3">Loading entries...</p>}
              {error && <p className="text-center text-danger py-3">{error}</p>}
              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-secondary text-xs font-weight-bolder opacity-7">Date</th>
                        <th className="text-secondary text-xs font-weight-bolder opacity-7">Hours Worked</th>
                        <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Overtime</th>
                        <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length > 0 ? (
                        filteredLogs
                          .slice()
                          .sort((a, b) => new Date(a.date) - new Date(b.date))
                          .map((log) => (
                            <tr key={log.id || log.date}>
                              <td><span className="text-dark text-sm">{new Date(log.date).toDateString()}</span></td>
                              <td><span className="text-dark text-sm fw-bold">{Number(log.hours).toFixed(2)}</span></td>
                              <td className="text-end fw-bold text-dark text-sm">{Number(log.overtime || 0)}</td>
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
                          <td colSpan="4" className="text-center text-muted py-4">No logs found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="row d-md-none">
        {!loading && !error && (
          <>
            {filteredLogs.length > 0 ? (
              filteredLogs
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((log) => (
                  <div key={log.id || log.date} className="col-12 mb-3">
                    <div className="card shadow-sm border-radius-xl p-3 h-100">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                          <h6 className="text-dark fw-bold mb-1">
                            {new Date(log.date).toDateString()}
                          </h6>
                          <div className="d-flex gap-3 mt-1">
                            <div className="text-center">
                              <p className="text-muted small mb-1">Hours</p>
                              <h6 className="fw-bold text-dark mb-0">
                                {Number(log.hours).toFixed(2)}
                              </h6>
                            </div>
                            <div className="text-center">
                              <p className="text-muted small mb-1">Overtime</p>
                              <h6 className="fw-bold text-dark mb-0">
                                {Number(log.overtime || 0)}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-2 mt-3 mt-sm-0">
                          <button className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center">
                            <span className="material-symbols-rounded fs-5">edit</span>
                          </button>
                          <button className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center">
                            <span className="material-symbols-rounded fs-5">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-muted py-3 mb-0">No logs found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
