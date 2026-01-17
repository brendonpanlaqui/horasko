import React, { useState, useEffect, useMemo } from "react";
import { fetchEntries, saveEntry } from "../api/entries";
import { fetchHolidays } from "../api/holidays"; 

// Helper to ensure we compare dates without Time/Timezone interference
const toISODate = (date) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split("T")[0];
};

export default function Dashboard() {
  // --- 1. SETUP & CONFIGURATION ---
  // We use a stable reference for "now" to avoid second-tick re-renders
  const today = useMemo(() => new Date(), []);
  const hourlyWage = 70;

  // --- 2. STATE MANAGEMENT ---
  const [workEntries, setWorkEntries] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [status, setStatus] = useState({ loading: true, saving: false });
  const [alert, setAlert] = useState(null);
  
  const [dateInput, setDateInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");

  // --- 3. DERIVED STATE (The Fix for your Bug) ---
  // We calculate cutoff synchronusly. No useEffect needed. 
  // This ensures 'payrollStart' is correct on the very first render.
  const { payrollStart, payrollEnd, currentCutoffLabel, payrollStartDate, maxAllowedDate } = useMemo(() => {
    const day = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Determine 1st or 2nd half of month
    const isFirstCutoff = day <= 15;
    const startDay = isFirstCutoff ? 1 : 16;
    const endDay = isFirstCutoff ? 15 : new Date(year, month + 1, 0).getDate();

    // Construct Date Objects
    const pStart = new Date(year, month, startDay);
    const pEnd = new Date(year, month, endDay);
    
    // Max date is either the cutoff end OR today (cannot log future)
    const maxDate = pEnd > today ? today : pEnd;

    return {
      payrollStart: startDay,
      payrollEnd: endDay,
      currentCutoffLabel: `${startDay}-${endDay}`,
      payrollStartDate: pStart,
      maxAllowedDate: maxDate
    };
  }, [today]);

  // --- 4. DATA FETCHING ---
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // Parallel fetching for performance
        const [entriesData, holidaysData] = await Promise.all([
          fetchEntries(),
          fetchHolidays()
        ]);

        if (isMounted) {
          setWorkEntries(entriesData.map((e) => ({ ...e, hours: Number(e.hours) })));
          setHolidays(holidaysData || []);
          setStatus((prev) => ({ ...prev, loading: false }));
        }
      } catch (err) {
        if (isMounted) {
          setAlert({ type: "danger", message: "Failed to load data." });
          setStatus((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  // --- 5. HANDLERS ---
  const formatDateLocal = (date) => toISODate(date);

  const addEntry = async () => {
    setAlert(null); // Clear previous alerts
    
    const date = dateInput;
    const hours = parseFloat(hoursInput);
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(today);

    // Validation
    if (!date) {
      setAlert({
        type: "danger",
        message: `Please select a date from ${monthName} ${payrollStart} up to today for this cutoff (${currentCutoffLabel}).`,
      });
      return;
    }

    // String comparison is safer than Date object comparison for boundaries
    if (date < toISODate(payrollStartDate) || date > toISODate(maxAllowedDate)) {
      setAlert({ type: "danger", message: "Inputted date is outside current cutoff." });
      return;
    }

    if (isNaN(hours) || hours <= 0 || hours > 24) {
      setAlert({ type: "danger", message: "Please enter valid work hours (1–24)." });
      return;
    }

    setStatus((prev) => ({ ...prev, saving: true }));

    try {
      const payload = { date, hours };
      const saved = await saveEntry(payload);

      // Handle backend response or fallback to payload
      const savedEntry = (saved && (saved.entry || saved.data || saved)) || payload;
      const normalized = { ...savedEntry, hours: Number(savedEntry.hours ?? hours) };

      // Optimistic UI Update
      setWorkEntries((prev) => {
        const filtered = prev.filter((e) => e.date !== normalized.date);
        return [...filtered, normalized];
      });

      setAlert({ type: "success", message: "Entry saved successfully!" });
      setDateInput("");
      setHoursInput("");
    } catch (err) {
      setAlert({ type: "danger", message: err.message || "Failed to save entry." });
    } finally {
      setStatus((prev) => ({ ...prev, saving: false }));
    }
  };

  // --- 6. CALCULATIONS (Summaries) ---
  const totalHours = workEntries.reduce((acc, cur) => acc + (cur.hours || 0), 0);

  const estimatedPay = workEntries.reduce((acc, entry) => {
    const holiday = holidays.find((h) => h.date === entry.date);
    const multiplier = holiday?.multiplier || 1;
    return acc + (entry.hours || 0) * hourlyWage * multiplier;
  }, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const hoursThisWeek = workEntries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((acc, cur) => acc + (cur.hours || 0), 0);

  const averageDailyHours = workEntries.length > 0 ? (totalHours / workEntries.length).toFixed(2) : 0;

  // --- 7. EXACT UI RENDER ---
  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-dark fw-bold">Dashboard</h5>
            <span className="badge bg-gradient-info shadow">
              Current Cutoff: {currentCutoffLabel}
            </span>
          </div>
          <p className="text-muted small mb-0">
            Track your work hours, weekly stats, and estimated pay within this cutoff period.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-radius-xl text-center">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small">Total Hours</h6>
              <h4 className="fw-bold text-dark mb-0">{totalHours.toFixed(2)} hrs</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-radius-xl text-center">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small">Hours This Week</h6>
              <h4 className="fw-bold text-dark mb-0">{hoursThisWeek.toFixed(2)} hrs</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-radius-xl text-center">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small">Avg Daily Hours</h6>
              <h4 className="fw-bold text-dark mb-0">{averageDailyHours} hrs/day</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-radius-xl text-center bg-gradient-success text-white">
            <div className="card-body">
              <h6 className="text-uppercase small mb-1">Payroll Summary</h6>
              <p className="mb-0">₱{estimatedPay.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Add Work Entry */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header pb-0">
              <h6 className="text-dark fw-bold">Add Work Entry</h6>
            </div>
            <div className="card-body">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                min={formatDateLocal(payrollStartDate)}
                max={formatDateLocal(maxAllowedDate)}
              />
              <label className="form-label">Hours Worked</label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="e.g. 8"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                min={1}
                max={24}
              />
              <button
                className="btn bg-gradient-primary w-100"
                onClick={addEntry}
                disabled={status.saving}
              >
                {status.saving ? "Saving..." : "Add / Update"}
              </button>
            </div>
          </div>
        </div>

        {/* Work Entries Table */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-radius-xl">
            <div className="card-header pb-0">
              <h6 className="text-dark fw-bold">Your Entries</h6>
            </div>
            <div className="card-body">
              {status.loading ? (
                <p className="text-muted mb-0">Loading...</p>
              ) : workEntries.length === 0 ? (
                <p className="text-muted mb-0">No entries yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-secondary text-xs font-weight-bolder opacity-7">Date</th>
                        <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workEntries
                        .slice()
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((entry) => {
                          const holiday = holidays.find(h => h.date === entry.date);
                          return (
                            <tr key={entry.date}>
                              <td>
                                <span className="text-dark text-sm">
                                  {new Date(entry.date).toDateString()}
                                </span>
                                {holiday && (
                                  <span className="badge bg-warning ms-2">
                                    x{holiday.multiplier}
                                  </span>
                                )}
                              </td>
                              <td className="text-end text-dark text-sm fw-bold">
                                {Number(entry.hours).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alert && (
          <div className="col-12 mt-3">
            <div className={`alert alert-${alert.type} border-radius-md shadow-sm`} role="alert">
              {alert.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}