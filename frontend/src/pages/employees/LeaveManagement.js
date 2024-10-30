import React from "react";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const LeaveManagement = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Leave Management</h1>
        <p>Manage your leave requests and view your leave balance here.</p>
      </div>
    </div>
  );
};

export default LeaveManagement;
