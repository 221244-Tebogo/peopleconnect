const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// Role-based middleware
const verifyEmployee = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Employee") {
      next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  });
};

const verifyManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Manager") {
      next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  });
};

const verifyHR = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "HR") {
      next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  });
};

module.exports = { verifyEmployee, verifyManager, verifyHR };
