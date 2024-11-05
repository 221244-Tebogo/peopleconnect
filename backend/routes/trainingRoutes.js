const express = require("express");
const Training = require("../models/Training");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new training session
router.post("/assign", auth, async (req, res) => {
  try {
    const { employee, trainingTask, sessions } = req.body;

    const newTraining = new Training({
      employee,
      trainingTask,
      sessions,
      assignedBy: req.user.userId,
    });

    await newTraining.save();
    res
      .status(201)
      .json({
        message: "Training assigned successfully",
        training: newTraining,
      });
  } catch (err) {
    console.error("Error assigning training:", err);
    res
      .status(500)
      .json({ message: "Error assigning training", error: err.message });
  }
});

// Get all training sessions
router.get("/", auth, async (req, res) => {
  try {
    const trainings = await Training.find().populate("employee", "name");
    res.status(200).json(trainings);
  } catch (err) {
    console.error("Error fetching trainings:", err);
    res
      .status(500)
      .json({ message: "Error fetching trainings", error: err.message });
  }
});

module.exports = router;
