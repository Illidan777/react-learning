import { useState, useEffect, useCallback } from "react";

export default function UseCallbackHook() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // useCallback ensures addTask function is memoized
    const addTask = useCallback(() => {
        if (!task.trim()) return;
        setTasks((prevTasks) => [...prevTasks, task]);
        setTask("");
    }, [task]); // Re-creates only if `task` changes

    // useCallback ensures removeTask function is memoized
    const removeTask = useCallback(
        (index) => {
            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
        },
        [] // Doesn't depend on any external values
    );

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-lg font-bold">To-Do List</h2>

            {/* Input for new task */}
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full my-2"
                placeholder="Enter a task"
            />

            {/* Button to add task */}
            <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>

            {/* Task list */}
            <ul className="mt-4">
                {tasks.map((t, index) => (
                    <li key={index} className="flex justify-between p-2 border-b">
                        {t}
                        <button onClick={() => removeTask(index)} className="text-red-500">
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
