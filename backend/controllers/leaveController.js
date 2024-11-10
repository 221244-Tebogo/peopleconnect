// //

// const Leave = require("../models/Leave");

// // Controller function to get unapproved leave requests
// exports.getUnapprovedLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find({ status: "Pending" }).populate(
//       "employee",
//       "name"
//     );
//     res.status(200).json(leaves);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching leave requests", error });
//   }
// };

// // Controller function to approve a leave request
// exports.approveLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Leave.findByIdAndUpdate(id, { status: "Approved" });
//     res.status(200).json({ message: "Leave approved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error approving leave", error });
//   }
// };

// // Controller function to delete a leave request
// exports.deleteLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Leave.findByIdAndDelete(id);
//     res.status(200).json({ message: "Leave request deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting leave request", error });
//   }
// };

//backend/controllers/leaveController.js

// controllers/leaveController.js
const Leave = require("../models/Leave");
const User = require("../models/User");

// Controller function to get unapproved leave requests
const getUnapprovedLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: "Pending" }).populate(
      "employee",
      "name"
    );
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching unapproved leaves:", error);
    res.status(500).json({ message: "Error fetching leave requests", error });
  }
};

// Controller function to apply for leave
const applyForLeave = async (req, res) => {
  // Your existing code for applyForLeave
};

// Controller function to approve leave
const approveLeave = async (req, res) => {
  // Logic to approve leave
};

// Controller function to delete a leave request
const deleteLeave = async (req, res) => {
  // Logic to delete leave
};

// Controller function to get leave history
const getLeaveHistory = async (req, res) => {
  // Logic to get leave history
};

// Controller function to get leave balance
const getLeaveBalance = async (req, res) => {
  try {
    const balance = 10; // Replace with actual balance logic
    res.status(200).json({ balance });
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    res.status(500).json({ message: "Error fetching leave balance", error });
  }
};

// Ensure all functions are exported
module.exports = {
  getUnapprovedLeaves,
  applyForLeave,
  approveLeave,
  deleteLeave,
  getLeaveHistory,
  getLeaveBalance,
};
