const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
