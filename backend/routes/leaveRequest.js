const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const { verifyEmployee, verifyManager } = require("../middleware/auth");

router.post("/apply", verifyEmployee, async (req, res) => {
  const { leaveType, startDate, endDate } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
    });

    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for leave" });
  }
});

router.put("/:id/approve", verifyManager, async (req, res) => {
  const { status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest)
      return res.status(404).json({ error: "Leave request not found" });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to update leave request" });
  }
});

module.exports = router;
