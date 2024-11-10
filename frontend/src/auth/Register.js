// frontend/auth/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "", // Match "userType" with backend "role"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Prepare user data to match backend expectations
    const userData = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      email: formData.email,
      password: formData.password,
      role: formData.userType,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        userData
      );

      const { redirect, token } = response.data;

      if (redirect) {
        localStorage.setItem("token", token); // Store the token
        navigate(redirect); // Use backend-provided redirect path
      } else {
        setError("Registration successful, but no redirect provided.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="surname"
              placeholder="Last Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User Type:</label>
            <select
              name="userType" // Match frontend "userType" to backend "role"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     // Combine firstName and lastName into a single name field
//     const userData = {
//       name: `${formData.firstName} ${formData.lastName}`.trim(),
//       email: formData.email,
//       password: formData.password,
//       userType: formData.userType,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/users/register",
//         userData
//       );
//       if (response.status === 201) {
//         navigate("/login");
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.msg || "Registration failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="wrapper">
//       <div className="inner">
//         <div className="form-container">
//           <div className="logo-container">
//             <img
//               src="../assets/logo.svg"
//               alt="Logo"
//               className="onboarding-logo"
//             />
//           </div>
//           <h2>Create Account</h2>
//           <form onSubmit={handleRegister}>
//             <div className="form-group">
//               <div className="form-wrapper">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-wrapper">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Confirm Password:</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>User Type:</label>
//               <select
//                 name="userType"
//                 value={formData.userType}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select User Type</option>
//                 <option value="hr">HR</option>
//                 <option value="manager">Manager</option>
//                 <option value="employee">Employee</option>
//               </select>
//             </div>
//             <button type="submit">Register</button>
//           </form>
//           {error && <p className="error">{error}</p>}
//           <p>
//             Already have an account? <Link to="/login">Sign in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

//---------->>ONLY REGISTERS BUT USERS CANT LOGIN<<--------
// //frontend/auth/register.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const userData = {
//       name: `${formData.name} ${formData.surname}`.trim(),
//       email: formData.email,
//       password: formData.password,
//       userType: formData.userType,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/users/register",
//         userData
//       );
//       if (response.status === 201) {
//         // Navigate users to their specific dashboard based on their userType
//         switch (formData.userType) {
//           case "hr":
//             navigate("/pages/HRAdminDashboard");
//             break;
//           case "manager":
//             navigate("/manager/dashboard");
//             break;
//           case "employee":
//             navigate("/pages/employees/Dashboard");
//             break;
//           default:
//             navigate("/login"); // Fallback in case of unexpected userType
//         }
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.msg || "Registration failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="wrapper">
//       <div className="inner">
//         <h2>Create Account</h2>
//         <form onSubmit={handleRegister}>
//           <div className="form-group">
//             <label>First Name:</label>
//             <input
//               type="text"
//               name="Name"
//               placeholder="Surname"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Last Name:</label>
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>User Type:</label>
//             <select
//               name="userType"
//               value={formData.userType}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select User Type</option>
//               <option value="hr">HR</option>
//               <option value="manager">Manager</option>
//               <option value="employee">Employee</option>
//             </select>
//           </div>
//           <button type="submit">Register</button>
//         </form>
//         {error && <p className="error">{error}</p>}
//         <p>
//           Already have an account? <Link to="/login">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
