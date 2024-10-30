import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // Make sure login.css is updated with the styles from style.css in the zip

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      const { userType, userId } = response.data;

      if (userType) {
        switch (userType) {
          case "hr":
            navigate("/hr/dashboard");
            break;
          case "manager":
            navigate("/manager/dashboard");
            break;
          case "employee":
            navigate("/employee/dashboard");
            break;
          default:
            setError("Invalid user type.");
        }
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="../assets/logo.svg" alt="Logo" className="onboarding-logo" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
