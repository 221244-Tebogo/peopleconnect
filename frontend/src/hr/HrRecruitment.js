import React, { useState } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";

const HRRecruitment = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleJobPost = async (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      jobDescription,
    };

    try {
      await axios.post("/api/hr/recruitment", jobData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Job post created successfully!");
    } catch (error) {
      console.error("Error creating job post:", error);
      alert("Failed to create job post");
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Create New Job Post</h2>
        <form onSubmit={handleJobPost}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Create Job Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default HRRecruitment;
