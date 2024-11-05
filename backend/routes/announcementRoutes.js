const express = require("express");
const Announcement = require("../models/Announcement");
const auth = require("../middleware/auth");
const { adminAuth } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create an announcement
router.post("/create", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      createdBy: req.user.userId,
    });
    await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created. Awaiting approval.",
      announcement: newAnnouncement,
    });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res
      .status(500)
      .json({ message: "Error creating announcement", error: err.message });
  }
});

module.exports = router;
