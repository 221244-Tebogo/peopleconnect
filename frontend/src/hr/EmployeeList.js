// pages/hr/EmployeeList.js
// src/pages/hr/EmployeeList.js
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
        const response = await axios.get("/api/users/employees", {
          // Correct endpoint
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is available
          },
        });
        setEmployees(response.data);
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HRSidebar from "../../components/sidebar/HRSidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./HRAdminDashboard.css";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found");
//         }

//         const response = await axios.get(
//           "http://localhost:5001/api/employees",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           setEmployees(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         alert("Failed to fetch employees. Please ensure you are authorized.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="app-container">
//       <HRSidebar />
//       <div className="container">
//         <h2>Manage Employees</h2>
//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((employee) => (
//                 <tr key={employee._id}>
//                   <td>{employee.name}</td>
//                   <td>{employee.email}</td>
//                   <td>{employee.address || "N/A"}</td>
//                   <td>{employee.phone || "N/A"}</td>
//                   <td>{employee.role}</td>
//                   <td>
//                     <button className="btn btn-warning btn-sm me-2">
//                       <i className="fa fa-pencil"></i> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No employees found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;
