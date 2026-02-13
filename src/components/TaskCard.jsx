import { useState } from "react";

export default function TaskCard({ task, deleteTask, moveTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const priorityConfig = {
        High: { color: "bg-red-500", text: "text-red-400", border: "border-red-500/50" },
        Medium: { color: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500/50" },
        Low: { color: "bg-green-500", text: "text-green-400", border: "border-green-500/50" }
    };

    const config = priorityConfig[task.priority] || priorityConfig.Medium;

    const handleUpdate = () => {
        if (editTitle.trim()) {
            updateTask(task.id, editTitle);
        } else {
            setEditTitle(task.title);
        }
        setIsEditing(false);
    };

    return (
        <div className={`bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden`}>
            {/* Priority Indicator Stripe */}
            <div className={`absolute top-0 left-0 w-1 h-full ${config.color} opacity-80`}></div>

            <div className="flex justify-between items-start pl-3 gap-2">
                {isEditing ? (
                    <textarea
                        className="bg-gray-900/80 text-white p-2 rounded-lg w-full text-sm border border-blue-500/50 focus:outline-none resize-none"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleUpdate();
                            }
                        }}
                        autoFocus
                        rows={2}
                    />
                ) : (
                    <p
                        onClick={() => setIsEditing(true)}
                        className="font-medium text-gray-200 cursor-pointer hover:text-white transition-colors text-sm break-words w-full"
                    >
                        {task.title}
                    </p>
                )}

                <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-700/50"
                    title="Delete Task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-between items-center mt-3 pl-3">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${config.text} bg-gray-900/50 px-2 py-0.5 rounded border ${config.border}`}>
                    {task.priority}
                </span>

                <select
                    className="bg-transparent text-gray-500 text-xs hover:text-gray-300 focus:text-blue-400 outline-none cursor-pointer transition-colors text-right appearance-none"
                    value={task.column}
                    onChange={(e) => moveTask(task.id, e.target.value)}
                >
                    <option value="To Do" className="bg-gray-800">To Do</option>
                    <option value="In Progress" className="bg-gray-800">In Progress</option>
                    <option value="Done" className="bg-gray-800">Done</option>
                </select>
            </div>
        </div>
    );
}