import React, { useEffect, useState, useMemo } from "react";
import { fetchEntries } from "../api/entries";

// Helper for consistent date comparison
const toISODate = (d) => new Date(d).toISOString().split("T")[0];

export default function MyLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState({ loading: true, error: null });

  // --- 1. DYNAMIC CUTOFF LOGIC (Same as Dashboard) ---
  const { cutoffStart, cutoffEnd } = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const isFirstHalf = today.getDate() <= 15;

    return {
      cutoffStart: toISODate(new Date(year, month, isFirstHalf ? 1 : 16)),
      cutoffEnd:   toISODate(new Date(year, month, isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate()))
    };
  }, []);

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await fetchEntries();
        // Ensure data is always an array
        setLogs(Array.isArray(data) ? data : data.data || []);
        setStatus({ loading: false, error: null });
      } catch (err) {
        setStatus({ loading: false, error: "Failed to load logs." });
      }
    };
    loadEntries();
  }, []);

  // --- 3. DATA PROCESSING & MATH (Simplified) ---
  const { processedLogs, stats } = useMemo(() => {
    let totalHours = 0;
    let totalOT = 0;
    let cutoffHours = 0;

    // A. Filter & Process Logs
    const filtered = logs
      .filter((log) => log.date?.includes(searchTerm)) // Simple string search
      .map((log) => {
        const hours = Number(log.hours || 0);
        // Calculate OT automatically (Anything above 8 hours)
        const ot = Math.max(0, hours - 8);
        
        // Add to totals
        totalHours += hours;
        totalOT += ot;

        // Check if inside current cutoff
        if (log.date >= cutoffStart && log.date <= cutoffEnd) {
          cutoffHours += hours;
        }

        return { ...log, hours, ot };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort Newest First

    return {
      processedLogs: filtered,
      stats: { totalHours, totalOT, cutoffHours }
    };
  }, [logs, searchTerm, cutoffStart, cutoffEnd]);

  // --- 4. RENDER ---
  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h5 className="mb-0 text-dark fw-bold">My Logs</h5>
          <p className="text-muted small mb-0">Review and manage your work history.</p>
        </div>
        <button className="btn bg-gradient-success shadow-sm d-flex align-items-center mt-2 mt-sm-0">
          <span className="material-symbols-rounded me-2">add_circle</span> Add Log
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <SummaryCard title="Total Hours" value={`${stats.totalHours.toFixed(2)} hrs`} icon="schedule_add" color="text-success" />
        <SummaryCard title="Total Overtime" value={`${stats.totalOT.toFixed(2)} hrs`} icon="trending_up" color="text-danger" />
        <SummaryCard title="Current Cutoff" value={`${stats.cutoffHours.toFixed(2)} hrs`} icon="schedule" color="text-primary" />
      </div>

      {/* Main Content Area */}
      <div className="card shadow-sm border-radius-xl">
        <div className="card-header d-flex justify-content-between align-items-center pb-0">
          <h6 className="fw-bold text-dark mb-0">History</h6>
          <div className="input-group input-group-sm" style={{ maxWidth: "200px" }}>
            <span className="input-group-text border-0 bg-transparent"><span className="material-symbols-rounded fs-6">search</span></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search date..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="card-body px-0 pt-2">
          {status.loading ? (
             <p className="text-center text-muted py-4">Loading entries...</p>
          ) : status.error ? (
             <p className="text-center text-danger py-4">{status.error}</p>
          ) : processedLogs.length === 0 ? (
             <p className="text-center text-muted py-4">No logs found.</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="table-responsive d-none d-md-block p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7 ps-4">Date</th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">Hours</th>
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">Overtime</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7 pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedLogs.map((log) => (
                      <tr key={log.id || log.date}>
                        <td className="ps-4"><span className="text-dark text-sm">{new Date(log.date).toDateString()}</span></td>
                        <td><span className="text-dark text-sm fw-bold">{log.hours.toFixed(2)}</span></td>
                        <td>
                          <span className={`text-sm fw-bold ${log.ot > 0 ? 'text-danger' : 'text-muted'}`}>
                            {log.ot > 0 ? `+${log.ot.toFixed(2)}` : '-'}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <ActionButtons />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards (Only shows on small screens) */}
              <div className="d-md-none px-3">
                {processedLogs.map((log) => (
                  <div key={log.id || log.date} className="card border mb-3 shadow-none">
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-dark fw-bold mb-0">{new Date(log.date).toDateString()}</h6>
                        <span className="badge bg-light text-dark">{log.hours.toFixed(2)} hrs</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-end">
                        <div className="text-xs text-muted">
                           Overtime: <span className={log.ot > 0 ? "text-danger fw-bold" : ""}>{log.ot.toFixed(2)} hrs</span>
                        </div>
                        <div><ActionButtons /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS for cleaner code ---

const SummaryCard = ({ title, value, icon, color }) => (
  <div className="col-md-4 col-sm-6">
    <div className="card shadow-sm border-radius-xl h-100">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted text-uppercase small mb-1 fw-semibold">{title}</p>
          <h5 className="fw-bold text-dark mb-0">{value}</h5>
        </div>
        <span className={`material-symbols-rounded fs-1 ${color}`}>{icon}</span>
      </div>
    </div>
  </div>
);

const ActionButtons = () => (
  <>
    <button className="btn btn-link text-secondary p-0 me-3"><span className="material-symbols-rounded">edit</span></button>
    <button className="btn btn-link text-danger p-0"><span className="material-symbols-rounded">delete</span></button>
  </>
);