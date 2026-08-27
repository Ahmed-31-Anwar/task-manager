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
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-slate-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-lg font-bold text-indigo-400 shadow-lg shadow-indigo-500/5">
              ✓
            </div>

            <div>
              <h1 className="text-base font-bold tracking-tight text-white">
                Task Manager
              </h1>

              <p className="text-xs text-slate-500">
                Stay focused. Get things done.
              </p>
            </div>
          </div>

          <SignInButton />
        </div>
      </nav>

      {/* Main */}
      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:py-16">

        {/* Hero */}
        <section className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/10 bg-indigo-500/[0.07] px-3 py-1.5 text-xs font-medium text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400" />
            Your personal workspace
          </div>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Good to see you,{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
              {userName}.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
            Keep your day organized, stay focused, and turn your plans into
            progress.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total tasks</p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-sm text-indigo-400">
                ≡
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-white">
              {tasks.length}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Current focus</p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-sm text-violet-400">
                ✦
              </div>
            </div>

            <p className="mt-4 text-lg font-bold text-violet-300">
              {tasks.length === 0 ? "Nothing yet" : "Making progress"}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Status</p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-sm text-emerald-400">
                ✓
              </div>
            </div>

            <p className="mt-4 text-lg font-bold text-emerald-300">
              {tasks.length === 0 ? "Ready to start" : "On track"}
            </p>
          </div>
        </section>

        {/* Add task */}
        <section className="mb-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-sm">
          <div className="border-b border-white/[0.06] px-6 py-5">
            <h3 className="font-semibold text-white">
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
              className="flex-1 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10"
            />

            <button
              onClick={addTask}
              disabled={isAdding || !newTask.trim()}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
            >
              {isAdding ? "Adding..." : "Add Task"}
            </button>
          </div>

          {error && (
            <div className="mx-6 mb-6 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
              {error}
            </div>
          )}
        </section>

        {/* Tasks */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Your tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Everything you need to keep track of.
              </p>
            </div>

            {tasks.length > 0 && (
              <span className="rounded-full border border-indigo-400/10 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </span>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/10 bg-indigo-500/10 text-2xl text-indigo-400 shadow-lg shadow-indigo-500/5">
                ✓
              </div>

              <h3 className="mt-6 font-semibold text-white">
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
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-400/20 hover:bg-white/[0.04] hover:shadow-indigo-500/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/15">
                    ✓
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-medium text-slate-200">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Added to your workspace
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 opacity-100 transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
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
      <footer className="relative mt-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-7 text-center text-xs text-slate-600">
          Built with Next.js, Prisma, PostgreSQL & Google Authentication
        </div>
      </footer>
    </main>
  );
}

