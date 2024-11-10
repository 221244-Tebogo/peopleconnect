//models/Employee
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String },
    phone: { type: String },
    department: { type: String },
    // Other relevant fields for employees
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
