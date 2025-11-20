import React from "react";
import { KanbanContext } from "../../context/KanbanContext";
import BoardColumn from "../BoardColumn/BoardColumn";
import "./Board.css";

export default function Board({ filterTerm }) {
  const { tasks } = React.useContext(KanbanContext);

  // Filters tasks based on the filter term
  const filterTasks = (taskList) => {
    return taskList.filter((task) => {
      const text = filterTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(text) ||
        (task.description && task.description.toLowerCase().includes(text))
      );
    });
  };

  return (
    <div className="board">
      <BoardColumn
        title="TO-DO"
        tasks={filterTasks(tasks.todo)}
        columnKey="todo"
      />
      <BoardColumn
        title="IN-PROGRESS"
        tasks={filterTasks(tasks.inProgress)}
        columnKey="inProgress"
      />
      <BoardColumn
        title="DONE"
        tasks={filterTasks(tasks.done)}
        columnKey="done"
      />
    </div>
  );
}
