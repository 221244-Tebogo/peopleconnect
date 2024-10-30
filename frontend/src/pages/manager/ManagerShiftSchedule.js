import React, { useState } from "react";
import ManagerSidebar from "../../components/sidebar/ManagerSidebar"; // Ensure correct import

const ManagerShiftSchedule = () => {
  const [shifts] = useState([
    { id: 1, employee: "John Doe", shift: "Morning" },
    { id: 2, employee: "Jane Smith", shift: "Evening" },
  ]);

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Shift Schedule</h2>
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id}>
              {shift.employee} - {shift.shift} shift
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerShiftSchedule;
