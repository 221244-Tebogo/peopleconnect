const Manager = require("../models/manager");
const Leave = require("../models/leave");

// Get team of employees managed by the manager
const getTeam = async (req, res) => {
  try {
    const manager = await Manager.findById(req.user.id).populate("team");
    res.json(manager.team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team details" });
  }
};

// Approve leave for an employee
const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    leave.status = "Approved";
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: "Error approving leave" });
  }
};

// Assign shifts to employees
const assignShifts = async (req, res) => {
  // Implement shift assignment logic here
  res.json({ message: "Shifts assigned to employees" });
};

module.exports = { getTeam, approveLeave, assignShifts };
