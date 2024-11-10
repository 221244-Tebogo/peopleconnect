//backend/middleware/auth.js -->> centralized login & authenticatio with announcements etc
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();

// Helper function for role-based redirects
const getRedirectPath = (role) => {
  switch (role) {
    case "hr":
      return "/hr/AdminDashboard";
    case "manager":
      return "/manager/dashboard";
    case "employee":
      return "/employees/dashboard";
    default:
      return "/";
  }
};

// Register Route
router.post("/register", async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  if (
    !name ||
    !surname ||
    !email ||
    !password ||
    (!email.endsWith("@peopleconnect.com") && !role)
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const existingUser =
      (await User.findOne({ email })) || (await Admin.findOne({ email }));
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (email.endsWith("@peopleconnect.com")) {
      newUser = new Admin({ name, surname, email, password: hashedPassword });
      await newUser.save();
      return res.json({
        token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        }),
        redirect: "/hr/AdminDashboard",
      });
    }

    newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const redirectPath = getRedirectPath(role);
    const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, redirect: redirectPath });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter both email and password" });
  }

  try {
    const foundUser =
      (await User.findOne({ email })) || (await Admin.findOne({ email }));
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const role =
      foundUser.role || (foundUser instanceof Admin ? "admin" : undefined);
    const token = jwt.sign(
      { id: foundUser._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const redirectPath = getRedirectPath(role);
    res.json({ token, redirect: redirectPath });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
