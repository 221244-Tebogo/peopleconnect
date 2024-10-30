const express = require("express");
const router = express.Router();
const SickLeave = require("../models/SickLeave");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const { createLeaveRequest } = require("../controllers/leaveController");

// Route to apply for sick leave
router.post("/apply-sick-leave", auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload error", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

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
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
});

router.post("/create", createLeaveRequest);

module.exports = router;
