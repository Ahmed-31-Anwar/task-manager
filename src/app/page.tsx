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

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
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

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const task = await response.json();

      setTasks((currentTasks) => [...currentTasks, task]);
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  async function deleteTask(id: number) {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  return (
    <main>
      <header>
        <h1>Task Manager</h1>
        <p>Add and manage your tasks.</p>

        <SignInButton />
      </header>

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