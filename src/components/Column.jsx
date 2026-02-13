import TaskCard from "./TaskCard";

export default function Column({
    title, tasks, deleteTask, moveTask, updateTask }) {
    return (
        <div className="bg-gray-800 w-80 p-4 rounded-lg flex flex-col">
            { }
            <h2 className="text-xl font-bold mb-4 text-gray-200">
                {title}
            </h2>

            <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
                {tasks.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center italic">No
                        tasks yet
                    </p>

                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            moveTask={moveTask}
                            updateTask={updateTask} />
                    ))
                )}

            </div>

        </div>
    );

}