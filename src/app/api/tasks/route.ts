import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.orm.public.User
      .where({ email: session.user.email })
      .first();

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const tasks = await db.orm.public.Task
      .where({ userId: user.id })
      .all();

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
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const user = await db.orm.public.User
      .where({ email: session.user.email })
      .first();

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const task = await db.orm.public.Task.create({
      title,
      userId: user.id,
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

export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Valid task ID is required" },
        { status: 400 }
      );
    }

    const user = await db.orm.public.User
      .where({ email: session.user.email })
      .first();

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const deletedTask = await db.orm.public.Task
      .where({
        id,
        userId: user.id,
      })
      .delete();

    if (!deletedTask) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return Response.json(deletedTask);
  } catch (error) {
    console.error("Failed to delete task:", error);

    return Response.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}