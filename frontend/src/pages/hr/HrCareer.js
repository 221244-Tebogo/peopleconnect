import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../../components/sidebar/HRSidebar";

const HrCareer = () => {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    description: "",
  });
  const [editPosition, setEditPosition] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch existing positions
    const fetchPositions = async () => {
      try {
        const response = await axios.get("/api/hr/careers");
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPosition((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPosition.title);
    formData.append("department", newPosition.department);
    formData.append("description", newPosition.description);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post("/api/hr/careers", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setPositions([...positions, response.data]);
      setNewPosition({ title: "", department: "", description: "" });
      setFile(null);
      alert("Position created successfully!");
    } catch (error) {
      console.error("Error creating position:", error);
    }
  };

  const handleEdit = (position) => {
    setEditPosition(position);
    setNewPosition(position);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/hr/careers/${editPosition.id}`,
        newPosition,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setPositions(
        positions.map((pos) =>
          pos.id === response.data.id ? response.data : pos
        )
      );
      setEditPosition(null);
      setNewPosition({ title: "", department: "", description: "" });
      alert("Position updated successfully!");
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/hr/careers/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setPositions(positions.filter((position) => position.id !== id));
      alert("Position deleted successfully!");
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Manage Career Opportunities</h2>

        {/* Form for creating or editing positions */}
        <form
          onSubmit={editPosition ? handleUpdate : handleCreate}
          className="form-container"
        >
          <h3>{editPosition ? "Edit Position" : "Add New Position"}</h3>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newPosition.title}
            onChange={handleChange}
            required
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={newPosition.department}
            onChange={handleChange}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={newPosition.description}
            onChange={handleChange}
            required
          ></textarea>
          <label>Upload Job Description (PDF):</label>
          <input type="file" onChange={handleFileChange} accept=".pdf" />
          <button type="submit" className="submit-button">
            {editPosition ? "Update Position" : "Create Position"}
          </button>
          {editPosition && (
            <button
              onClick={() => setEditPosition(null)}
              className="cancel-button"
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* Display list of positions with edit and delete options */}
        <div className="positions-list">
          <h3>Current Openings</h3>
          <ul>
            {positions.map((position) => (
              <li key={position.id}>
                <h4>{position.title}</h4>
                <p>Department: {position.department}</p>
                <p>Description: {position.description}</p>
                {position.fileUrl && (
                  <a
                    href={position.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Job Description
                  </a>
                )}
                <button
                  onClick={() => handleEdit(position)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(position.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HrCareer;
