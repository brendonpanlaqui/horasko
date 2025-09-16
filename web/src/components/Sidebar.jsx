import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  // Helper to add active class based on current path
  const isActive = (path) => (location.pathname === path ? "active bg-gradient-primary" : "");

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <a
          className="navbar-brand px-4 py-3 m-0"
          href="https://demos.creative-tim.com/material-dashboard/pages/dashboard"
          target="_blank"
          rel="noreferrer"
        >
          <span className="ms-1 text-sm text-dark">Work Hours Tracker</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0 mb-2" />
      <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link text-dark ${isActive("/")}`} to="/">
              <i className="material-symbols-rounded opacity-5">dashboard</i>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-dark ${isActive("/my-logs")}`} to="/my-logs">
              <i className="material-symbols-rounded opacity-5">list_alt</i>
              <span className="nav-link-text ms-1">My Logs</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-dark ${isActive("/cutoff")}`} to="/cutoff">
              <i className="material-symbols-rounded opacity-5">timer</i>
              <span className="nav-link-text ms-1">Cutoff</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-dark ${isActive("/profile")}`} to="/profile">
              <i className="material-symbols-rounded opacity-5">person</i>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;