import { db } from "@/lib/prisma";

export async function GET() {
  const tasks = await db.orm.public.Task.all();

  return Response.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const task = await db.orm.public.Task.create({
  title: body.title,
});

  return Response.json(task);
}