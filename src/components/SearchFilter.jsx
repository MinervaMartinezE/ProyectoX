import React from "react";

//Función para buscar una tarea. Componente no controlado
export default function SearchFilter({ onFilter }) {
  const inputRef = React.useRef();

  const handleFilter = () => {
    const term = inputRef.current.value;
    onFilter(term);
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Search tasks..." />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}
