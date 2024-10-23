/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import { subjectSchema } from "../lib/validators/subject.validator";

export const RegisterSubject = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = subjectSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      status: 400,
      error: parsedData.error.errors[0].message,
      message: "Validation Error",
    };
  }

  const { name, course_id } = parsedData.data;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const existingSubject = await prisma.subject.findFirst({
        where: {
          name: name,
          course_id: course_id,
        },
      });

      if (existingSubject) {
        return {
          success: false,
          status: 400,
          message: "Subject already exists",
        };
      }

      const newSubject = await prisma.subject.create({
        data: {
          name: name,
          course_id: course_id,
        },
      });

      return newSubject;
    });

    return {
      success: true,
      message: "New Subject created successfully",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: error.message || "Server Error",
    };
  }
};
