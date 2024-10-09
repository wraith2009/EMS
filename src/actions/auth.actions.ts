"use server";
import prisma from "../db/db";
import { AuthSchema } from "../lib/validators/auth.validator";
import bcryptjs from "bcryptjs";

type SignUpResponse = { success: true } | { error: string | string[] };

export const signUp = async (formData: FormData): Promise<SignUpResponse> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const validateData = AuthSchema.safeParse({ email, password });

    if (!validateData.success) {
      const errorMessages = validateData.error.errors.map((err) => err.message);
      return { error: errorMessages };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email!,
      },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Server error:", error);
    return { error: "Unable to sign up user. Please try again later." };
  }
};
