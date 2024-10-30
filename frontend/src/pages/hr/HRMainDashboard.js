import React from "react";
import { Outlet, Link } from "react-router-dom";
import HRSidebar from "../../components/sidebar/HRSidebar";

const HRMainDashboard = ({ user }) => {
  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h1>Welcome to the HR Dashboard</h1>
        <p>User: {user && user.name}</p>
        <div className="dashboard-actions">
          <Link to="createpost" className="btn">
            Create New Post
          </Link>
          <Link to="leaveform" className="btn">
            Leave Requests
          </Link>
          <Link to="reporting" className="btn">
            Reporting
          </Link>
          <Link to="recruitment" className="btn">
            Recruitment
          </Link>
          <Link to="announcements" className="btn">
            HR Announcements
          </Link>
          <Link to="hrtraining" className="btn">
            Training
          </Link>
          <Link to="career" className="btn">
            Career
          </Link>
          <Link to="profile" className="btn">
            Profile
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default HRMainDashboard;
