import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HRSidebar from "../../components/sidebar/HRSidebar";
import "react-datepicker/dist/react-datepicker.css";
import "./HRAdminDashboard.css";

const ManageLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sickNote, setSickNote] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeType, setEmployeeType] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("/api/hr/leave-requests");
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
    const formData = new FormData();
    formData.append("leaveType", leaveType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("employeeType", employeeType);
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
      setLeaveRequests([
        ...leaveRequests,
        { leaveType, startDate, endDate, employeeType },
      ]);
      setLeaveType("");
      setStartDate(null);
      setEndDate(null);
      setSickNote(null);
      setShowLeaveModal(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      await axios.patch(`/api/hr/leave-request/${id}`, { status });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
      setShowActionModal(false);
      alert(`Leave status updated to ${status}`);
    } catch (error) {
      console.error(`Error updating leave status: ${status}`, error);
      alert(`Failed to update leave status to ${status}`);
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
                  className="btn btn-success"
                  onClick={() => setShowLeaveModal(true)}
                >
                  <i className="fa fa-plus"></i> Apply for Leave
                </button>
              </div>
            </div>
          </div>

          {/* Leave Request Modal */}
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
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Leave Request"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowLeaveModal(false)}
                  >
                    Cancel
                  </button>
                </form>
                <p>Total Leave Days: {calculateLeaveDays()}</p>
              </div>
            </div>
          )}

          <h3 className="mt-5">All Leave Requests</h3>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowActionModal(true);
                      }}
                      className="btn btn-warning btn-sm"
                    >
                      Take Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approve/Reject Modal */}
      {showActionModal && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Take Action on Leave Request</h2>
            <p>Leave Type: {selectedRequest.leaveType}</p>
            <p>Start Date: {selectedRequest.startDate}</p>
            <p>End Date: {selectedRequest.endDate}</p>
            <p>Status: {selectedRequest.status}</p>
            <div className="modal-actions">
              <button
                onClick={() =>
                  updateLeaveStatus(selectedRequest.id, "Approved")
                }
                className="btn btn-success"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  updateLeaveStatus(selectedRequest.id, "Rejected")
                }
                className="btn btn-danger"
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowActionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeave;
