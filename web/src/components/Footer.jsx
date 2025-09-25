import React from "react";

function Footer() {
  return (
    <footer className="footer py-4 px-4">
      <div className="container-fluid d-flex justify-content-center">
        <div className="text-center text-sm text-muted">
          © {new Date().getFullYear()}, made by{" "}
          <a
            href="https://github.com/brendonpanlaqui"
            className="font-weight-bold"
            target="_blank"
          >
            Brendon L. Panlaqui
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;