// src/hr/EmployeeList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployees(response.data); // Map employees data from API response
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <HRSidebar />
      <div className="container">
        <h2>Employee List</h2>
        <ul className="list-group">
          {employees.map((employee) => (
            <li key={employee._id} className="list-group-item">
              {employee.name} {employee.surname} - {employee.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeList;
