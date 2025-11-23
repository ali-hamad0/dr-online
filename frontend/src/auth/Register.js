import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = ({ users, setUsers, setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    const exists = users.some((u) => u.email === form.email);
    if (exists) {
      setError("Email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...form,
    };

    setUsers([...users, newUser]);
    setUser(newUser);

    alert("Account created successfully!");
  }

  return (
    <div className="register">
      <h1>Create Account</h1>
      <p>Join Dr. Online as doctor or patient.</p>

      <form onSubmit={handleSubmit} className="register-form">
        <label>Full Name</label>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button type="submit" className="register-btn">
          Register
        </button>

        {error ? <p className="error-text">{error}</p> : null}
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default Register;