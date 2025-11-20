import React from "react";
import "./searchFilter.css";

// Uncontrolled component used for task filtering
export default function SearchFilter({ onFilter }) {
  const inputRef = React.useRef();

  const handleFilter = () => {
    const term = inputRef.current.value;
    onFilter(term);
  };

  return (
    <div className="search-filter-container">
      <input type="text" ref={inputRef} placeholder="Search tasks..." className="search-filter-input"/>
      <button onClick={handleFilter} className="filter-btn">Filter</button>
    </div>
  );
}
