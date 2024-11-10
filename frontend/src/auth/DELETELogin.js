// frontend/auth/login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect to check if user is already logged in and redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("userRole"); // Optional: storing role
      const redirectPath =
        role === "manager"
          ? "/manager/ManagerDashboard"
          : role === "employee"
          ? "/employees/Dashboard"
          : "/hr/HRAdminDashboard";

      navigate(redirectPath);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { redirect, token, userType } = response.data;

      if (redirect) {
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", userType); // Store role if you plan to use it in redirects
        navigate(redirect);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
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
        {error && <p className="error">{error}</p>}
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/users/login",
//         {
//           email,
//           password,
//         }
//       );
//       const { userType, name } = response.data; // Assume 'name' is the user's name returned from the API

//       if (userType) {
//         setUserName(name); // Set the user's name in state
//         switch (userType) {
//           case "hr":
//             navigate("/hr/HRMainDashboard");
//             break;
//           case "manager":
//             navigate("/manager/dashboard");
//             break;
//           case "employee":
//             navigate("/employees/dashboard");
//             break;
//           default:
//             setError("Invalid user type.");
//         }
//       } else {
//         setError("Invalid login credentials.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="logo-container">
//         <img src="../assets/logo.svg" alt="Logo" className="onboarding-logo" />
//       </div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {userName && <p className="welcome-message">Welcome, {userName}!</p>} ={" "}
//       {error && <p className="error">{error}</p>}
//       <p>
//         Don’t have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;
