import React from "react";
import { Link } from "react-router-dom";

// Simple Reset Password page placeholder
const ResetPassword = () => {
    return (
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <p>Password reset form goes here.</p>
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ResetPassword;
