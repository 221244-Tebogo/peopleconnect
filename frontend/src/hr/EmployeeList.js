//src/hr/EmployeeList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    email: "",
    role: "employee",
  });
  const [editEmployee, setEditEmployee] = useState(null); // Start with null to avoid uncontrolled warnings

  // Fetch employees from the /api/users endpoint
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("Authorization token is missing. Please log in.");

      const response = await axios.get("http://localhost:5001/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Employees fetched:", response.data);
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employee data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5001/api/users",
        newEmployee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees([...employees, response.data]);
      setNewEmployee({ name: "", surname: "", email: "", role: "employee" });
    } catch (err) {
      console.error("Error creating employee:", err);
      alert("Failed to create employee.");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/users/${id}`, editEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(
        employees.map((emp) =>
          emp._id === id ? { ...emp, ...editEmployee } : emp
        )
      );
      setEditEmployee(null);
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Failed to update employee.");
    }
  };

  // Frontend - EmployeeList.js
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <HRSidebar />
      <div className="container">
        <h2>Employee List</h2>

        {/* Add New Employee Form */}
        <div className="mb-4">
          <h4>Add New Employee</h4>
          <input
            type="text"
            placeholder="First Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Surname"
            value={newEmployee.surname}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, surname: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="form-control mb-2"
          />
          <select
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="form-control mb-2"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>
          <button onClick={handleCreate} className="btn btn-success">
            Add Employee
          </button>
        </div>

        {/* Employee List Table */}
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                {editEmployee && editEmployee._id === employee._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editEmployee.name || ""}
                        onChange={(e) =>
                          setEditEmployee({
                            ...editEmployee,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editEmployee.surname || ""}
                        onChange={(e) =>
                          setEditEmployee({
                            ...editEmployee,
                            surname: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={editEmployee.email || ""}
                        onChange={(e) =>
                          setEditEmployee({
                            ...editEmployee,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={editEmployee.role || "employee"}
                        onChange={(e) =>
                          setEditEmployee({
                            ...editEmployee,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="hr">HR</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(employee._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditEmployee(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>
                      <button
                        onClick={() => setEditEmployee(employee)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
