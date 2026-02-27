import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STATUS_OPTIONS = ["Interested", "Applied", "Interview", "Offer", "Dismissed"];

export default function Addjob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Interested",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: form.company.trim(),
          role: form.role.trim(),
          status: form.status,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Could not save application.");
      }

      navigate("/application");
    } catch (submitError) {
      setError(submitError.message || "Unexpected error.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h1>Add Job</h1>
      <p className="text-muted">Save an application and track it in your Applications page.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company Name</label>
          <input
            id="company"
            name="company"
            type="text"
            className="form-control"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            className="form-control"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Application"}
          </button>
          <Link to="/application" className="btn btn-outline-secondary">
            View Applications
          </Link>
        </div>
      </form>
    </div>
  );
}