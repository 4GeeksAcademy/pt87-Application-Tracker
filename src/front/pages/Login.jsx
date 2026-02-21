import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Login page with user, password, and links
const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [emailError, setEmailError] = useState("");
    // Email validation
    const validateEmail = (mail) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "Invalid email format.";
        return "";
    };
    const navigate = useNavigate();

    // Password complexity check
    const validatePassword = (pwd) => {
        if (pwd.length < 8) return "Password must be at least 8 characters.";
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) return "Password must include at least one symbol.";
        return "";
    };

    // Handle login form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const mailCheck = validateEmail(user);
        const pwdCheck = validatePassword(password);
        if (mailCheck) {
            setEmailError(mailCheck);
            return;
        }
        setEmailError("");
        if (pwdCheck) {
            setPwdError(pwdCheck);
            return;
        }
        setPwdError("");
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
                    <input
                        type="email"
                        className="form-control"
                        value={user}
                        onChange={e => {
                            setUser(e.target.value);
                            setEmailError(validateEmail(e.target.value));
                        }}
                        required
                    />
                    {emailError && <div className="alert alert-warning mt-2">{emailError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setPwdError(validatePassword(e.target.value));
                        }}
                        required
                    />
                    {pwdError && <div className="alert alert-warning mt-2">{pwdError}</div>}
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
