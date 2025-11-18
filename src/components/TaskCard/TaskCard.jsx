import React from "react";
import { KanbanContext } from "../../context/KanbanContext";
import './TaskCard.css';

export default function TaskCard({ task, columnKey }) {
  const { moveTask } = React.useContext(KanbanContext);

  return (
    <div className={`task-card ${columnKey}`}>
      <p>{task.title}</p>
      <div>
        <select
          defaultValue=""
          onChange={(e) => { 
            moveTask(task.id, e.target.value);
            e.target.value = "";
          }}
        >
          <option value="" disabled className="placeholder">
            Move to...
          </option>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
