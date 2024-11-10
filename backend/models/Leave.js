// const mongoose = require("mongoose");

// const LeaveSchema = new mongoose.Schema({
//   employee: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   leaveType: {
//     type: String,
//     required: true,
//     enum: ["annual", "sick", "maternity", "other"],
//   },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
//   reason: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     default: "Pending",
//   },
//   dateApplied: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Leave", LeaveSchema);

//backend/models/Leave.js

const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["annual", "sick", "maternity", "other"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  daysTaken: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
