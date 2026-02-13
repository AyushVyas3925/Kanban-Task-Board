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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1c2e] to-gray-900 text-white p-10 flex flex-col items-center selection:bg-blue-500 selection:text-white font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg z-10">
        Kanban Board
      </h1>

      <div className="mb-10 flex gap-4 bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl z-10">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="p-3 w-64 rounded-xl bg-gray-900/50 border border-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className="p-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium cursor-pointer"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="High"> High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transform hover:-translate-y-0.5 transition-all active:scale-95"
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-8 flex-wrap justify-center w-full max-w-7xl z-10">
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.column === "To Do")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
          color="blue"
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.column === "In Progress")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
          color="purple"
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.column === "Done")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
          color="green"
        />
      </div>
    </div>
  );
}