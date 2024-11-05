function adminAuth(req, res, next) {
  if (req.user && req.user.userType === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

module.exports = { adminAuth };
