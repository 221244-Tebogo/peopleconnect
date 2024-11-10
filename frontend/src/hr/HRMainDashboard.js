import React from "react";
import { Outlet, Link } from "react-router-dom";
import HRSidebar from "../components/sidebar/HRSidebar";
import "./HRAdminDashboard.css";

const HRMainDashboard = ({ user }) => {
  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>HR Dashboard</h1>
          <p>Welcome, {user && user.name}</p>
        </div>

        <div className="dashboard-actions-grid">
          <Link to="/hr/HRMainDashboard/createpost" className="dashboard-btn">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            <span>Create Post</span>
          </Link>
          <Link to="/hr/HRMainDashboard/manageleave" className="dashboard-btn">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <span>Manage Leave</span>
          </Link>
          <Link to="/hr/HRMainDashboard/reporting" className="dashboard-btn">
            <i className="fa fa-chart-bar" aria-hidden="true"></i>
            <span>Reporting</span>
          </Link>
          <Link to="/hr/HRMainDashboard/career" className="dashboard-btn">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <span>Careers</span>
          </Link>
          <Link
            to="/hr/HRMainDashboard/announcements"
            className="dashboard-btn"
          >
            <i className="fa fa-bullhorn" aria-hidden="true"></i>
            <span>Announcements</span>
          </Link>
          <Link to="/hr/HRMainDashboard/hrtraining" className="dashboard-btn">
            <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>
            <span>Training</span>
          </Link>
          <Link to="/hr/HRMainDashboard/profile" className="dashboard-btn">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span>Profile</span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default HRMainDashboard;
