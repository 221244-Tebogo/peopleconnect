// // src/auth/Authentication.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Authentication.css";

// const API_BASE_URL = "http://localhost:5001/api/auth"; // Update with backend URL

// const Authentication = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     surname: "",
//     role: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setError("");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isLogin
//       ? `${API_BASE_URL}/login`
//       : `${API_BASE_URL}/register`;
//     const payload = isLogin
//       ? { email: formData.email, password: formData.password }
//       : { ...formData };

//     try {
//       const response = await axios.post(endpoint, payload);
//       const { token, redirect } = response.data;

//       if (redirect) {
//         localStorage.setItem("token", token); // Store the token
//         navigate(redirect); // Navigate to the appropriate dashboard
//       } else {
//         setError("Authentication failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-toggle">
//         <button
//           onClick={() => setIsLogin(true)}
//           className={isLogin ? "active" : ""}
//         >
//           Login
//         </button>
//         <button
//           onClick={() => setIsLogin(false)}
//           className={!isLogin ? "active" : ""}
//         >
//           Register
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="First Name"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="surname"
//               placeholder="Last Name"
//               onChange={handleChange}
//               required
//             />
//           </>
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         {!isLogin && (
//           <select name="role" onChange={handleChange} required>
//             <option value="">Select Role</option>
//             <option value="hr">HR</option>
//             <option value="manager">Manager</option>
//             <option value="employee">Employee</option>
//           </select>
//         )}
//         <button type="submit">{isLogin ? "Login" : "Register"}</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Authentication;

//new
// src/auth/Authentication.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";

const API_BASE_URL = "http://localhost:5001/api/auth";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? `${API_BASE_URL}/login`
      : `${API_BASE_URL}/register`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const response = await axios.post(endpoint, payload);
      const { token, redirect } = response.data;

      if (redirect) {
        localStorage.setItem("token", token); // Store the token
        navigate(redirect); // Use dynamic redirect from backend
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error occurred. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <select name="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Authentication;
