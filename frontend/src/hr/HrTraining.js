// src/hr/HRTraining.js
import React, { useState } from "react";
import HRSidebar from "../components/sidebar/HRSidebar";
import AssignTraining from "./AssignTraining";
import AssignedTraining from "./AssignedTraining";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const HRTraining = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState(null);

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
              onSave={() => setShowModal(false)}
              trainingToEdit={trainingToEdit}
            />
          )}

          {/* Assigned Trainings Table */}
          <AssignedTraining />
        </div>
      </div>
    </div>
  );
};

export default HRTraining;
