const LeaveRequest = require("../models/LeaveRequest");

// Employee applies for leave
const applyForLeave = async (req, res) => {
  const { leaveType, startDate, endDate } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
      status: "Pending",
    });

    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to apply for leave" });
  }
};

// Manager views leave requests
const getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate("employee");
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
};

// Manager approves leave
const approveLeave = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(id);
    if (!leaveRequest)
      return res.status(404).json({ error: "Leave request not found" });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update leave request" });
  }
};

module.exports = { applyForLeave, getLeaveRequests, approveLeave };
