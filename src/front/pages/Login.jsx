import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Login page with user, password, and links
const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle login form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const resp = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user, password })
            });
            const data = await resp.json();
            if (resp.ok) {
                localStorage.setItem("token", data.token);
                navigate("/demo"); // Redirect to example page
            } else {
                setError(data.msg || "User does not exist");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User (Email)</label>
                    <input type="email" className="form-control" value={user} onChange={e => setUser(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                    {/* Password complexity info */}
                    <div className="form-text text-muted mt-1" style={{ fontSize: '0.95em' }}>
                        <span style={{ display: 'inline-block', background: '#f8f9fa', borderRadius: '4px', padding: '6px 10px', border: '1px solid #e0e0e0' }}>
                            Password must be at least <b>8 characters</b> and include <b>one symbol</b> (e.g. !@#$%^&amp;*).
                        </span>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
            <div className="mt-3 d-flex justify-content-between">
                <Link to="/register">Create Account</Link>
                <Link to="/reset-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;
