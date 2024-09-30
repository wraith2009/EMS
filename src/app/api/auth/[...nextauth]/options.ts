import { NextAuthOptions, SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/src/db/db";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@demo.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) throw new Error("No user found with this email.");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) throw new Error("Incorrect password.");

          return user;
        } catch (error: any) {
          // console.error("Authorization error:", error.message);
          throw new Error(error.message || "Error during authentication.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user && profile.email && profile.name) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name ?? null,
              password: "google-auth-user",
            },
          });
        }
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.id?.toString();
        token.role = user.role?.toString();
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.user_id = token.user_id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
