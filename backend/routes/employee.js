// routes/employee.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const EmployeeProfile = require("../models/EmployeeProfile");
const User = require("../models/User");

// Get own profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await EmployeeProfile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Create or update own profile
router.post("/", auth, async (req, res) => {
  const { department, role, contactNumber, bio } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id,
    department,
    role,
    contactNumber,
    bio,
  };

  try {
    let profile = await EmployeeProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await EmployeeProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new EmployeeProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Get profile by user ID
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await EmployeeProfile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "email"]);
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error("Server Error", err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
});

// Add a comment to a profile
router.post("/comment/:user_id", auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const profile = await EmployeeProfile.findOne({ user: req.params.user_id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    const newComment = {
      userId: req.user.id,
      name: req.user.name, // Assuming name is stored in req.user
      comment,
    };

    profile.comments.unshift(newComment);
    await profile.save();
    res.json(profile.comments);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Connect with another user
router.post("/connect/:user_id", auth, async (req, res) => {
  try {
    const profile = await EmployeeProfile.findOne({ user: req.params.user_id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    if (profile.connections.includes(req.user.id)) {
      return res.status(400).json({ msg: "Already connected" });
    }

    profile.connections.push(req.user.id);
    await profile.save();
    res.json(profile.connections);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
