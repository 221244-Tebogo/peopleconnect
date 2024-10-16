const express = require("express");
const router = express.Router();
const {
  getEmployeeDetails,
  applyLeave,
  getShifts,
} = require("../controllers/employeeController");

// Employee routes
router.get("/:id", getEmployeeDetails); // Get employee details
router.post("/apply-leave", applyLeave); // Apply for leave
router.get("/:id/shifts", getShifts); // Get employee shifts

module.exports = router;
