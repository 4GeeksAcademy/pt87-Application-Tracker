import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        status: "",
        location: "",
        application_date: "",
        employment_type: "",
        notes: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const apiBase = backendUrl?.replace(/\/$/, "");

    useEffect(() => {
        const loadApplication = async () => {
            try {
                setLoading(true);
                setError("");

                if (!apiBase) {
                    throw new Error("VITE_BACKEND_URL is not defined");
                }

                const token = localStorage.getItem("token");

                const response = await fetch(`${apiBase}/api/applications/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const contentType = response.headers.get("content-type") || "";
                const data = contentType.includes("application/json")
                    ? await response.json()
                    : null;

                if (!response.ok) {
                    throw new Error(
                        data?.error || `Failed to load application (status ${response.status})`
                    );
                }

                setFormData({
                    company: data?.data?.company || "",
                    role: data?.data?.role || "",
                    status: data?.data?.status || "",
                    location: data?.data?.location || "",
                    application_date: data?.data?.application_date || "",
                    employment_type: data?.data?.employment_type || "",
                    notes: data?.data?.notes || "",
                });
            } catch (err) {
                setError(err.message || "Could not load application");
            } finally {
                setLoading(false);
            }
        };

        loadApplication();
    }, [id, apiBase]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (!apiBase) {
                throw new Error("VITE_BACKEND_URL is not defined");
            }

            const token = localStorage.getItem("token");

            const response = await fetch(`${apiBase}/api/applications/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await response.json()
                : null;

            if (!response.ok) {
                throw new Error(
                    data?.error || `Failed to update application (status ${response.status})`
                );
            }

            navigate("/application");
        } catch (err) {
            setError(err.message || "Could not update application");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container mt-4">Loading application...</div>;

    return (
        <div className="container mt-4" style={{ maxWidth: "700px" }}>
            <h1>Edit Application</h1>
            <p>Update the details for this application.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                        type="text"
                        name="company"
                        className="form-control"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input
                        type="text"
                        name="role"
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Dismissed">Dismissed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Application Date</label>
                    <input
                        type="date"
                        name="application_date"
                        className="form-control"
                        value={formData.application_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Employment Type</label>
                    <select
                        name="employment_type"
                        className="form-select"
                        value={formData.employment_type}
                        onChange={handleChange}
                    >
                        <option value="">Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea
                        name="notes"
                        className="form-control"
                        rows="4"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Update Application"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/application")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}