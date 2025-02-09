

import { useState } from "react";

export default function UseStateHook() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (!task.trim()) return;
        setTasks([...tasks, task]);
        setTask(""); // Clear input after adding task
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-lg font-bold">To-Do List</h2>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full my-2"
                placeholder="Enter a task"
            />
            <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>
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
