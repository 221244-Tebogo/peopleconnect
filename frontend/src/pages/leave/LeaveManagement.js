import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="employee-management">
      <h2>Employee Management</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagement;
