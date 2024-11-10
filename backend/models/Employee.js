//modes/Employee
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

//Models/Employee
// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: { type: String },
//     phone: { type: String },
//     role: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Employee", employeeSchema);
