const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },