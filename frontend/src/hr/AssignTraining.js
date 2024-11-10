// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AssignTraining = ({ onClose, onSave, trainingToEdit }) => {
//   const [taskData, setTaskData] = useState({
//     employee: "",
//     trainingTask: "",
//     sessions: [],
//   });
//   const [employees, setEmployees] = useState([]);
//   const [trainingPrograms, setTrainingPrograms] = useState([]);
//   const [selectedDates, setSelectedDates] = useState([null, null]);

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
//         setEmployees(response.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         alert("Failed to fetch employees. Please ensure you are authorized.");
//       }
//     };

//     // Load predefined training programs relevant to South African casinos
//     const predefinedTrainingPrograms = [
//       { _id: "1", name: "Responsible Gambling Awareness" },
//       { _id: "2", name: "Customer Service Excellence in Gaming" },
//       { _id: "3", name: "Casino Floor Management Basics" },
//       { _id: "4", name: "Advanced Slot Machine Operations" },
//       { _id: "5", name: "Table Games Supervision and Security" },
//       { _id: "6", name: "Financial Compliance in Casinos" },
//       { _id: "7", name: "Health and Safety Regulations" },
//       { _id: "8", name: "Hospitality and Guest Services" },
//       { _id: "9", name: "VIP Player Relations and Management" },
//     ];
//     setTrainingPrograms(predefinedTrainingPrograms);

//     fetchEmployees();

//     if (trainingToEdit) {
//       setTaskData(trainingToEdit);
//     }
//   }, [trainingToEdit]);

//   const handleDateChange = (dates) => {
//     setSelectedDates(dates);
//     if (dates && dates[0] && dates[1]) {
//       const start = dates[0];
//       const end = dates[1];
//       const daysBetween = [];
//       for (
//         let date = new Date(start);
//         date <= end;
//         date.setDate(date.getDate() + 1)
//       ) {
//         daysBetween.push({
//           date: new Date(date).toISOString().split("T")[0],
//           startTime: "",
//           endTime: "",
//         });
//       }
//       setTaskData((prevData) => ({ ...prevData, sessions: daysBetween }));
//     }
//   };

//   const handleTimeChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedSessions = taskData.sessions.map((session, i) =>
//       i === index ? { ...session, [name]: value } : session
//     );
//     setTaskData((prevData) => ({ ...prevData, sessions: updatedSessions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/trainings/assign",
//         taskData,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       if (response.status === 201) {
//         alert("Training assigned successfully!");
//         onSave(response.data.training); // Optionally pass data to parent for state update
//         onClose();
//       }
//     } catch (error) {
//       console.error("Error assigning training:", error);
//       alert("Failed to assign training. Please try again.");
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Assign Multi-Day Training</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Employee:</label>
//           <select
//             name="employee"
//             value={taskData.employee}
//             onChange={(e) =>
//               setTaskData({ ...taskData, employee: e.target.value })
//             }
//             required
//           >
//             <option value="">Select Employee</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>

//           <label>Training Program:</label>
//           <select
//             name="trainingTask"
//             value={taskData.trainingTask}
//             onChange={(e) =>
//               setTaskData({ ...taskData, trainingTask: e.target.value })
//             }
//             required
//           >
//             <option value="">Select Training Program</option>
//             {trainingPrograms.map((training) => (
//               <option key={training._id} value={training.name}>
//                 {training.name}
//               </option>
//             ))}
//           </select>

//           <label>Select Training Dates:</label>
//           <DatePicker
//             selected={selectedDates[0]}
//             onChange={(update) => handleDateChange(update)}
//             startDate={selectedDates[0]}
//             endDate={selectedDates[1]}
//             selectsRange
//             inline
//           />

//           {taskData.sessions.map((session, index) => (
//             <div key={index}>
//               <h4>{session.date}</h4>
//               <label>Start Time:</label>
//               <input
//                 type="time"
//                 name="startTime"
//                 value={session.startTime}
//                 onChange={(e) => handleTimeChange(e, index)}
//                 required
//               />
//               <label>End Time:</label>
//               <input
//                 type="time"
//                 name="endTime"
//                 value={session.endTime}
//                 onChange={(e) => handleTimeChange(e, index)}
//                 required
//               />
//             </div>
//           ))}

//           <button type="submit" className="btn btn-success me-2">
//             Assign Training
//           </button>
//           <button type="button" className="btn btn-secondary" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AssignTraining;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignTraining = ({ onClose, onSave, trainingToEdit }) => {
  const [taskData, setTaskData] = useState({
    employee: "",
    trainingTask: "",
    sessions: [],
  });
  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeesAndPrograms = async () => {
      try {
        const [employeesRes, programsRes] = await Promise.all([
          axios.get("/api/employees", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("/api/training/programs", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        setEmployees(employeesRes.data);
        setTrainingPrograms(programsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      }
    };

    fetchEmployeesAndPrograms();
  }, []);

  if (error) return <div>{error}</div>;

  return <div>{/* UI components for assigning training */}</div>;
};

export default AssignTraining;
