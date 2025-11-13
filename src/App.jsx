import React from "react";
import { KanbanProvider } from "./context/KanbanContext";
import Board from "./components/Board";
import SearchFilter from "./components/SearchFilter";
import NewTaskForm from "./components/NewTaskForm";

function App() {
  const [filterTerm, setFilterTerm] = React.useState("");

  return (
    <KanbanProvider>
      <div className="App">
        <h1>Kanban Board</h1>
        <SearchFilter onFilter={(term) => setFilterTerm(term)} />
        <NewTaskForm />
        <Board filterTerm={filterTerm} />
      </div>
    </KanbanProvider>
  );
}
