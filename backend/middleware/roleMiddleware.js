//middleware/roleMiddleware.js
function roleAuth(role) {
  return (req, res, next) => {
    if (req.user && req.user.userType === role) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied. Role-specific access only." });
  };
}

module.exports = { roleAuth }; // Ensure it's exported this way
