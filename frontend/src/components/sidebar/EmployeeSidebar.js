import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/Logo.svg";

const EmployeeSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="People Connect Logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-links">
        <Link to="/employees/dashboard" className="link">
          Home
        </Link>
        <Link to="/employees/tasks" className="link">
          My Tasks
        </Link>
        <Link to="/employees/leaves" className="link">
          Leave Management
        </Link>
        <Link to="/employees/schedule" className="link">
          My Schedule
        </Link>
        <Link to="/employees/profile" className="link">
          My Profile
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
