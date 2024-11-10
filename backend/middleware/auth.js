//backend/middleware/auth.js -->> centralized login & authentication'
// backend/middleware/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();

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
      return res.json({ user: newUser, redirect: "/hr/dashboard" });
    }

    newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const redirectPath =
      role === "manager"
        ? "/manager/dashboard"
        : role === "employee"
        ? "/employees/dashboard"
        : role === "hr" || role === "admin"
        ? "/hr/dashboard"
        : "/";

    res.json({ user: newUser, redirect: redirectPath });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error");
  }
});

// Login Route
// backend/middleware/auth.js

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password presence
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
    const payload = { user: { id: foundUser.id, name: foundUser.name, role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const redirectPath =
      role === "manager"
        ? "/manager/dashboard"
        : role === "employee"
        ? "/employees/dashboard"
        : role === "hr" || role === "admin"
        ? "/hr/dashboard"
        : "/";

    res.json({
      token,
      userType: role,
      name: foundUser.name,
      redirect: redirectPath,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// const jwt = require("jsonwebtoken");

// function auth(req, res, next) {
//   const authHeader = req.header("Authorization");
//   console.log("Token received:", authHeader); // Debugging line

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("Token validation failed:", err); // Detailed error log
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// }

// module.exports = auth;

//UPDATED 9 NOV - 18H54 STILL USER NOT ABLE TO LOGIN

// //middleware/auth.js -->>. centralized authentication
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Admin = require("../models/Admin");

// const router = express.Router();

// // Register Route
// router.post("/register", async (req, res) => {
//   const { name, surname, email, password, role } = req.body;

//   if (
//     !name ||
//     !surname ||
//     !email ||
//     !password ||
//     (!email.endsWith("@peopleconnect.com") && !role)
//   ) {
//     return res.status(400).json({ message: "Please enter all fields" });
//   }

//   try {
//     // Check if user or admin exists
//     let user = await User.findOne({ email });
//     let admin = await Admin.findOne({ email });

//     if (user || admin) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Register admin if email domain matches
//     if (email.endsWith("@peopleconnect.com")) {
//       const newAdmin = new Admin({ name, surname, email, password });
//       const salt = await bcrypt.genSalt(10);
//       newAdmin.password = await bcrypt.hash(password, salt);
//       await newAdmin.save();

//       return res.json({
//         user: newAdmin,
//         message: "Admin registered successfully",
//         redirect: "/hr/HRAdminDashboard",
//       });
//     }

//     // Register regular user
//     user = new User({ name, surname, email, password, role });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     // Define redirect based on role
//     let redirectPath;
//     switch (role) {
//       case "manager":
//         redirectPath = "/manager/ManagerDashboard";
//         break;
//       case "employee":
//         redirectPath = "/employees/Dashboard";
//         break;
//       case "hr":
//         redirectPath = "/hr/HRAdminDashboard";
//         break;
//       default:
//         redirectPath = "/home";
//     }

//     res.json({ user, redirect: redirectPath });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// // Login Route
// // routes/auth.js -- Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please enter both email and password" });
//   }

//   try {
//     // Check if user or admin exists
//     const foundUser =
//       (await User.findOne({ email })) || (await Admin.findOne({ email }));
//     if (!foundUser) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, foundUser.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Prepare payload with user role and other details
//     const payload = {
//       user: {
//         id: foundUser.id,
//         name: foundUser.name,
//         role: foundUser.role || foundUser.userType || "admin", // Fallback for Admin
//       },
//     };

//     // Sign JWT token
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send response with token and correct redirect path
//     let redirectPath;
//     if (foundUser.role === "hr" || foundUser.role === "admin") {
//       redirectPath = "/hr/HRAdminDashboard";
//     } else if (foundUser.role === "manager") {
//       redirectPath = "/manager/ManagerDashboard";
//     } else if (foundUser.role === "employee") {
//       redirectPath = "/employees/Dashboard";
//     } else {
//       return res.status(400).json({ message: "Role not defined correctly" });
//     }

//     res.json({
//       token,
//       userType: foundUser.role || foundUser.userType,
//       name: foundUser.name,
//       redirect: redirectPath,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;
