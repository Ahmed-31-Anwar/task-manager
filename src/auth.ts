import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
  clientId: process.env.AUTH_GOOGLE_ID!,
  clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  authorization: {
    params: {
      prompt: "select_account",
    },
  },
}),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const existingUser = await db.orm.public.User
        .where({ email: user.email })
        .first();

      if (!existingUser) {
        await db.orm.public.User.create({
          id: user.id!,
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
  },
});