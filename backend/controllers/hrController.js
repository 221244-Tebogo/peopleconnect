const Employee = require("../models/employee");

// Create new employee
const createEmployee = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const employee = new Employee({ name, email, role });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee" });
  }
};

// Manage leave requests (HR overview)
const manageLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate("employee");
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

module.exports = { createEmployee, manageLeaveRequests };
