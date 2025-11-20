import React from "react";
import { KanbanContext } from "../../context/KanbanContext";
import "./NewTaskForm.css";

// Controlled component used for adding new tasks
export default function NewTaskForm() {
  const [title, setTitle] = React.useState("");
  const { addTask } = React.useContext(KanbanContext);

  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle("");
      setShowForm(false);
    }
  };

  return (
    <div className="new-task-form-wrapper">
      <button
        className="add-task-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close" : "Create New Task"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="new-task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title"
          />
          <button type="submit" className="add-btn">Add task</button>
        </form>
      )}
    </div>
  );
}
