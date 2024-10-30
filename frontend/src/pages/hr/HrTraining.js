import React, { useState } from "react";
import HRSidebar from "../../components/sidebar/HRSidebar";

const HRTraining = () => {
  const [assignedTrainings, setAssignedTrainings] = useState([
    {
      id: 1,
      user: "John Doe",
      training: "Customer Service",
      date: "2024-11-10",
    },
    {
      id: 2,
      user: "Jane Smith",
      training: "Security Training",
      date: "2024-11-12",
    },
  ]);

  const [availableTrainings] = useState([
    "Customer Service",
    "Security Training",
    "Casino Regulations",
    "Emergency Procedures",
    "Slot Machine Operations",
  ]);

  const removeTraining = (id) => {
    setAssignedTrainings((prevTrainings) =>
      prevTrainings.filter((training) => training.id !== id)
    );
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Training Management</h2>
        <p>Assign and manage training programs for employees and managers.</p>

        <h3>Available Training Programs</h3>
        <ul>
          {availableTrainings.map((training, index) => (
            <li key={index}>{training}</li>
          ))}
        </ul>

        <h3>Assigned Trainings</h3>
        <ul>
          {assignedTrainings.map((training) => (
            <li key={training.id}>
              {training.user} - {training.training} on {training.date}
              <button
                onClick={() => removeTraining(training.id)}
                className="btn btn-secondary"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-primary"
          onClick={() =>
            (window.location.href = "/hr/HRMainDashboard/assigntraining")
          }
        >
          Assign New Training
        </button>
      </div>
    </div>
  );
};

export default HRTraining;
