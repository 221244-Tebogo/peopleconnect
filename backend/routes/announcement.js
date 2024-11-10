// routes/announcement.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Announcement = require("../models/Announcement");

// Create an announcement
router.post("/", auth, async (req, res) => {
  const { title, content, expiryDate } = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      content,
      expiryDate,
      postedBy: req.user.id,
    });

    const announcement = await newAnnouncement.save();
    res.json(announcement);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Get all announcements
router.get("/", auth, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ postDate: -1 });
    res.json(announcements);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Like an announcement
router.put("/like/:id", auth, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      return res.status(404).json({ msg: "Announcement not found" });

    if (announcement.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Announcement already liked" });
    }

    announcement.likes.push(req.user.id);
    await announcement.save();
    res.json(announcement.likes);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Comment on an announcement
router.post("/comment/:id", auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      return res.status(404).json({ msg: "Announcement not found" });

    const newComment = {
      userId: req.user.id,
      name: req.user.name,
      comment,
    };

    announcement.comments.unshift(newComment);
    await announcement.save();
    res.json(announcement.comments);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an announcement (if authorized)
router.delete("/:id", auth, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      return res.status(404).json({ msg: "Announcement not found" });

    // Check user authorization
    if (announcement.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await announcement.remove();
    res.json({ msg: "Announcement removed" });
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
