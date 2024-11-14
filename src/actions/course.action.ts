"use server";
import prisma from "../db/db";
import {
  CourseSchema,
  GetCourseByDepartmentSchema,
} from "../lib/validators/course.validator";

export const RegisterNewCourse = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const department_id = formData.get("department_id") as string;

    const isValid = CourseSchema.safeParse({
      name,
      description,
      code,
      department_id,
    });

    if (!isValid.success) {
      return {
        success: false,
        message: "Validation Error",
        errors: isValid.error.issues,
      };
    }

    // Debugging: log the department ID and code
    console.log(
      "Checking for existing course with code:",
      code,
      "and department_id:",
      department_id,
    );

    const existingCourse = await prisma.course.findFirst({
      where: {
        courseCode: code,
        department_id: department_id,
      },
    });

    if (existingCourse) {
      return { success: false, message: "This Course is already registered" };
    }

    // Create the new course
    await prisma.course.create({
      data: {
        name,
        description,
        courseCode: code,
        department_id,
      },
    });

    return { success: true, message: "Course registered successfully" };
  } catch (error) {
    console.error("Error occurred during course registration:", error);
    return { success: false, message: "Server Error", error };
  }
};

export const getCourseByDepartment = async ({
  department_id,
}: {
  department_id: string;
}) => {
  try {
    console.log("department id in backend", department_id);
    const isValid = GetCourseByDepartmentSchema.safeParse({ department_id });
    console.log("isValid", isValid.error);
    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const courses = await prisma.course.findMany({
      where: {
        department_id: department_id,
      },
      select: {
        name: true,
        description: true,
        courseCode: true,
        id: true,
      },
    });

    return {
      status: 200,
      json: {
        success: true,
        data: courses,
      },
    };
  } catch (error) {
    return {
      status: 500,
      json: {
        success: false,
        message: "Server Error",
        data: error,
      },
    };
  }
};
