import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid email profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial login, add user data to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token data to the session
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});