import { useState, useEffect } from "react";

export default function UseEffectHook() {
    // State to store tasks
    const [tasks, setTasks] = useState([]);
    // State to store the input value
    const [task, setTask] = useState("");

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []); // Empty dependency array = runs only on mount

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // Runs whenever `tasks` state changes

    // Function to add a new task
    const addTask = () => {
        if (!task.trim()) return; // Prevent adding empty tasks
        setTasks([...tasks, task]);
        setTask(""); // Clear input after adding task
    };

    // Function to remove a task by index
    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

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
