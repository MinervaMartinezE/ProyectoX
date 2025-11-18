import React from "react";
import { KanbanContext } from "../context/KanbanContext";

//Estado tarjetas 
export function KanbanProvider({ children }) {
  const [tasks, setTasks] = React.useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  //Añadir tareas
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

  //Mover tareas
  const moveTask = (taskId, newColumn) => {
    setTasks((prevTasks) => {
      let movedTask;

      const updated = Object.fromEntries(
        //de array a objeto.
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

  //Carga y persistencia: UseEffect
  React.useEffect(() => {
    const storedTasks = localStorage.getItem("kanbanTasks");
    
    if (storedTasks) {
      console.log("Cargando tareas desde localStorage");
      setTasks(JSON.parse(storedTasks));
      return
      
    } else {
      console.log("No hay tareas en localStorage, cargando datos de ejemplo");
      
      fetch("https://dummyjson.com/todos?limit=5")
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos recibidos desde la API: ", data);

          const initialTasks = { todo: [], inProgress: [], done: [] };
          data.todos.forEach((item) => {
            const task = {
              id: item.id,
              title: item.todo,
              description: "",
            };
            if (item.completed) {
              initialTasks.done.push(task);
            } else {
              initialTasks.todo.push(task);
            }
          });
          setTasks(initialTasks);
        })
        .catch(err => console.error("Error al cargar datos de la API: ", err));
    }
  }, []);
// Guardar en localStorage cuando cambie el estado de las tareas
  React.useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <KanbanContext.Provider value={{ tasks, addTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );    
}
