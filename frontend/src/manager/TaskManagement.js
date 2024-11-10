import React, { useState } from "react";
import TaskItem from "../components/TaskItem"; // Adjust path as necessary

const employees = ["Alice", "Bob", "Charlie"]; // Replace with dynamic data as needed

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");

  const addTask = () => {
    if (newTask.trim() && assignedEmployee) {
      setTasks([
        ...tasks,
        { text: newTask, employee: assignedEmployee, completed: false },
      ]);
      setNewTask("");
      setAssignedEmployee("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Assignment</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <select
        value={assignedEmployee}
        onChange={(e) => setAssignedEmployee(e.target.value)}
        style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}
      >
        <option value="">Assign to...</option>
        {employees.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))}
      </select>
      <button onClick={addTask} style={{ marginLeft: "10px", padding: "10px" }}>
        Add Task
      </button>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            text={task.text}
            employee={task.employee}
            completed={task.completed}
            onDelete={() => deleteTask(index)}
            onToggleComplete={() => toggleTaskCompletion(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskManagement;
