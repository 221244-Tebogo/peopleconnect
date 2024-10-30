import React, { useState } from "react";
import axios from "axios";

const SickLeaveForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sickNote, setSickNote] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("sickNote", sickNote);

    try {
      const res = await axios.post("/api/leaves/apply-sick-leave", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Leave request submitted successfully");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sick Note:</label>
        <input
          type="file"
          onChange={(e) => setSickNote(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Submit Sick Leave</button>
    </form>
  );
};

export default SickLeaveForm;
