"use server";
import prisma from "../db/db";
import { AuthSchema } from "../lib/validators/auth.validator";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import APP_PATH from "@/src/config/path.config";
import { sendConfirmationEmail } from "../lib/sendConfirmationEmail";
import { cookies } from "next/headers";

export const signUp = async (formData: FormData) => {
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
        email: email,
      },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    // const adminUser = await prisma.admin.create({
    if (user) {
      cookies().set("userEmail", email, {
        maxAge: 60 * 5,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      console.log("Server: Cookie set for email:", email); // Log cookie setting
      const VerificationToken = uuidv4();
      const TokenExpiry = new Date(Date.now() + 3 * 60 * 1000);
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          VerificationToken: VerificationToken,
          VerificationTokenExpiry: TokenExpiry,
        },
      });

      const verificationLink = `${process.env.NEXTAUTH_URL}${APP_PATH.VERIFY_EMAIL}/${VerificationToken}`;

      try {
        await sendConfirmationEmail(
          email,
          verificationLink,
          "EMAIL_VERIFICATION",
        );
      } catch (err) {
        console.error("Failed to send verification email:", err);
        return {
          error: ["Failed to send verification email. Please try again later."],
          success: false,
        };
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Server error:", error);
    return { error: "Unable to sign up user. Please try again later." };
  }
};

export const VerifyEmail = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  try {
    const currentTime = new Date();

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        VerificationToken: token,
        VerificationTokenExpiry: {
          gte: currentTime,
        },
      },
    });

    if (!user) {
      return { error: "Invalid Token or Token Expired" };
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        isvarified: true,
        VerificationToken: null,
        VerificationTokenExpiry: null,
      },
    });

    return { success: true, message: "Verification successful" };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, error: "Server Error" };
  }
};

export const ResendVerificationEmail = async ({ email }: { email: string }) => {
  try {
    const token = uuidv4();
    const expiryTime = new Date(Date.now() + 3 * 60 * 1000);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { message: "Unable to find user" };
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        VerificationToken: token,
        VerificationTokenExpiry: expiryTime,
      },
    });

    const verificationLink = `${process.env.NEXTAUTH_URL}${APP_PATH.VERIFY_EMAIL}/${token}`;

    try {
      await sendConfirmationEmail(
        email,
        verificationLink,
        "EMAIL_VERIFICATION",
      );
    } catch (err) {
      console.error("Failed to send verification email:", err);
      return {
        error: ["Failed to send verification email. Please try again later."],
        success: false,
      };
    }
    return { success: true, message: "Verification Email Sent" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
};

export const ResetPasswordLink = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const token = uuidv4();
    const expiryTime = new Date(Date.now() + 3 * 60 * 1000);
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ResetPasswordToken: token,
        ResetPasswordTokenExpiry: expiryTime,
      },
    });

    const resetPasswordLink = `${process.env.NEXTAUTH_URL}${APP_PATH.RESET_PASSWORD}/${token}`;

    await sendConfirmationEmail(email, resetPasswordLink, "RESET_PASSWORD");

    return { success: true, message: "Reset password link sent" };
  } catch (error) {
    console.error("Error generating reset password link:", error);
    return { success: false, message: "Server error" };
  }
};

export const ResendResetPasswordLink = async ({ email }: { email: string }) => {
  try {
    const token = uuidv4();
    const expiryTime = new Date(Date.now() + 3 * 60 * 1000);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { message: "Unable to find user" };
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ResetPasswordToken: token,
        ResetPasswordTokenExpiry: expiryTime,
      },
    });

    const verificationLink = `${process.env.NEXTAUTH_URL}${APP_PATH.RESET_PASSWORD}/${token}`;

    try {
      await sendConfirmationEmail(email, verificationLink, "RESET_PASSWORD");
    } catch (err) {
      console.error("Failed to send verification email:", err);
      return {
        error: ["Failed to send verification email. Please try again later."],
        success: false,
      };
    }
    return { success: true, message: "Verification Email Sent" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
};

export const ResetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  try {
    const currentTime = new Date();

    const user = await prisma.user.findFirst({
      where: {
        ResetPasswordToken: token,
        ResetPasswordTokenExpiry: {
          gte: currentTime,
        },
      },
    });

    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        ResetPasswordToken: null,
        ResetPasswordTokenExpiry: null,
      },
    });

    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: "Server error" };
  }
};
