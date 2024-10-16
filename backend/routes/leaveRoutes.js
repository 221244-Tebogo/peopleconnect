const express = require("express");
const router = express.Router();
const {
  applyForLeave,
  getLeaveRequests,
  approveLeave,
} = require("../controllers/leaveController");
const {
  verifyEmployee,
  verifyManager,
  verifyHR,
} = require("../middleware/auth");

// Employee - Apply for leave
router.post("/apply", verifyEmployee, applyForLeave);

// Manager - View leave requests and approve
router.get("/requests", verifyManager, getLeaveRequests);
router.put("/:id/approve", verifyManager, approveLeave);

module.exports = router;
