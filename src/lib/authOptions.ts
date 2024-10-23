import { NextAuthOptions, SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/src/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthSchema } from "@/src/lib/validators/auth.validator";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@demo.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const result = AuthSchema.safeParse(credentials);
        
        if (!result.success) {
          throw new Error("Validation Error");
        }
        
        const { email, password } = result.data;
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
            // Select specific fields you want to include in the session
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isvarified: true,
              password: true,
            },
          });

          if (!user) {
            throw new Error("No user found");
          }

          const userVarified = user?.isvarified;
          if (!userVarified) {
            throw new Error("User not varified");
          }

          if (user.password === null) {
            throw new Error("Password is missing");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          // Return user without password
          
          
          return user;
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
              name: name as string,
              isvarified: true,
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // Persist the user id and role to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Add user id and role to the session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  // Configure session handling
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 20 * 60 * 60, // 20 hours
  },
  // Configure JWT options
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Add this type declaration to ensure TypeScript recognizes the additional properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name?: string | null;
    }
  }
}