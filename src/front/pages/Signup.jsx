import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
      const response = await fetch(`${backendUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.msg || "Signup failed");
        return;
      }
      navigate("/login");
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f3" }} className="d-flex align-items-start justify-content-center pt-5">
      <div style={{ width: "100%", maxWidth: "480px", padding: "2rem" }}>
        <h1 style={{ fontWeight: "700", fontSize: "2.5rem", marginBottom: "1.5rem" }}>Create Account</h1>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control form-control-lg"
            style={{ borderRadius: "12px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            style={{ borderRadius: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            style={{ borderRadius: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="alert alert-light py-2 mb-3" style={{ borderRadius: "12px", fontSize: "0.9rem" }}>
          Password must be at least <strong>8 characters</strong> and include <strong>one symbol</strong> (e.g. !@#$%^&*).
        </div>

        <button
          className="btn btn-lg w-100 mb-3"
          style={{ backgroundColor: "#3d7a5c", color: "white", borderRadius: "12px" }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="d-flex justify-content-between">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}