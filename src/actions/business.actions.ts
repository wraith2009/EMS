"use server";
import { RegisterBusinessSchema } from "../lib/validators/auth.validator";
import prisma from "../db/db";

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
