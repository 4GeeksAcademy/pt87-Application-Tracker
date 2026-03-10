import { useContext, useEffect } from "react";
import { MetricsContext } from "../providers/Metrics";
import StatsPanel from "./Countup";
import ChartPanel from "./Chart";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { applications, metrics, loadApplications } = useContext(MetricsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadApplications();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Interview") return "primary";
    if (status === "Offer") return "success";
    if (status === "Dismissed") return "danger";
    if (status === "Interested") return "secondary";
    return "warning";
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-1">Dashboard</h1>
      <p className="text-muted mb-4">Overview of your job application pipeline.</p>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Applied", value: metrics.applications },
          { label: "Interviews", value: metrics.interviews },
          { label: "Offers", value: metrics.offers },
          { label: "Dismissed", value: metrics.dismissed },
        ].map(({ label, value }) => (
          <div className="col-md-3 col-6" key={label}>
            <div className="card p-3 text-center">
              <strong style={{ fontSize: "1.8rem" }}>{value}</strong>
              <span className="text-muted">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <h5 className="text-uppercase text-muted mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>Recent Applications</h5>
      {applications.length === 0 ? (
        <p className="text-muted">No applications yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {applications.slice(0, 5).map((app, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{app.role}</strong>
                <span className="text-muted"> · {app.company}</span>
              </div>
              <span className={`badge bg-${getStatusColor(app.status)}`}>{app.status}</span>
            </li>
          ))}
        </ul>
      )}

      <StatsPanel metrics={metrics} />
      <ChartPanel metrics={metrics} />
    </div>
  );
}