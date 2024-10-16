const Employee = require("../models/employee");
const Leave = require("../models/leave");

// Get employee details
const getEmployeeDetails = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee details" });
  }
};

// Apply for leave
const applyLeave = async (req, res) => {
  const { employeeId, leaveType, startDate, endDate } = req.body;
  try {
    const leaveRequest = new Leave({
      employee: employeeId,
      leaveType,
      startDate,
      endDate,
    });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Error applying for leave" });
  }
};

// Get all shifts for an employee
const getShifts = async (req, res) => {
  // Implement your shift fetching logic here
  res.json({ message: "Shifts for the employee" });
};

module.exports = { getEmployeeDetails, applyLeave, getShifts };
