// //backend/routes/userRoutes
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Utility function to validate email format
// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // Register user route with email format validation
// router.post("/register", async (req, res) => {
//   console.log("Request body received:", req.body); // Debug log
//   const { name, email, password, userType } = req.body;

//   // Check if the email format is valid
//   if (!validateEmail(email)) {
//     return res
//       .status(400)
//       .json({ msg: "Invalid email format. Please use a valid email address." });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     user = new User({ name, email, password, userType });
//     await user.save();
//     console.log("User saved successfully:", user);

//     const payload = { userId: user.id, userType: user.userType };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(201).json({ token, userType: user.userType });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login user route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Check if the email format is valid
//   if (!validateEmail(email)) {
//     return res
//       .status(400)
//       .json({ msg: "Invalid email format. Please use a valid email address." });
//   }

//   try {
//     console.log("Login attempt:", req.body);

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match status:", isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const payload = { userId: user.id, userType: user.userType };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token, userType: user.userType });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

//backend/routes/userRoutes.js
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

// Register user route with email format validation
router.post("/register", async (req, res) => {
  console.log("Request body received:", req.body); // Debug log
  const { name, email, password, userType } = req.body;

  // Check if the email format is valid
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ msg: "Invalid email format. Please use a valid email address." });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password, userType });
    await user.save();
    console.log("User saved successfully:", user);

    const payload = { userId: user.id, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, userType: user.userType });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login user route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email format is valid
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ msg: "Invalid email format. Please use a valid email address." });
  }

  try {
    console.log("Login attempt:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { userId: user.id, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userType: user.userType });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Example of a protected route
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
