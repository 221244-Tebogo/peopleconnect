// models/Announcement.js
const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Employee who posted the announcement
    postDate: { type: Date, default: Date.now },
    expiryDate: { type: Date }, // Optional expiration date
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Employees who liked the announcement
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
