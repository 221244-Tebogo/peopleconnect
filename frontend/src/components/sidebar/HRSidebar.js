import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/Logo.svg";

const HRSidebar = () => {
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
        <Link to="/hr/HRMainDashboard" className="link">
          Home
        </Link>
        <Link to="/hr/HRMainDashboard/leaves" className="link">
          Manage Leave Requests
        </Link>
        <Link to="/hr/HRMainDashboard/scheduling" className="link">
          Scheduling
        </Link>
        <Link to="/hr/HRMainDashboard/reporting" className="link">
          Reports
        </Link>
        <Link to="/hr/HRMainDashboard/recruitment" className="link">
          Recruitment
        </Link>
        <Link to="/hr/HRMainDashboard/hrtraining" className="link">
          Training
        </Link>
        <Link to="/hr/HRMainDashboard/profile" className="link">
          My Profile
        </Link>
        <Link to="/hr/HRMainDashboard/career" className="link">
          Career
        </Link>
        <Link to="/hr/HRMainDashboard/employeelist" className="link">
          {" "}
          {/* Add Employee List link */}
          Employee List
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HRSidebar;
