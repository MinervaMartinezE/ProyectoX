import React from "react";
import { KanbanProvider } from "./context/KanbanProvider";
import Board from "./components/Board/Board";
import SearchFilter from "./components/SearchFilter";
import NewTaskForm from "./components/NewTaskForm";
import "./App.css";

export default function App() {
  const [filterTerm, setFilterTerm] = React.useState("");

  return (
    <KanbanProvider>
      <div className="App">
        <header className="App-header">
          <h1>Kanban Board</h1>
          <SearchFilter onFilter={(term) => setFilterTerm(term)} />
        </header>
        <Board filterTerm={filterTerm} />
        <NewTaskForm />
      </div>
    </KanbanProvider>
  );
}
