import React from "react";
import { KanbanContext } from "../context/KanbanContext";

//Formulario para añadir nuevas tares. Componente controlado
export default function NewTaskForm() {
  const [title, setTitle] = React.useState("");
  const { addTask } = React.useContext(KanbanContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}