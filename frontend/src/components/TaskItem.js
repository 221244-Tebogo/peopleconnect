import React from "react";

function TaskItem({ text, employee, completed, onDelete, onToggleComplete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0",
        textDecoration: completed ? "line-through" : "none",
        opacity: completed ? 0.6 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleComplete}
        style={{ marginRight: "10px" }}
      />
      <span>
        {text} - <strong>Assigned to:</strong> {employee}
      </span>
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            color: "white",
            backgroundColor: "red",
            padding: "5px 10px",
            marginLeft: "10px",
          }}
        >
          Delete
        </button>
      )}
    </li>
  );
}

export default TaskItem;
