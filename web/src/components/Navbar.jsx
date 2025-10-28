import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logout from "../pages/Logout";

function Navbar({ user, setUser, setSidebarOpen, sidebarOpen  }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const pageTitle = location.pathname.split("/").filter(Boolean).pop() || "Dashboard";

  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  return (
    <nav className="navbar navbar-main navbar-expand-lg shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{formattedTitle}</li>
          </ol>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline">
              <label className="form-label">Type here...</label>
              <input type="text" className="form-control"/>
            </div>
          </div>
          {/* Right side items */}
          <ul className="navbar-nav d-flex align-items-center  justify-content-end">
            {/* Hamburger for small screens */}
            {!sidebarOpen && (
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <button
                className="nav-link text-body p-0 bg-transparent border-0"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </button>
            </li>
            )}
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0">
                <i className="material-symbols-rounded fixed-plugin-button-nav">settings</i>
              </a>
            </li>
            <li className="nav-item dropdown pe-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="material-symbols-rounded">notifications</i>
              </a>
            </li>
            <li className="nav-item dropdown pe-3 d-flex align-items-center">
              <a
                href="javascript:;"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded={dropdownOpen ? "true" : "false"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <i className="material-symbols-rounded">account_circle</i>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 ${
                  dropdownOpen ? "show" : ""
                }`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2 px-3">
                  <small className="text-muted">
                    Signed in as <br />
                    <strong>{user?.name || "User"}</strong>
                    <br />
                    <span className="text-sm">{user?.email}</span>
                  </small>
                </li>
                <li>
                  <Logout setUser={setUser}/>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
