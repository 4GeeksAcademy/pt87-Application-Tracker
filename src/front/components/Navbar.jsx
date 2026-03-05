import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-brand-bg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="ApplyTrack logo" height="46" />
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/application">Applications</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-add-job" to="/add-job">
                <i className="fa-solid fa-plus me-2"></i>
                Add Job
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav">
            {token ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                  style={{ color: "rgba(255,255,255,.55)" }}
                >
                  Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};