import { NextAuthOptions, SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/src/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@demo.com" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any): Promise<any> {
        try {
          console.log("Backend received email:", credentials.email);
          console.log("Backend received password:", credentials.password);
          // Find user by email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // Log user details for debugging
          console.log("User found:", user);

          if (!user) {
            console.log("No user found with this email");
            throw new Error("No user found");
          }

          if (user.password === null) {
            throw new Error("Password is missing");
          }
          // Compare the password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          // Log password comparison result
          console.log("Is password correct?", isPasswordCorrect);

          if (!isPasswordCorrect) {
            console.log("Incorrect password");
            throw new Error("Incorrect Password");
          }

          return user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Error during authentication:", error);
          throw new Error(error);
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
        const { sub: oauthId, email, name } = profile;

        let existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: email! }, { oauthId: oauthId! }],
          },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              oauthId,
              email: email as string,
              name,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, profile }) {
      console.log("profile data", profile);
      console.log("JWT Callback - Token before modification:", token);
      console.log("JWT Callback - User (available only on sign-in):", user);
      if (user) {
        token.id = user.id?.toString();
        token.role = user.role?.toString();
        console.log("JWT Callback - User:", user);
        console.log("JWT Callback - Token after modification:", token);
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      console.log("Session Callback - Token:", token);
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      console.log("Session Callback - Session:", session);
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
