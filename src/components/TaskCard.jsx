
import { useState } from "react";
export default function TaskCard({
    task, deleteTask, moveTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const priorityColors = {
        High: "border-red-500",
        Medium: "border-yellow-500",
        Low: "border-green-500"
    };

    const handleUpdate = () => {
        updateTask(task.id, editTitle);
        setIsEditing(false);
    };
    return (
        <div className={`bg-gray-700 p-3 rounded-md shadow-md flex flex-col gap-2 group mb-2 border-l-4 ${priorityColors[task.priority] || "border-gray-500"}`}>
            <div className="flex justify-between items-center">
                {
                    isEditing ? (
                        <input
                            className="bg-gray-600 text-white p-1 rounded w-full mr-2"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleUpdate}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                            autoFocus
                        />
                    ) : (
                        <p
                            onClick={() => setIsEditing(true)}
                            className="font-medium text-white cursor-pointer hover:text-gray-300">
                            {task.title}
                        </p>
                    )}

                <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 font-bold cursor-pointer">
                    X
                </button>
            </div>
            <select
                className="bg-gray-600 text-white text-xs p-1 rounded border border-gray-500 outline-none cursor-pointer"
                value={task.column}
                onChange={(e) => moveTask(task.id, e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
}