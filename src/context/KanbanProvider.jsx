import React from "react";
import { KanbanContext } from "./KanbanContext";

export function KanbanProvider({ children }) {
  // Centralized task state grouped by column
  const [tasks, setTasks] = React.useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Prevents the initialization logic from running twice 
  const hasLoadedRef = React.useRef(false);

  // Creates a new task and adds it to the "todo" column
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      description: "",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  // Moves a task between columns while preserving all other tasks
  const moveTask = (taskId, newColumn) => {
    setTasks((prev) => {
      let moved;

      const updated = Object.fromEntries(
        Object.entries(prev).map(([column, items]) => {
          const remaining = items.filter((t) => {
            if (t.id === taskId) moved = t;
            return t.id !== taskId;
          });
          return [column, remaining];
        })
      );

      if (moved) updated[newColumn] = [...updated[newColumn], moved];
      return updated;
    });
  };

  // Initializes tasks from localStorage or falls back to remote data
  React.useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const loadTasks = async () => {
      const stored = localStorage.getItem("kanbanTasks");
      if (stored) {
        setTasks(JSON.parse(stored));
        return;
      }

      try {
        const res = await fetch("https://dummyjson.com/todos?limit=5");
        const data = await res.json();

        const initial = { todo: [], inProgress: [], done: [] };
        data.todos.forEach((item) => {
          const task = { id: item.id, title: item.todo, description: "" };
          item.completed ? initial.done.push(task) : initial.todo.push(task);
        });

        setTasks(initial);
      } catch (err) {
        console.error("Failed to load initial tasks:", err);
      }
    };

    loadTasks();
  }, []);

  // Persists all task updates to localStorage
  React.useEffect(() => {
    if (!hasLoadedRef.current) return;
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <KanbanContext.Provider value={{ tasks, addTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
}
