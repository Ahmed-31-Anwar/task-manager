"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button disabled>Loading...</button>;
  }

  if (session?.user) {
    return (
      <div>
        <span>Welcome, {session.user.name}</span>

        <button onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")}>
      Continue with Google
    </button>
  );
}