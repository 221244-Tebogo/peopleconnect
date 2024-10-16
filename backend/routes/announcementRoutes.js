const express = require("express");
const router = express.Router();

// Get all announcements
router.get("/", (req, res) => {
  res.json({ message: "List of announcements" });
});

// Create a new announcement
router.post("/", (req, res) => {
  const { message } = req.body;
  res.status(201).json({ message: `Announcement created: ${message}` });
});

module.exports = router;
