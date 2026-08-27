import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await db.orm.public.Task.all();

    return Response.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return Response.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string") {
      return Response.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    const title = body.title.trim();

    if (!title) {
      return Response.json(
        { error: "Task title cannot be empty" },
        { status: 400 }
      );
    }

    const task = await db.orm.public.Task.create({
      title,
    });

    return Response.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);

    return Response.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}