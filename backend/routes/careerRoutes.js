const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const upload = require("../middleware/upload"); // Make sure this is set up correctly
const auth = require("../middleware/auth");

// POST route for creating a new career position
router.post("/", auth, (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload error", error: err.message });
    }

    const { title, department, description, duration } = req.body;

    try {
      const newPosition = new Career({
        title,
        department,
        description,
        duration,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : "", // Correct path for the uploaded file
      });

      const savedPosition = await newPosition.save();
      res.status(201).json(savedPosition); // Return the saved position object
    } catch (error) {
      console.error("Error saving position:", error);
      res
        .status(500)
        .json({ message: "Error saving position", error: error.message });
    }
  });
});

// GET route for fetching all career positions
router.get("/", async (req, res) => {
  try {
    const positions = await Career.find();
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res
      .status(500)
      .json({ message: "Error fetching positions", error: error.message });
  }
});

module.exports = router;
