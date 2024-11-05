import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import axios from "axios";

const Career = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("/api/careers", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching career positions:", error);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Career Opportunities</h1>
        <ul>
          {positions.map((position) => (
            <li key={position.id}>
              <h3>{position.title}</h3>
              <p>{position.description}</p>
              <p>
                <strong>Department:</strong> {position.department}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Career;
