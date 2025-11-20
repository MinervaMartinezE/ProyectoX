import TaskCard from "../TaskCard/TaskCard";
import "./BoardColumn.css";

export default function BoardColumn({ title, tasks, columnKey }) {
  return (
    <div className={"board-column ${columnKey}"}>
      <h2>{title}</h2>
      {tasks.map((tasks) => (
        <TaskCard key={tasks.id} task={tasks} columnKey={columnKey} />
      ))}
    </div>
  );
}
