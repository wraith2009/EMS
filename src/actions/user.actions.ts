"use server";

import prisma from "../db/db";
import { getUserByIdSchema } from "../lib/validators/auth.validator";

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    console.log("user id in backend is", userId);
    const parsedId = getUserByIdSchema.safeParse({ userId });
    console.log("parsedId", parsedId.error);
    if (!parsedId.success) {
      return { success: false, message: "Invalid user ID" };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parsedId.data.userId,
      },
      include: {
        admin: true,
      },
    });

    if (user && user.role === "admin" && user.admin) {
      return { success: true, user: user, admin: user.admin };
    }

    return { success: true, user: user };
  } catch (error) {
    console.error("Error getting user by id:", error);
    return { success: false, message: "Server error" };
  }
};

export const fetchUserdetails = async ({ userid }: { userid: string }) => {
  console.log("Fetching user details", userid);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
      include: {
        teacher: true,
        student: true,
        admin: true,
        hod: true,
      },
    });

    console.log("User details", user);

    if (!user) {
      return {
        status: 404,
        success: false,
        message: "User not found",
      };
    }

    return {
      status: 200,
      success: true,
      user: user,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    };
  }
};
