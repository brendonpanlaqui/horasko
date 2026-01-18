import React, { useState, useEffect, useMemo } from "react";
import { fetchEntries } from "../api/entries";
import { fetchHolidays } from "../api/holidays";

// --- CONFIGURATION ---
const HOURLY_RATE = 70;
const OT_PREMIUM = 1.25;

// Helper: Format Money
const formatMoney = (amount) => 
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

// Helper: Month Name
const getMonthName = (date) => 
  date.toLocaleString('default', { month: 'short' });

export default function Cutoff() {
  // 1. INITIAL STATE (Empty arrays = 0 values in UI)
  const [logs, setLogs] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [logsRes, holidaysRes] = await Promise.all([
          fetchEntries(), 
          fetchHolidays()
        ]);

        if (isMounted) {
          setLogs(Array.isArray(logsRes) ? logsRes : logsRes.data || []);
          setHolidays(holidaysRes || []);
          setStatus({ loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) setStatus({ loading: false, error: "Failed to load data." });
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // --- 3. CALCULATIONS ---
  // If logs is [], reduce returns 0, so UI shows 0.00 immediately
  const { cutoffs, summary } = useMemo(() => {
    const groups = {};

    logs.forEach((log) => {
      const date = new Date(log.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      // Cutoff Logic: 1-15 or 16-End
      const isFirstHalf = day <= 15;
      const startDay = isFirstHalf ? 1 : 16;
      const endDay = isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate();
      const key = `${year}-${month}-${startDay}`;

      if (!groups[key]) {
        groups[key] = {
          id: key,
          period: `${getMonthName(date)} ${startDay}-${endDay}, ${year}`,
          startDate: new Date(year, month, startDay),
          totalHours: 0,
          regularHours: 0,
          holidayHours: 0,
          overtime: 0,
          payRaw: 0, 
        };
      }

      const h = Number(log.hours || 0);
      const regular = Math.min(h, 8);
      const ot = Math.max(0, h - 8);
      const holiday = holidays.find(hol => hol.date === log.date);
      const mult = holiday?.multiplier || 1.0;

      const regularPay = regular * HOURLY_RATE * mult;
      const otPay = ot * HOURLY_RATE * mult * OT_PREMIUM;

      groups[key].totalHours += h;
      groups[key].regularHours += regular;
      groups[key].overtime += ot;
      groups[key].payRaw += (regularPay + otPay);
      if (holiday) groups[key].holidayHours += h;
    });

    const sorted = Object.values(groups)
      .map(g => ({ ...g, payable: formatMoney(g.payRaw) }))
      .sort((a, b) => b.startDate - a.startDate);

    const totalHours = sorted.reduce((sum, c) => sum + c.totalHours, 0);
    const totalOvertime = sorted.reduce((sum, c) => sum + c.overtime, 0);
    const currentCutoffPayable = sorted.length > 0 ? sorted[0].payable : "₱0.00";

    return { cutoffs: sorted, summary: { totalHours, totalOvertime, currentCutoffPayable } };
  }, [logs, holidays]);

  // --- 4. RENDER ---
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

        {/* Global Error */}
        {status.error && <div className="col-12 alert alert-danger text-white mb-4">{status.error}</div>}

        {/* Summary Cards - SHOWS 0.00 INITIALLY (No Spinner) */}
        <div className="col-12 mb-4">
          <div className="row g-3">
            <div className="col-md-4 col-sm-6">
              <div className="card shadow-sm border-radius-xl h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted text-uppercase small mb-1 fw-semibold">
                      Current Cutoff Payable
                    </p>
                    <h6 className="fw-bold text-dark mb-0">{summary.currentCutoffPayable}</h6>
                  </div>
                  <span className="material-symbols-rounded text-primary fs-2">schedule</span>
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
                    {/* Shows "0.00 hrs" immediately, updates when data loads */}
                    <h6 className="fw-bold text-dark mb-0">{summary.totalHours.toFixed(2)} hrs</h6>
                  </div>
                  <span className="material-symbols-rounded text-success fs-2">schedule_add</span>
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
                    <h6 className="fw-bold text-dark mb-0">{summary.totalOvertime.toFixed(2)} hrs</h6>
                  </div>
                  <span className="material-symbols-rounded text-info fs-2">trending_up</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table - SHOWS LOADING SPINNER ONLY IN BODY */}
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
                      <th className="text-secondary text-xs font-weight-bolder opacity-7">Cutoff Period</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Total Hours</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Regular Hours</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Holiday Hours</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Overtime</th>
                      <th className="text-end text-secondary text-xs font-weight-bolder opacity-7">Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Matches MyLogs Loading Style */}
                    {status.loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                           <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                           Loading entries...
                        </td>
                      </tr>
                    ) : cutoffs.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-4 text-muted">No entries found.</td></tr>
                    ) : (
                      cutoffs.map((c, index) => (
                        <tr key={index}>
                          <td className="text-dark text-sm fw-semibold">{c.period}</td>
                          <td className="text-end fw-bold text-dark text-sm">{c.totalHours.toFixed(2)}</td>
                          <td className="text-end fw-bold text-dark text-sm">{c.regularHours.toFixed(2)}</td>
                          <td className="text-end fw-bold text-dark text-sm">{c.holidayHours.toFixed(2)}</td>
                          <td className="text-end fw-bold text-dark text-sm">{c.overtime.toFixed(2)}</td>
                          <td className="text-end fw-bold text-success text-sm">{c.payable}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards - LOADING STATE */}
        <div className="col-12 d-md-none">
          {status.loading ? (
             <div className="text-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                Loading...
             </div>
          ) : cutoffs.length === 0 ? (
             <p className="text-center text-muted py-3">No entries found.</p>
          ) : (
            cutoffs.map((c, index) => (
              <div key={index} className="border rounded-3 p-3 mb-3 shadow-sm bg-white">
                <h6 className="fw-bold text-dark mb-2">{c.period}</h6>
                <p className="text-muted small mb-1">Total Hours: <span className="fw-bold text-dark">{c.totalHours.toFixed(2)}</span></p>
                <p className="text-muted small mb-1">Regular Hours: <span className="fw-bold text-dark">{c.regularHours.toFixed(2)}</span></p>
                <p className="text-muted small mb-1">Holiday Hours: <span className="fw-bold text-dark">{c.holidayHours.toFixed(2)}</span></p>
                <p className="text-muted small mb-1">Overtime: <span className="fw-bold text-dark">{c.overtime.toFixed(2)}</span></p>
                <p className="text-muted small mb-0">Pay: <span className="fw-bold text-success">{c.payable}</span></p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!status.loading && (
          <div className="col-12 text-center text-muted small mt-3">
            <p className="mb-0">Showing data for current and previous cutoffs. Use “View History” for full payroll review.</p>
          </div>
        )}
      </div>
    </div>
  );
}