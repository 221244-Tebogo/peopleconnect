// src/components/ShiftScheduling.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ShiftScheduling = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/shifts")
      .then((res) => setShifts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="shift-scheduling">
      <h2>Shift Scheduling</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift._id}>
            {shift.employee.name}: {shift.date} - {shift.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftScheduling;
