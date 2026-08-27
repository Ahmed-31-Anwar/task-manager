"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button
        disabled
        className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
      >
        Loading...
      </button>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs text-slate-400">Signed in as</p>
          <p className="max-w-[180px] truncate text-sm font-semibold text-slate-700">
            {session.user.name || session.user.email}
          </p>
        </div>

        {session.user.image ? (
          <img
            src={session.user.image}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            {(session.user.name || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <button
          onClick={() => signOut()}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.42Z"
        />
        <path
          fill="#34A853"
          d="M12 21.67c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.67Z"
        />
        <path
          fill="#FBBC05"
          d="M6.54 13.76a5.86 5.86 0 0 1 0-3.52V7.71H3.29a9.73 9.73 0 0 0 0 8.58l3.25-2.53Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.21c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.24 14.63 2.33 12 2.33a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.93 9.46 6.21 12 6.21Z"
        />
      </svg>

      Continue with Google
    </button>
  );
}

