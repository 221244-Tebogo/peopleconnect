// routes/career.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const JobPosting = require("../models/JobPosting");

// Create a job posting (HR/Admin only)
router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    department,
    location,
    salaryRange,
    applicationDeadline,
  } = req.body;

  try {
    // Check if user is HR or Admin
    if (req.user.role !== "hr" && req.user.role !== "admin") {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const newJob = new JobPosting({
      title,
      description,
      department,
      location,
      salaryRange,
      applicationDeadline,
      postedBy: req.user.id,
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Get all job postings
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ postDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Apply to a job
router.post("/apply/:id", auth, async (req, res) => {
  const { coverLetter, resumeURL } = req.body;

  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Check if application deadline has passed
    if (job.applicationDeadline && job.applicationDeadline < Date.now()) {
      return res.status(400).json({ msg: "Application deadline has passed" });
    }

    // Check if already applied
    if (
      job.applications.some((app) => app.applicantId.toString() === req.user.id)
    ) {
      return res.status(400).json({ msg: "Already applied" });
    }

    const newApplication = {
      applicantId: req.user.id,
      coverLetter,
      resumeURL,
    };

    job.applications.unshift(newApplication);
    await job.save();
    res.json(job.applications);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Like a job posting
router.put("/like/:id", auth, async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Job already liked" });
    }

    job.likes.push(req.user.id);
    await job.save();
    res.json(job.likes);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Comment on a job posting
router.post("/comment/:id", auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const newComment = {
      userId: req.user.id,
      comment,
    };

    job.comments.unshift(newComment);
    await job.save();
    res.json(job.comments);
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a job posting (HR/Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Check if user is HR/Admin
    if (req.user.role !== "hr" && req.user.role !== "admin") {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await job.remove();
    res.json({ msg: "Job posting removed" });
  } catch (err) {
    console.error("Server Error", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
