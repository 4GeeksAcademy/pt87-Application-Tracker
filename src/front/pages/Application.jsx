import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MetricsContext } from "../providers/Metrics";

export default function Application() {
  const { applications, setApplications } = useContext(MetricsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  const apiBase = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("VITE_BACKEND_URL is not defined");
      }
      const apiBase = backendUrl.replace(/\/$/, "");

      if (!token) {
        throw new Error("You must be logged in");
      }

      const response = await fetch(`${apiBase}/api/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!apiBase) throw new Error("VITE_BACKEND_URL is not defined");

    
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.error || `Failed to load applications (status ${response.status})`);
      }

      setApplications(data?.data || []);
    } catch (err) {
      setError(err.message || "Could not fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadApplications();
  }, [token]);

  const handleDelete = async (appId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this application?");
    if (!shouldDelete) return;

    try {
      setDeletingId(appId);
      setError("");
      if (!apiBase) throw new Error("VITE_BACKEND_URL is not defined");

      const response = await fetch(`${apiBase}/api/applications/${appId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.error || `Failed to delete application (status ${response.status})`);
      }

      setApplications((prev) => prev.filter((app) => app.id !== appId)); 
    } catch (err) {
      setError(err.message || "Could not delete application");
    } finally {
      setDeletingId(null);
    }
  };

  const totalCount = applications.length;
  const interviewsCount = applications.filter((app) =>
    ["interview", "interviewing"].includes((app.status || "").toLowerCase())
  ).length;
  const offersCount = applications.filter(
    (app) => (app.status || "").toLowerCase() === "offer"
  ).length;
  const dismissedCount = applications.filter((app) =>
    ["dismissed", "rejected"].includes((app.status || "").toLowerCase())
  ).length;

  return (
    <div className="container mt-4">
      <h1>Applications</h1>
      <p>Track and manage your job applications here.</p>

      <div className="row g-3 mb-4">
        {[
          { label: "Applications", value: totalCount },
          { label: "Interviews", value: interviewsCount },
          { label: "Offers", value: offersCount },
          { label: "Dismissed", value: dismissedCount },
        ].map(({ label, value }) => (
          <div className="col-md-3 col-6" key={label}>
            <div className="card p-3 text-center">
              <strong style={{ fontSize: "1.8rem" }}>{value}</strong>
              <span className="text-muted">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Loading applications...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && applications.length === 0 && (
        <div className="alert alert-secondary">
          No applications yet. Go to Add Job to create your first one.
        </div>
      )}
      {!loading && !error && applications.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Location</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.status}</td>
                  <td>{app.location || "-"}</td>
                  <td>{app.application_date || "-"}</td>
                  <td>{app.employment_type || "-"}</td>
                  <td className="d-flex gap-2">
                    <Link
                      to={`/application/${app.id}/edit`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(app.id)}
                      disabled={deletingId === app.id}
                    >
                      {deletingId === app.id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <i className="fa-solid fa-trash-can me-1"></i>
                          Delete
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}