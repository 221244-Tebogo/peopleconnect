import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const LeaveManagement = () => {
  const [leaveBalance, setLeaveBalance] = useState({});
  const [userType, setUserType] = useState("");
  const [leaveType, setLeaveType] = useState("annual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const userResponse = await axios.get("/api/user/info", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserType(userResponse.data.userType);

        const balanceResponse = await axios.get(
          `/api/leaves/balance/${userResponse.data.userType}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setLeaveBalance(balanceResponse.data);

        const historyResponse = await axios.get("/api/leaves/history", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setLeaveHistory(historyResponse.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };
    fetchLeaveData();
  }, []);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMessage("End date cannot be before start date.");
      return;
    } else {
      setErrorMessage("");
    }

    const leaveData = { leaveType, startDate, endDate, reason };

    try {
      const response = await axios.post("/api/leaves/apply", leaveData, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      if (response.status === 200) {
        alert("Leave application submitted successfully!");

        const updatedHistory = await axios.get("/api/leaves/history", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setLeaveHistory(updatedHistory.data);

        setLeaveType("annual");
        setStartDate("");
        setEndDate("");
        setReason("");
        setShowApplyModal(false);
      } else {
        setErrorMessage("Failed to submit leave application.");
      }
    } catch (error) {
      console.error("Error applying for leave:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h2>
                  Leave <b>Management</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply for Leave
                </button>
              </div>
            </div>
          </div>

          <div className="leave-balance">
            <h2>Leave Balance</h2>
            <p>
              <strong>User Type:</strong>{" "}
              {userType === "shift" ? "Shift Worker" : "Office Worker"}
            </p>
            <ul>
              <li>
                <strong>Annual Leave:</strong> {leaveBalance.annual || 0} days
              </li>
              <li>
                <strong>Sick Leave:</strong> {leaveBalance.sick || 0} days
              </li>
              <li>
                <strong>Maternity Leave:</strong> {leaveBalance.maternity || 0}{" "}
                days
              </li>
            </ul>
          </div>

          {showApplyModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Apply for Leave</h3>
                <form onSubmit={handleApplyLeave}>
                  <div className="form-group">
                    <label>Leave Type:</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      required
                    >
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="maternity">Maternity Leave</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Reason:</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  {errorMessage && (
                    <p className="error-message" style={{ color: "red" }}>
                      {errorMessage}
                    </p>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Submit Leave Application
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="leave-history">
            <h3>Leave History</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.leaveType}</td>
                    <td>{entry.startDate}</td>
                    <td>{entry.endDate}</td>
                    <td>{entry.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
