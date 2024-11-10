//pages/LeaveApplication
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./LeaveApplication.css";

const LeaveApplication = ({ user }) => {
  const [selectedDates, setSelectedDates] = useState(null);
  const [leaveType, setLeaveType] = useState("");

  const handleDateChange = (date) => {
    setSelectedDates(date);
  };

  const handleLeaveRequest = (e) => {
    e.preventDefault();

    const leaveRequest = {
      leaveType,
      startDate: Array.isArray(selectedDates)
        ? selectedDates[0]
        : selectedDates,
      endDate: Array.isArray(selectedDates) ? selectedDates[1] : selectedDates,
    };

    axios
      .post("/api/leaves/apply", leaveRequest, {
        // headers: { Authorization: localStorage.getItem("token") },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => alert("Leave requested successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="leave-application">
      <h2>Apply for Leave</h2>

      <form onSubmit={handleLeaveRequest}>
        <div className="form-group">
          <label>Leave Type:</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Leave Dates:</label>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={true} // Enables selecting a date range
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default LeaveApplication;
