const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Leave", LeaveSchema);
