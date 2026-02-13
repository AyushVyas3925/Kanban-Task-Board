import TaskCard from "./TaskCard";

export default function Column({ title, tasks, deleteTask, moveTask, updateTask, color }) {
    const colorVariants = {
        blue: "border-blue-500/30 shadow-blue-900/10",
        purple: "border-purple-500/30 shadow-purple-900/10",
        green: "border-green-500/30 shadow-green-900/10",
    };

    const headerColors = {
        blue: "text-blue-400",
        purple: "text-purple-400",
        green: "text-green-400",
    };

    return (
        <div className={`bg-gray-800/20 backdrop-blur-md w-80 p-5 rounded-2xl border ${colorVariants[color] || "border-gray-700"} flex flex-col shadow-xl transition-all hover:shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${headerColors[color] || "text-gray-200"} tracking-wide`}>
                    {title}
                </h2>
                <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs text-gray-400 font-mono">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 flex flex-col gap-4 min-h-[200px]">
                {tasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500/50 italic border-2 border-dashed border-gray-700/50 rounded-xl p-4">
                        <p>No tasks yet</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            moveTask={moveTask}
                            updateTask={updateTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}