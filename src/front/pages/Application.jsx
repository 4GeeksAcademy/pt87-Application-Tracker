import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STATUS_OPTIONS = ["Interested", "Applied", "Interview", "Offer", "Rejected"];

export default function Application() {
      const [applications, setApplications] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState("");

      const summary = useMemo(() => {
            return applications.reduce(
                  (acc, app) => {
                        acc.total += 1;
                        if (app.status in acc.byStatus) {
                              acc.byStatus[app.status] += 1;
                        }
                        return acc;
                  },
                  {
                        total: 0,
                        byStatus: {
                              Interested: 0,
                              Applied: 0,
                              Interview: 0,
                              Offer: 0,
                              Rejected: 0,
                        },
                  }
            );
      }, [applications]);

      const loadApplications = async () => {
            try {
                  setIsLoading(true);
                  setError("");
                  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications`);
                  const payload = await response.json();

                  if (!response.ok) {
                        throw new Error(payload?.error || "Could not load applications.");
                  }

                  setApplications(payload?.data || []);
            } catch (loadError) {
                  setError(loadError.message || "Unexpected error.");
            } finally {
                  setIsLoading(false);
            }
      };

      useEffect(() => {
            loadApplications();
      }, []);

      const updateStatus = async (appId, status) => {
            try {
                  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/${appId}`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  });

                  const payload = await response.json();
                  if (!response.ok) {
                        throw new Error(payload?.error || "Could not update status.");
                  }

                  setApplications((prev) => prev.map((app) => (app.id === appId ? payload.data : app)));
            } catch (updateError) {
                  setError(updateError.message || "Unexpected error.");
            }
      };

      const deleteApplication = async (appId) => {
            try {
                  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/${appId}`, {
                        method: "DELETE",
                  });
                  const payload = await response.json();

                  if (!response.ok) {
                        throw new Error(payload?.error || "Could not delete application.");
                  }

                  setApplications((prev) => prev.filter((app) => app.id !== appId));
            } catch (deleteError) {
                  setError(deleteError.message || "Unexpected error.");
            }
      };

      return (
            <div className="container mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                              <h1 className="mb-1">Applications</h1>
                              <p className="text-muted mb-0">
                                    Track, update stages, and remove rejected or old applications.
                              </p>
                        </div>
                        <Link to="/add-job" className="btn btn-primary">
                              Add Job
                        </Link>
                  </div>

                  <div className="row g-2 mb-4">
                        <div className="col-md-2 col-6">
                              <div className="card p-2 text-center">
                                    <strong>{summary.total}</strong>
                                    <span>Total</span>
                              </div>
                        </div>
                        <div className="col-md-2 col-6">
                              <div className="card p-2 text-center">
                                    <strong>{summary.byStatus.Applied}</strong>
                                    <span>Applied</span>
                              </div>
                        </div>
                        <div className="col-md-2 col-6">
                              <div className="card p-2 text-center">
                                    <strong>{summary.byStatus.Interview}</strong>
                                    <span>Interview</span>
                              </div>
                        </div>
                        <div className="col-md-2 col-6">
                              <div className="card p-2 text-center">
                                    <strong>{summary.byStatus.Offer}</strong>
                                    <span>Offer</span>
                              </div>
                        </div>
                        <div className="col-md-2 col-6">
                              <div className="card p-2 text-center">
                                    <strong>{summary.byStatus.Rejected}</strong>
                                    <span>Rejected</span>
                              </div>
                        </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  {isLoading ? (
                        <div className="alert alert-info">Loading applications...</div>
                  ) : applications.length === 0 ? (
                        <div className="alert alert-secondary">
                              No applications yet. <Link to="/add-job">Create your first one</Link>.
                        </div>
                  ) : (
                        <div className="table-responsive">
                              <table className="table table-striped align-middle">
                                    <thead>
                                          <tr>
                                                <th>Company</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th style={{ width: "140px" }}>Delete</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {applications.map((application) => (
                                                <tr key={application.id}>
                                                      <td>{application.company}</td>
                                                      <td>{application.role}</td>
                                                      <td>
                                                            <select
                                                                  className="form-select form-select-sm"
                                                                  value={application.status || "Interested"}
                                                                  onChange={(event) => updateStatus(application.id, event.target.value)}
                                                            >
                                                                  {STATUS_OPTIONS.map((status) => (
                                                                        <option key={status} value={status}>
                                                                              {status}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </td>
                                                      <td>
                                                            <button
                                                                  type="button"
                                                                  className="btn btn-sm btn-outline-danger"
                                                                  onClick={() => deleteApplication(application.id)}
                                                            >
                                                                  Delete
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