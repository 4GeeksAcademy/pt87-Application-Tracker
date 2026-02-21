import React, { useState } from "react";
import { Link } from "react-router-dom";

// Register page with dynamic password validation
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [emailError, setEmailError] = useState("");
    // Email validation
    const validateEmail = (mail) => {
        // Simple regex for email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "Invalid email format.";
        return "";
    };

    // Password complexity check
    const validatePassword = (pwd) => {
        if (pwd.length < 8) return "Password must be at least 8 characters.";
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) return "Password must include at least one symbol.";
        return "";
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const pwdCheck = validatePassword(password);
        const mailCheck = validateEmail(email);
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
        setError("");
        // Registration logic goes here (API call)
        alert("Registration successful (mock)");
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
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
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <div className="mt-3">
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default Register;
