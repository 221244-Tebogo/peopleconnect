// src/components/Reports.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports
    axios
      .get("/api/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="reports">
      <h2>Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            {report.title}: {report.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
