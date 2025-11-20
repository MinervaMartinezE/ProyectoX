import React from "react";
import { KanbanContext } from "./KanbanContext";

export function KanbanProvider({ children }) {
  const [tasks, setTasks] = React.useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Añadir tareas
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      description: "",
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  // Mover tareas
  const moveTask = (taskId, newColumn) => {
    setTasks((prevTasks) => {
      let movedTask;

      const updated = Object.fromEntries(
        Object.entries(prevTasks).map(([column, tasks]) => {
          const remaining = tasks.filter((task) => {
            if (task.id === taskId) movedTask = task;
            return task.id !== taskId;
          });
          return [column, remaining];
        })
      );

      if (movedTask) {
        updated[newColumn] = [...updated[newColumn], movedTask];
      }
      return updated;
    });
  };

  // Cargar primero desde localStorage
  React.useEffect(() => {
    const storedTasks = localStorage.getItem("kanbanTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Hacer fetch solo si no hay datos en localStorage
  React.useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = localStorage.getItem("kanbanTasks");
      if (storedTasks) return;

      try {
        const response = await fetch("https://dummyjson.com/todos?limit=5");
        const data = await response.json();

        const initialTasks = { todo: [], inProgress: [], done: [] };
        data.todos.forEach((item) => {
          const task = { id: item.id, title: item.todo, description: "" };
          if (item.completed) initialTasks.done.push(task);
          else initialTasks.todo.push(task);
        });

        setTasks(initialTasks);
      } catch (err) {
        console.error("Error al cargar datos de la API:", err);
      }
    };

    fetchTasks();
  }, []);

  //Guardar en localStorage cada vez que cambian las tareas
  React.useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <KanbanContext.Provider value={{ tasks, addTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
}
