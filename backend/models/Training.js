const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Training", trainingSchema);
