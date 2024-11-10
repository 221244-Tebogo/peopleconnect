//pages/hr/ManageLeave
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HRSidebar from "../components/sidebar/HRSidebar";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminDashboard.css";

const ManageLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [leaveDuration, setLeaveDuration] = useState("Full Day"); // New: Full Day or Half Day
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sickNote, setSickNote] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeType, setEmployeeType] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/hr/leave-requests`
        );
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };
    fetchLeaveRequests();
  }, []);

  const calculateLeaveDays = () => {
    if (!startDate || !endDate) return 0;
    const daysBetween = (endDate - startDate) / (1000 * 3600 * 24);

    if (leaveDuration === "Half Day") {
      return 0.5; // If half-day is selected, return 0.5 days
    }

    if (employeeType === "office") {
      let days = 0;
      for (let i = 0; i <= daysBetween; i++) {
        const day = new Date(startDate.getTime() + i * 86400000).getDay();
        if (day !== 0 && day !== 6) days++;
      }
      return days;
    } else {
      return daysBetween + 1;
    }
  };

  const handleLeaveRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (endDate < startDate) {
      setErrorMessage("End date cannot be before start date.");
      setIsSubmitting(false);
      return;
    } else {
      setErrorMessage("");
    }

    const formData = new FormData();
    formData.append("leaveType", leaveType);
    formData.append("leaveDuration", leaveDuration); // Add leave duration
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("employeeType", employeeType);

    if (leaveType === "Sick Leave" && sickNote) {
      formData.append("sickNote", sickNote);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/hr/leave-request`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Leave request submitted successfully!");
      setLeaveRequests([
        ...leaveRequests,
        { leaveType, startDate, endDate, employeeType, leaveDuration },
      ]);
      setShowLeaveModal(false);
      setLeaveType("");
      setLeaveDuration("Full Day");
      setStartDate(null);
      setEndDate(null);
      setSickNote(null);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Leave Requests</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowLeaveModal(true)}
                >
                  Apply for Leave
                </button>
              </div>
            </div>
          </div>

          {/* Apply for Leave Modal */}
          {showLeaveModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Apply for Leave</h2>
                <form onSubmit={handleLeaveRequest}>
                  <div className="form-group">
                    <label>Employee Type</label>
                    <select
                      value={employeeType}
                      onChange={(e) => setEmployeeType(e.target.value)}
                      required
                    >
                      <option value="">Select Employee Type</option>
                      <option value="office">Office Worker (Mon-Fri)</option>
                      <option value="shift">
                        Shift Worker (Includes Weekends)
                      </option>
                    </select>
                  </div>

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
                    <label>Leave Duration</label>
                    <select
                      value={leaveDuration}
                      onChange={(e) => setLeaveDuration(e.target.value)}
                      required
                    >
                      <option value="Full Day">Full Day</option>
                      <option value="Half Day">Half Day</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect={leaveDuration === "Half Day"} // Show time select for half-day
                      timeFormat="HH:mm"
                      dateFormat={leaveDuration === "Half Day" ? "Pp" : "P"}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect={leaveDuration === "Half Day"} // Show time select for half-day
                      timeFormat="HH:mm"
                      dateFormat={leaveDuration === "Half Day" ? "Pp" : "P"}
                      required
                    />
                  </div>

                  {errorMessage && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {errorMessage}
                    </p>
                  )}

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

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Leave Request"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => setShowLeaveModal(false)}
                  >
                    Cancel
                  </button>
                  <p>Total Leave Days: {calculateLeaveDays()}</p>
                </form>
              </div>
            </div>
          )}

          <h3 className="mt-5">All Leave Requests</h3>
          {/* Leave requests table here */}
        </div>
      </div>
    </div>
  );
};

export default ManageLeave;
