//backend/router/training
const express = require("express");
const Training = require("../models/Training");
const auth = require("../middleware/auth");
const router = express.Router();

// Get training programs
router.get("/programs", async (req, res) => {
  try {
    const programs = await Training.find(); // Fetch programs from the database
    res.status(200).json(programs);
  } catch (err) {
    console.error("Error fetching training programs:", err);
    res.status(500).json({
      message: "Error fetching training programs",
      error: err.message,
    });
  }
});

module.exports = router;
