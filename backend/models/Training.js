const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  trainingTask: { type: String, required: true },
  sessions: [
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Training", TrainingSchema);
