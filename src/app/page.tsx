"use client";

import { useEffect, useState } from "react";
import SignInButton from "@/components/SignInButton";

type Task = {
  id: number;
  title: string;
  createdAt: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Please sign in to view your tasks.");
          setTasks([]);
          return;
        }

        if (Array.isArray(data)) {
          setTasks(data);
          setError("");
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setError("Something went wrong while loading your tasks.");
        setTasks([]);
      }
    }

    loadTasks();
  }, []);

  async function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create task.");
        return;
      }

      setTasks((currentTasks) => [...currentTasks, data]);
      setNewTask("");
      setError("");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Something went wrong while adding the task.");
    }
  }

  async function deleteTask(id: number) {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete task.");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError("Something went wrong while deleting the task.");
    }
  }

  return (
    <main>
      <header>
        <h1>Task Manager</h1>
        <p>Add and manage your tasks.</p>

        <SignInButton />
      </header>

      {error && <p>{error}</p>}

      <section>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </section>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}