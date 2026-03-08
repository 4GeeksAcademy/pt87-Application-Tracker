import { useState, useEffect, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { MetricsContext } from "../providers/Metrics"; 

const initialForm = {
  company: "",
  role: "",
  location: "",
  application_date: "",
  status: "Interested",
  notes: "",
  employment_type: "",
};

export default function Addjob() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("VITE_BACKEND_URL is not defined");
      }

      const apiBase = backendUrl.replace(/\/$/, "");

      if (!token) {
        throw new Error("You must be logged in");
      }

      const response = await fetch(`${apiBase}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not create application");
      }

      setApplications((prev) => [...prev, data.data]); 
      navigate("/application");
    } catch (err) {
      setError(err.message || "Could not create application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Job</h1>
      <p>Add a new job application.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="company" className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={form.company}
            required
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={form.role}
            required
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="application_date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="application_date"
            name="application_date"
            value={form.application_date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Interested">Interested</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="employment_type" className="form-label">Employment Type</label>
          <select
            className="form-select"
            id="employment_type"
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Saving..." : "Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
}