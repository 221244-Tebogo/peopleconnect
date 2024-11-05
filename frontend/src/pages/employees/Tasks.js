import React from "react";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Tasks = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>My Tasks</h1>
        <p>Here you can view and manage your tasks.</p>
      </div>
    </div>
  );
};

export default Tasks;
