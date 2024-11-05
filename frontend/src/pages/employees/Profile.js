import React from "react";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Profile = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>My Profile</h1>
        <p>View and update your profile details.</p>
      </div>
    </div>
  );
};

export default Profile;
