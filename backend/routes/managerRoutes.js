const express = require("express");
const router = express.Router();
const {
  getTeam,
  approveLeave,
  assignShifts,
} = require("../controllers/managerController");

// Manager routes
router.get("/team", getTeam); // Get managed team
router.put("/approve-leave/:id", approveLeave); // Approve leave
router.post("/assign-shifts", assignShifts); // Assign shifts to employees

module.exports = router;
