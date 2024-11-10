// CreateUser.js
import React, { useState, useEffect } from "react";

const CreateUser = ({ onSave, onClose, userToEdit }) => {
  const [formData, setFormData] = useState({
    name: userToEdit ? userToEdit.name : "",
    email: userToEdit ? userToEdit.email : "",
    address: userToEdit ? userToEdit.address : "",
    phone: userToEdit ? userToEdit.phone : "",
    role: userToEdit ? userToEdit.role : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default CreateUser;
