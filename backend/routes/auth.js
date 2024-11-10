// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();

// Helper function to determine user type based on email
const isAdminEmail = (email) => email.endsWith("@peopleconnect.com");

// Register route
router.post("/register", async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  if (
    !name ||
    !surname ||
    !email ||
    !password ||
    (!isAdminEmail(email) && !role)
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const Model = isAdminEmail(email) ? Admin : User;
    const existingUser = await Model.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const redirectPath = isAdminEmail(email)
      ? "/hr/HRAdminDashboard"
      : `/${role}/dashboard`;

    res.json({ token, redirect: redirectPath });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter both email and password." });
  }

  try {
    const Model = isAdminEmail(email) ? Admin : User;
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const redirectPath = isAdminEmail(email)
      ? "/hr/HRAdminDashboard"
      : `/${user.role}/dashboard`;

    res.json({ token, redirect: redirectPath });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;
