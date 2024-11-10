// backend/routes/user.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Utility function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Register user route
router.post("/register", async (req, res) => {
  const { name, email, password, userType } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    user = new User({ name, email, password, userType });
    await user.save();
    const token = jwt.sign(
      { userId: user.id, userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token, userType });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, userType: user.userType });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all users - correct base path for /api/users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("name surname email role");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// backend/routes/user.js
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
