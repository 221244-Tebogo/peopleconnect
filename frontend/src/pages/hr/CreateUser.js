import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HRAdminDashboard.css";

const CreateUser = ({ onClose, onSave, userToEdit }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Load userToEdit data if editing an existing user
  useEffect(() => {
    if (userToEdit) {
      setUserData(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
    setUserData({ name: "", email: "", address: "", phone: "" });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{userToEdit ? "Edit Employee" : "Add New Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success me-2">
            {userToEdit ? "Update Employee" : "Add Employee"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
