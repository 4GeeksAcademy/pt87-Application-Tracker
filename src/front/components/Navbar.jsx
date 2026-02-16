import { Link } from "react-router-dom";
import logo from "../assets/img/applytracklogo.png";



export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <nav className="navbar">
          <img src={logo} alt="Logo" height="40" />
        </nav>

        <Link to="/">
          <span className="navbar-brand mb-0 h1">ApplyTrack</span>
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
              <Link className="nav-link" to="/add-job">Add Job</Link>
            </li>
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
