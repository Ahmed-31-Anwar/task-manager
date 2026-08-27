"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  createdAt: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      setTasks(data);
    }

    loadTasks();
  }, []);

  async function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask,
      }),
    });

    const task = await response.json();

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function deleteTask(indexToDelete: number) {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <p>Add and manage your tasks.</p>

      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            {task.title}

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}