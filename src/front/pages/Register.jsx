import React from "react";
import { Link } from "react-router-dom";

// Simple Register page placeholder
const Register = () => {
    return (
        <div className="container mt-5">
            <h2>Create Account</h2>
            <p>Registration form goes here.</p>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
};

export default Register;
