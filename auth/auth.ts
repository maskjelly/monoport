import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import SignIn from "@/app/api/auth/signin/sign-in";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid email profile"
        }
      }
    })
  ],
  pages : {
    signIn : "/signin"
  },
  // Add these additional configurations
  secret: process.env.NEXTAUTH_SECRET,
});