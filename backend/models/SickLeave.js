//models/sickleave
const mongoose = require("mongoose");

const SickLeaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
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
  sickNote: {
    type: String,
    required: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SickLeave", SickLeaveSchema);
