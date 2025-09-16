import React from "react";

function Footer() {
  return (
    <footer className="footer py-4 px-4 fixed-bottom" style={{ marginLeft: "250px" }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © {new Date().getFullYear()}, made with <i className="fa fa-heart"></i> by{" "}
              <a
                href="https://www.creative-tim.com"
                className="font-weight-bold"
                target="_blank"
                rel="noreferrer"
              >
                Brendon L. Panlaqui
              </a>{" "}
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  Creative Tim
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/blog"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;