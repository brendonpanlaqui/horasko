import React, { useState, useEffect, useMemo } from "react";
import { fetchEntries, saveEntry } from "../api/entries";
import { fetchHolidays } from "../api/holidays"; 

export default function Dashboard() {
  const today = useMemo(() => new Date(), []);

  const [workEntries, setWorkEntries] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");

  // Payroll cutoff
  const [payrollStart, setPayrollStart] = useState(1);
  const [payrollEnd, setPayrollEnd] = useState(15);
  const [currentCutoffLabel, setCurrentCutoffLabel] = useState("1-15");

  const hourlyWage = 68.75;

  // Determine current cutoff
  useEffect(() => {
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    if (day <= 15) {
      setPayrollStart(1);
      setPayrollEnd(15);
      setCurrentCutoffLabel("1-15");
    } else {
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      setPayrollStart(16);
      setPayrollEnd(lastDayOfMonth);
      setCurrentCutoffLabel(`16-${lastDayOfMonth}`);
    }
  }, [today]);

  const payrollStartDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), payrollStart),
    [today, payrollStart]
  );
  const payrollEndDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), payrollEnd),
    [today, payrollEnd]
  );
  const maxAllowedDate = payrollEndDate > today ? today : payrollEndDate;

  const formatDateLocal = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Load entries
  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      try {
        const data = await fetchEntries();
        setWorkEntries(
          data.map((e) => ({ ...e, hours: Number(e.hours) }))
        );
      } catch (err) {
        setAlert({ type: "danger", message: err || "Failed to load entries." });
      } finally {
        setLoading(false);
      }
    };

    const loadHolidays = async () => {
      try {
        const data = await fetchHolidays(); 
        setHolidays(data);
      } catch (err) {
        console.error("Failed to load holidays", err);
      }
    };

    loadEntries();
    loadHolidays();
  }, []);

  const addEntry = async () => {
    const date = dateInput;
    const hours = parseFloat(hoursInput);
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(today);

    if (!date) {
      setAlert({
        type: "danger",
        message: `Please select a date from ${monthName} ${payrollStart} up to today for this cutoff (${currentCutoffLabel}).`,
      });
      return;
    }

    const selectedDate = new Date(date);
    if (selectedDate < payrollStartDate || selectedDate > maxAllowedDate) {
      setAlert({ type: "danger", message: "Inputted date is outside current cutoff." });
      return;
    }

    if (isNaN(hours) || hours <= 0 || hours > 24) {
      setAlert({ type: "danger", message: "Please enter valid work hours (1–24)." });
      return;
    }

    setIsSaving(true);
    try {
      const payload = { date, hours };
      const saved = await saveEntry(payload);

      const savedEntry = (saved && (saved.entry || saved.data || saved)) || payload;
      const normalized = { ...savedEntry, hours: Number(savedEntry.hours ?? hours) };

      setWorkEntries((prev) => {
        const filtered = prev.filter((e) => e.date !== normalized.date);
        return [...filtered, normalized];
      });

      setAlert({ type: "success", message: "Entry saved successfully!" });
      setDateInput("");
      setHoursInput("");
    } catch (err) {
      setAlert({ type: "danger", message: err || "Failed to save entry." });
    } finally {
      setIsSaving(false);
    }
  };

  // --- Summaries ---
  const totalHours = workEntries.reduce((acc, cur) => acc + Number(cur.hours || 0), 0);

  // Compute estimated pay with holiday multiplier
  const estimatedPay = workEntries.reduce((acc, entry) => {
    const holiday = holidays.find((h) => h.date === entry.date);
    const multiplier = holiday?.multiplier || 1;
    return acc + Number(entry.hours || 0) * hourlyWage * multiplier;
  }, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const hoursThisWeek = workEntries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((acc, cur) => acc + Number(cur.hours || 0), 0);

  const averageDailyHours = workEntries.length > 0 ? (totalHours / workEntries.length).toFixed(2) : 0;

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
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Add / Update"}
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
              {loading ? (
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
