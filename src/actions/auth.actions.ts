"use server";
import prisma from "../db/db";
import {
  AuthSchema,
  RegisterBusinessSchema,
} from "../lib/validators/auth.validator";
import bcryptjs from "bcryptjs";

// type SignUpResponse = { success: true } | { error: string | string[] };

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

export const ResgisterBusiness = async (formData: FormData) => {
  const registrationNumber = formData.get("registrationNumber") as string;
  const businessName = formData.get("name") as string;
  const businessAddress = formData.get("address") as string;
  const contactNumber = formData.get("institueContactNumber") as string; // This should match the model
  const email = formData.get("institueEmail") as string;

  try {
    const validateData = RegisterBusinessSchema.safeParse({
      registrationNumber,
      businessAddress,
      businessName,
      contactNumber,
      email,
    });
    if (!validateData.success) {
      return { error: "validation Error" };
    }
    const InstitueData = await prisma.institute.create({
      data: {
        registrationNumber: registrationNumber,
        businessName: businessName,
        businessaddress: businessAddress,
        contactNumber: contactNumber,
        email: email,
      },
    });

    if (InstitueData) {
      return { success: true };
    }
  } catch (error) {
    console.error("business Registration Error", error);
  }
};
