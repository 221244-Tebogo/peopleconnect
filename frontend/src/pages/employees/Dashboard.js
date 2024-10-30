import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <h1>Welcome, {userData.name}</h1>
            <p>Role: {userData.role}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
