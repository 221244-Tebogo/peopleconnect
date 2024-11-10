//pages/manager/TaskList.js
import React from "react";
import TaskItem from "../components/TaskItem"; // Adjust path as necessary

function TaskList({ tasks, onToggleComplete }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Assigned Tasks</h1>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            text={task.text}
            employee={task.employee}
            completed={task.completed}
            onToggleComplete={() => onToggleComplete(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
