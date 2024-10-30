import React, { useState } from "react";
import ManagerSidebar from "../../components/sidebar/ManagerSidebar"; // Ensure correct import

const ManagerLeaveRequests = () => {
  const [leaveRequests] = useState([
    { id: 1, employee: "John Doe", type: "Sick Leave", status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Annual Leave", status: "Approved" },
  ]);

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Leave Requests</h2>
        <ul>
          {leaveRequests.map((request) => (
            <li key={request.id}>
              {request.employee} - {request.type} ({request.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerLeaveRequests;
