"use server";
import { RegisterBusinessSchema } from "../lib/validators/auth.validator";
import prisma from "../db/db";

export const RegisterBusiness = async (
  formData: FormData,
  currentUserId: string,
) => {
  const registrationNumber = formData.get("registrationNumber") as string;
  const businessName = formData.get("name") as string;
  const businessAddress = formData.get("address") as string;
  const contactNumber = formData.get("institueContactNumber") as string; // Ensure it matches the model
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
      return { error: "Validation Error" };
    }

    // Create the institute
    const instituteData = await prisma.institute.create({
      data: {
        registrationNumber: registrationNumber,
        businessName: businessName,
        businessaddress: businessAddress,
        contactNumber: contactNumber,
        email: email,
      },
    });

    if (instituteData) {
      await prisma.user.update({
        where: { id: currentUserId },
        data: { role: "admin" },
      });
      await prisma.admin.create({
        data: {
          id: currentUserId,
          access_level: "superadmin",
          institute_id: instituteData.id,
        },
      });
      return { success: true };
    }

    return { error: "Institute creation failed." };
  } catch (error) {
    console.error("Business Registration Error:", error);
    return { error: "An error occurred during business registration." };
  }
};
