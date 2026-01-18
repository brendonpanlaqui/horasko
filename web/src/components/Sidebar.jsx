import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen}) {
  const location = useLocation();
  // Helper to add active class based on current path
  const isActive = (path) => (location.pathname === path ? "active bg-gradient-primary" : "");

  return (
    <aside
      id="sidenav-main"
      className={`sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 my-2 ps bg-white ${sidebarOpen ? "mobile-open" : ""}`}
    >
      <div className="sidenav-header d-flex justify-content-between">
        <a
          className="navbar-brand px-4 py-3 m-0"
          href="https://github.com/brendonpanlaquihorasko"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="me-2 text-primary"
          >
            <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 20a9 9 0 1 1 9-9a9 9 0 0 1-9 9zm.5-14h-1v6l5.25 3.15l.5-.86l-4.75-2.79z"/>
          </svg>
          <span className="ms-1 text-sm text-dark">HorasKo</span>
        </a>
        <button
          className="btn btn-link text-dark d-xl-none fs-4 m-0"
          onClick={() => setSidebarOpen(false)}
          style={{ textDecoration: "none" }}
        >
          <i className="material-symbols-rounded">close</i>
        </button>
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