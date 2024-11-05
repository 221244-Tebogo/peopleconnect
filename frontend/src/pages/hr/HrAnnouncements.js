import React, { useState } from "react";
import axios from "axios";
import HRSidebar from "../../components/sidebar/HRSidebar";

const HrAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/api/announcements/create",
        { title, content: message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Announcement created successfully!");
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Create New Announcement</h2>
        <form onSubmit={handleAnnouncement}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Create Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default HrAnnouncements;
