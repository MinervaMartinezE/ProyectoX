import React from "react";
import { KanbanContext } from "../../context/KanbanContext";
import "./TaskCard.css";

export default function TaskCard({ task, columnKey }) {
  const { moveTask } = React.useContext(KanbanContext);

  const moveOptions = {
    todo: ["inProgress", "done"],
    inProgress: ["todo", "done"],
    done: ["todo", "inProgress"],
  };

  const labels = {
    todo: "to-do",
    inProgress: "in-progress",
    done: "done",
  };

  return (
    <div className={`task-card ${columnKey}`}>
      <p>{task.title}</p>
      <div className="task-actions">
        {moveOptions[columnKey].map((target) => (
          <button
            key={target}
            onClick={() => moveTask(task.id, target)}
            className={`move-btn move-to-${target}`}
          >
            Move to {labels[target]}
          </button>
        ))}
      </div>
    </div>
  );
}
