"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";

type Task = {
  id: number;
  title: string;
  createdAt: string;
};

export default function Home() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();

        if (!response.ok) {
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
  }, [session]);

  async function addTask() {
    if (!newTask.trim() || isAdding) {
      return;
    }

    setIsAdding(true);
    setError("");

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
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Something went wrong while adding the task.");
    } finally {
      setIsAdding(false);
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

  const userName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
              ✓
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Task Manager
              </h1>
              <p className="text-xs text-slate-400">
                Stay organized. Get things done.
              </p>
            </div>
          </div>

          <SignInButton />
        </div>
      </nav>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Welcome section */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Your workspace
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Good to see you, {userName}.
          </h2>

          <p className="mt-2 text-slate-500">
            Keep track of what needs to get done today.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Tasks added
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Status
            </p>

            <p className="mt-2 text-lg font-bold text-emerald-600">
              {tasks.length === 0 ? "Ready to start" : "Making progress"}
            </p>
          </div>
        </section>

        {/* Add task */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="font-bold text-slate-900">
              Add a new task
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              What would you like to accomplish?
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 sm:flex-row">
            <input
              type="text"
              placeholder="e.g. Finish project documentation"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTask();
                }
              }}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            <button
              onClick={addTask}
              disabled={isAdding || !newTask.trim()}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isAdding ? "Adding..." : "Add Task"}
            </button>
          </div>

          {error && (
            <div className="mx-6 mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}
        </section>

        {/* Tasks */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Your tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Everything you need to keep track of.
              </p>
            </div>

            {tasks.length > 0 && (
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </span>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                ✓
              </div>

              <h3 className="mt-5 font-semibold text-slate-900">
                You&apos;re all caught up
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                You don&apos;t have any tasks yet. Add your first task above
                and start getting things done.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                    ✓
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-medium text-slate-800">
                      {task.title}
                    </p>


                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-slate-400">
          Built with Next.js, Prisma, PostgreSQL & Google Authentication
        </div>
      </footer>
    </main>
  );
}
