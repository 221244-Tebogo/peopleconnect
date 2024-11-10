// models/EmployeeProfile.js
const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    department: { type: String, required: true },
    role: { type: String, required: true },
    contactNumber: { type: String },
    profileImageURL: { type: String }, // Profile image URL
    bio: { type: String }, // A short bio of the employee
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who are connected with this profile
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeProfile", EmployeeProfileSchema);
