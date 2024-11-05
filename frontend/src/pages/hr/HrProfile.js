import React, { useState, useEffect } from "react";
import HRSidebar from "../../components/sidebar/HRSidebar";

const HRProfile = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Experienced HR Manager with a passion for talent management.",
    homeAddress: "123 Main St, Springfield",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="container-grid">
      <aside className="navbar-left">
        <HRSidebar />
      </aside>

      <main className="main-content">
        <div className="welcome">
          <h1 className="display-4">
            <span className="material-symbols-outlined">person</span>
            Edit your profile here, {user.firstName}!
          </h1>
        </div>
        <div className="profile-header">
          <h1>HR Profile</h1>
        </div>
        <div className="profile-overview">
          {!isEditing ? (
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
              <p>
                <strong>Home Address:</strong> {user.homeAddress}
              </p>
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form className="profile-details">
              <div className="form-group">
                <label>
                  <strong>Bio:</strong>
                </label>
                <textarea
                  name="bio"
                  className="form-control"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Home Address:</strong>
                </label>
                <input
                  type="text"
                  name="homeAddress"
                  className="form-control"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Save Changes
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default HRProfile;
