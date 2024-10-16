const express = require("express");
const router = express.Router();
const {
  createEmployee,
  manageLeaveRequests,
} = require("../controllers/hrController");

// HR routes
router.post("/create-employee", createEmployee); // Create a new employee
router.get("/leave-requests", manageLeaveRequests); // Get all leave requests

module.exports = router;
