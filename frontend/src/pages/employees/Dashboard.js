import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome, {userData.name}</p>
        </div>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <h1>Welcome, {userData.name}</h1>
            <p>Role: {userData.role}</p>

            <div className="dashboard-actions-grid">
              <Link to="/employees/manageleave" className="dashboard-btn">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>Manage Leave</span>
              </Link>
              <Link to="/employees/reporting" className="dashboard-btn">
                <i className="fa fa-chart-bar" aria-hidden="true"></i>
                <span>Employee Reports</span>
              </Link>
              <Link to="/employees/training" className="dashboard-btn">
                <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>
                <span>Training</span>
              </Link>
              <Link to="/employees/announcements" className="dashboard-btn">
                <i className="fa fa-bullhorn" aria-hidden="true"></i>
                <span>Announcements</span>
              </Link>
              <Link to="/employees/career" className="dashboard-btn">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Career</span>
              </Link>
              <Link to="/employees/profile" className="dashboard-btn">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>My Profile</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
