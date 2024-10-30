import React, { useState, useEffect } from "react";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("/api/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleNewAnnouncement = () => {
    const message = prompt("Enter announcement messagcde:");
    if (message) {
      axios
        .post("/api/announcements", { message })
        .then(() => alert("Announcement created"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="announcements">
      <h2>HR Announcements</h2>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement._id}>{announcement.message}</li>
        ))}
      </ul>
      <button onClick={handleNewAnnouncement}>Create New Announcement</button>
    </div>
  );
};

export default Announcements;
