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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          });
          if (!user) {
            throw new Error("No user found");
          }

          if (user.password === null) {
            throw new Error("Password is missing");
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
          );

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
              name: name as string,
              isvarified: true,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.role = user.role?.toString();
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
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
    maxAge: 20 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
