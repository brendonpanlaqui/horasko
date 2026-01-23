import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../pages/Logout";

// Helper to get initials (e.g. "John Doe" -> "JD")
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .match(/(\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

function Navbar({ user, setUser, setSidebarOpen, sidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "Dashboard", path: "/" },
    { name: "My Logs", path: "/my-logs" }, 
    { name: "Cutoff", path: "/cutoff" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ]

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.toLowerCase();
      const foundPage = pages.find((page) => 
        page.name.toLowerCase().includes(query)
      );

      if (foundPage) {
        setSearchQuery(""); // Clear search
        navigate(foundPage.path); // Go to page
      } else {
        // Optional: Show alert or toast "Page not found"
        console.log("Page not found");
      }
    }
  };

  const pageTitle = location.pathname.split("/").filter(Boolean).pop() || "Dashboard";
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
              <a className="opacity-5 text-dark" href="javascript:;">Pages</a>
            </li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
              {formattedTitle}
            </li>
          </ol>
        </nav>

        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          {/* Search Bar */}
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search pages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch} // Triggers on Enter key
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <ul className="navbar-nav d-flex align-items-center justify-content-end">
            
            {/* Hamburger (Mobile Only) */}
            {!sidebarOpen && (
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="javascript:;"
                  className="nav-link text-body p-0"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
            )}

            {/* 1. SETTINGS ICON */}
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0 d-flex align-items-center">
                <i className="material-symbols-rounded fs-5">settings</i>
              </a>
            </li>

            {/* 2. NOTIFICATIONS ICON */}
            <li className="nav-item dropdown pe-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0 d-flex align-items-center">
                <i className="material-symbols-rounded fs-5">notifications</i>
              </a>
            </li>

            {/* 3. USER PROFILE DROPDOWN */}
            <li className="nav-item dropdown pe-2 d-flex align-items-center position-relative">
              <a
                href="javascript:;"
                className="nav-link text-body p-0 d-flex align-items-center"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* Icon matches size of Settings/Notifications */}
                <i className="material-symbols-rounded fs-5 me-1">account_circle</i>
                {/* Text is hidden on mobile, shown on desktop */}
                <span className="d-none d-md-inline text-sm font-weight-bold">
                    {user?.name?.split(" ")[0]}
                </span>
              </a>

              {/* Dropdown Menu */}
              <ul
                className={`dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 border-0 shadow-lg ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                {/* User Header */}
                <li className="mb-2">
                    <div className="d-flex align-items-center px-3 py-2">
                        <div className="d-flex align-items-center justify-content-center bg-gradient-primary rounded-circle text-white shadow-sm me-3" style={{ width: "40px", height: "40px", fontSize: "1rem", fontWeight: "bold", flexShrink: 0 }}>
                            {getInitials(user?.name)}
                        </div>
                        <div className="d-flex flex-column justify-content-center overflow-hidden">
                            <h6 className="text-sm font-weight-bold mb-0 text-truncate">{user?.name || "User"}</h6>
                            <p className="text-xs text-secondary mb-0 text-truncate">{user?.email}</p>
                        </div>
                    </div>
                </li>
                
                <li><hr className="horizontal dark my-2" /></li>
                
                {/* Menu Items */}
                <li>
                  <a className="dropdown-item border-radius-md px-3 py-2 d-flex align-items-center" href="/profile">
                    <i className="material-symbols-rounded text-secondary me-2 fs-5">person</i>
                    <span className="text-sm">My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md px-3 py-2 d-flex align-items-center" href="javascript:;">
                    <i className="material-symbols-rounded text-secondary me-2 fs-5">settings</i>
                    <span className="text-sm">Settings</span>
                  </a>
                </li>

                <li><hr className="horizontal dark my-2" /></li>
                
                {/* Logout */}
                <li>
                  <Logout setUser={setUser} className="text-sm text-danger fw-bold bg-transparent border-0 p-0" />
                </li>
              </ul>
              
              {/* Invisible Overlay to handle closing on outside click */}
              {dropdownOpen && (
                <div 
                    style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 900 }} 
                    onClick={() => setDropdownOpen(false)}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;