"use server";

import prisma from "../db/db";
import { subjectSchema } from "../lib/validators/subject.validator";

export const RegisterSubject = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("data is:", data);
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
    // First verify that the course exists
    const courseExists = await prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!courseExists) {
      return {
        success: false,
        status: 404,
        message: "Course not found. Please ensure the course exists.",
      };
    }

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
          message: "Subject already exists for this course",
        };
      }

      const newSubject = await prisma.subject.create({
        data: {
          name: name,
          course_id: course_id,
        },
      });

      return {
        success: true,
        data: newSubject,
      };
    });

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      message: "New Subject created successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error creating subject:", error);
    if (error.code === "P2003") {
      return {
        success: false,
        status: 404,
        message: "Course not found. Please ensure the course exists.",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Failed to create subject. Please try again.",
      error: error.message || "Server Error",
    };
  }
};
