import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "../App.css";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = { username, email, password, roles };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        setMessage("✅ Signup successful! Please login.");
      } else {
        const errorData = await response.json();
        setMessage("❌ Signup failed: " + errorData.message);
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">
          <i className="fas fa-user-plus text-primary"></i> Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-user"></i> Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-user-tag"></i> Roles
            </label>
            <select
              className="form-select"
              multiple
              value={roles}
              onChange={(e) =>
                setRoles(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            <i className="fas fa-user-check"></i> Signup
          </button>

          <p className="text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>

        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
}

export default Signup;
