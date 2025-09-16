import React, { useState, useEffect, useMemo } from "react";

export default function Dashboard() {
  const today = new Date();

  // Payroll cutoff state
  const [payrollStart, setPayrollStart] = useState(1);
  const [payrollEnd, setPayrollEnd] = useState(15);
  const [currentCutoffLabel, setCurrentCutoffLabel] = useState("1-15");

  const payrollStartDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), payrollStart),
    [payrollStart]
  );

  const payrollEndDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), payrollEnd),
    [payrollEnd]
  );

  const maxAllowedDate = payrollEndDate > today ? today : payrollEndDate;

  // Form and entries state
  const [dateInput, setDateInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");
  const [workEntries, setWorkEntries] = useState([]);

  // Alerts
  const [alert, setAlert] = useState(null);

  const hourlyWage = 65.625;

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
  }, []);

  const addEntry = () => {
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

    if (isNaN(hours) || hours <= 0) {
      setAlert({ type: "danger", message: "Please enter hours greater than zero." });
      return;
    }

    const newEntry = { date, hours };
    const updatedEntries = [...workEntries.filter((e) => e.date !== date), newEntry];

    setWorkEntries(updatedEntries);
    setAlert({ type: "success", message: "Entry added/updated!" });

    setDateInput("");
    setHoursInput("");
  };

  const totalHours = workEntries.reduce((acc, cur) => acc + cur.hours, 0);
  const estimatedPay = totalHours * hourlyWage;

  // Extra UX: Weekly hours & average daily
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  const hoursThisWeek = workEntries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((acc, cur) => acc + cur.hours, 0);

  const averageDailyHours =
    workEntries.length > 0 ? (totalHours / workEntries.length).toFixed(2) : 0;

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

        {/* Quick Stats - 4 Cards */}
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
                min={payrollStartDate.toISOString().split("T")[0]}
                max={maxAllowedDate.toISOString().split("T")[0]}
              />
              <label className="form-label">Hours Worked</label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="e.g. 8"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
              />
              <button className="btn bg-gradient-primary w-100" onClick={addEntry}>
                Add / Update
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
              {workEntries.length === 0 ? (
                <p className="text-muted mb-0">No entries yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-secondary text-xs font-weight-bolder opacity-7">
                          Date
                        </th>
                        <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">
                          Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {workEntries
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((entry) => (
                          <tr key={entry.date}>
                            <td>
                              <span className="text-dark text-sm">
                                {new Date(entry.date).toDateString()}
                              </span>
                            </td>
                            <td className="text-end text-dark text-sm fw-bold">
                              {entry.hours}
                            </td>
                          </tr>
                        ))}
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
