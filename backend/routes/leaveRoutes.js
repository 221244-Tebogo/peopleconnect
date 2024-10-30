const express = require("express");
const router = express.Router();
const SickLeave = require("../models/SickLeave"); // Ensure the model path is correct
const upload = require("../middleware/upload"); // Ensure the middleware path is correct
const auth = require("../middleware/auth"); // Ensure the middleware path is correct
const { createLeaveRequest } = require("../controllers/leaveController");

// Route to apply for sick leave
router.post("/apply-sick-leave", auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      } else {
        try {
          const { startDate, endDate } = req.body;
          const newLeave = new SickLeave({
            employee: req.user.id,
            startDate,
            endDate,
            sickNote: `/uploads/${req.file.filename}`,
          });

          await newLeave.save();
          res.status(200).json({
            message: "Sick leave request submitted successfully",
            newLeave,
          });
        } catch (error) {
          res.status(500).json({ message: "Server error", error });
        }

        console.log("Current directory: ", __dirname);
      }
    }
  });
});

// Route to create a leave request
router.post("/create", createLeaveRequest);

module.exports = router;
