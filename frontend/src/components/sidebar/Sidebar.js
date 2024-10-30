import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import "./Sidebar.css";

const Sidebar = () => {
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
        <Link to="/admin/dashboard" className="link">
          Admin Home
        </Link>
        <Link to="/leave-management" className="link">
          Leave Management
        </Link>
        <Link to="/shift-scheduling" className="link">
          Shift Scheduling
        </Link>
        <Link to="/reports" className="link">
          Reports
        </Link>
        <Link to="/announcements" className="link">
          Announcements
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
