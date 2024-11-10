import React, { useState } from "react";
import HRSidebar from "../components/sidebar/HRSidebar";
import AssignTraining from "./AssignTraining";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const HRTraining = () => {
  const [assignedTrainings, setAssignedTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState(null);

  const removeTraining = (id) => {
    setAssignedTrainings((prevTrainings) =>
      prevTrainings.filter((training) => training.id !== id)
    );
  };

  const handleSaveTraining = (newTraining) => {
    if (trainingToEdit) {
      setAssignedTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.id === trainingToEdit.id
            ? { ...trainingToEdit, ...newTraining }
            : training
        )
      );
    } else {
      setAssignedTrainings((prevTrainings) => [
        ...prevTrainings,
        { id: prevTrainings.length + 1, ...newTraining },
      ]);
    }
    setShowModal(false);
    setTrainingToEdit(null);
  };

  const handleEditTraining = (training) => {
    setTrainingToEdit(training);
    setShowModal(true);
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Trainings</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setShowModal(true);
                    setTrainingToEdit(null);
                  }}
                >
                  <i className="fa fa-plus"></i>
                  <span>Assign New Training</span>
                </button>
              </div>
            </div>
          </div>

          {showModal && (
            <AssignTraining
              onClose={() => setShowModal(false)}
              onSave={handleSaveTraining}
              trainingToEdit={trainingToEdit}
            />
          )}

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Training Program</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedTrainings.map((training) => (
                <tr key={training.id}>
                  <td>{training.employee}</td>
                  <td>{training.trainingTask}</td>
                  <td>{training.sessions[0]?.date || "N/A"}</td>
                  <td>
                    {training.sessions[training.sessions.length - 1]?.date ||
                      "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditTraining(training)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </button>
                    <button
                      onClick={() => removeTraining(training.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa fa-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRTraining;
