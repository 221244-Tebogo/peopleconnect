const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "Employee" }, // Can be Employee, Manager, or HR
  leaveBalance: { type: Number, default: 20 },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
