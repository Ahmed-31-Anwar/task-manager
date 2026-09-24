import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  // This route is only available during local E2E testing.
  // It can never be used in production.
  if (
    process.env.NODE_ENV === "production" ||
    process.env.E2E_TEST !== "true"
  ) {
    return NextResponse.json(
      { error: "Not available" },
      { status: 404 }
    );
  }

  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "AUTH_SECRET is not configured" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);

  const email =
    url.searchParams.get("email") ||
    "playwright-test@example.com";

  const name =
    url.searchParams.get("name") ||
    "Playwright Test User";

  const userId =
    email === "playwright-test@example.com"
      ? "playwright-test-user"
      : `playwright-${email.replace(/[^a-zA-Z0-9]/g, "-")}`;

  const existingUser = await db.orm.public.User
    .where({ email })
    .first();

  if (!existingUser) {
    await db.orm.public.User.create({
      id: userId,
      name,
      email,
      image: null,
    });
  }

  const token = await encode({
    secret,
    salt: "authjs.session-token",
    token: {
      name,
      email,
      picture: null,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("authjs.session-token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return NextResponse.json({
    success: true,
    email,
  });
}