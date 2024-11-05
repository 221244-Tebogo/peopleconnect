import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AssignTraining = ({ onClose, onSave, trainingToEdit }) => {
  const [taskData, setTaskData] = useState({
    employee: "",
    trainingTask: "",
    sessions: [],
  });
  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([null, null]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/trainings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched training data:", response.data);
        // You can set this data in a state if needed to display on the page
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };

    fetchEmployees();
    fetchTrainingPrograms();
    fetchTrainingData();

    if (trainingToEdit) {
      setTaskData(trainingToEdit);
    }
  }, [trainingToEdit]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (dates && dates[0] && dates[1]) {
      const start = dates[0];
      const end = dates[1];
      const daysBetween = [];
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        daysBetween.push({
          date: new Date(date).toISOString().split("T")[0],
          startTime: "",
          endTime: "",
        });
      }
      setTaskData((prevData) => ({ ...prevData, sessions: daysBetween }));
    }
  };

  const handleTimeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSessions = taskData.sessions.map((session, i) =>
      i === index ? { ...session, [name]: value } : session
    );
    setTaskData((prevData) => ({ ...prevData, sessions: updatedSessions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/trainings/assign",
        taskData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        alert("Training assigned successfully!");
        onSave(response.data.training); // Optionally pass data to parent for state update
        onClose();
      }
    } catch (error) {
      console.error("Error assigning training:", error);
      alert("Failed to assign training. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Assign Multi-Day Training</h2>
        <form onSubmit={handleSubmit}>
          <label>Employee:</label>
          <select
            name="employee"
            value={taskData.employee}
            onChange={(e) =>
              setTaskData({ ...taskData, employee: e.target.value })
            }
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>

          <label>Training Program:</label>
          <select
            name="trainingTask"
            value={taskData.trainingTask}
            onChange={(e) =>
              setTaskData({ ...taskData, trainingTask: e.target.value })
            }
            required
          >
            <option value="">Select Training Program</option>
            {trainingPrograms.map((training) => (
              <option key={training.id} value={training.name}>
                {training.name}
              </option>
            ))}
          </select>

          <label>Select Training Dates:</label>
          <DatePicker
            selected={selectedDates[0]}
            onChange={(update) => handleDateChange(update)}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
          />

          {taskData.sessions.map((session, index) => (
            <div key={index}>
              <h4>{session.date}</h4>
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={session.startTime}
                onChange={(e) => handleTimeChange(e, index)}
                required
              />
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={session.endTime}
                onChange={(e) => handleTimeChange(e, index)}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn btn-success me-2">
            Assign Training
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTraining;
