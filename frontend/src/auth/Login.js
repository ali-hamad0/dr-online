import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ users, setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!found) {
      setError("Wrong email or password.");
      return;
    }

    setUser(found);
    setLogged(true);
    alert("Login successful!");
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <p>Login to join Dr. Online.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {error ? <p className="error-text">{error}</p> : null}
      </form>

      {logged ? (
        <p className="success-msg">
          ✅ You are logged in. Go to{" "}
          <Link to="/" className="home-link">
            Home
          </Link>
        </p>
      ) : (
        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      )}
    </div>
  );
};

export default Login;
