const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const { adminAuth } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a post
router.post("/create", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, createdBy: req.user.userId });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created. Awaiting approval.", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
});

module.exports = router;
