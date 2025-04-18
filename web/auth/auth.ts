import { prisma } from "@/db/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        await prisma.business.upsert({
          where: { email: profile.email },
          update: {
            name: profile.name,
            image: profile.image as string | null,
            googleId: profile.sub,
          },
          create: {
            googleId: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.image as string | null,
          },
        });
        return true;
      }
      return false;
    },
    async jwt({ token, account, profile }) {
      // Add Google profile info to the JWT token
      if (account && profile) {
        token.googleId = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Get business data and add to session
      if (session.user?.email) {
        const business = await prisma.business.findUnique({
          where: { email: session.user.email },
        });

        if (business) {
          session.user.id = business.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
