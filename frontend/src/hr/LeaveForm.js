//pages/hr/LeaveForm
import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HRSidebar from "../components/sidebar/HRSidebar";
import "react-datepicker/dist/react-datepicker.css";

const LeaveForm = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sickNote, setSickNote] = useState(null); // State to hold the sick note file

  const handleLeaveRequest = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("leaveType", leaveType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    // If Sick Leave is selected, append the sick note file
    if (leaveType === "Sick Leave" && sickNote) {
      formData.append("sickNote", sickNote);
    }

    try {
      await axios.post("/api/hr/leave-request", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Leave request submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request");
    }
  };

  return (
    <div className="app-container">
      <HRSidebar /> {/* Add the HR Sidebar */}
      <div className="main-content">
        <div className="form-container">
          <h2>Apply for Leave</h2>
          <form onSubmit={handleLeaveRequest}>
            <div className="form-group">
              <label>Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="Pp"
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="Pp"
                required
              />
            </div>

            {/* Conditionally render sick note attachment if Sick Leave is selected */}
            {leaveType === "Sick Leave" && (
              <div className="form-group">
                <label>Sick Note</label>
                <input
                  type="file"
                  onChange={(e) => setSickNote(e.target.files[0])}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
