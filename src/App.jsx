import { useState, useEffect } from "react";
import Column from "./components/Column";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);
  const moveTask = (taskId, newColumn) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask) return;
    const task = {
      id: Date.now(),
      title: newTask,
      column: "To Do",
      priority: newPriority,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const updateTask = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">
        Kanban Board
      </h1>
      <div className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Type a task..."
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}

        />
        <select
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
        >
          Add Task
        </button>
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        <Column title="To Do"
          tasks={tasks.filter((t) => t.column === "To Do")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask} />
        <Column title="In Progress"
          tasks={tasks.filter((t) => t.column === "In Progress")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask} />
        <Column title="Done"
          tasks={tasks.filter((t) => t.column === "Done")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask} />
      </div>
    </div>
  );
}