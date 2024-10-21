import prisma from "../db/db";
import {
  GetCourseByDepartmentSchema,
  CourseSchema,
} from "../lib/validators/course.validator";

export const RegisterNewCourse = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("CourseDescription") as string;
    const courseCode = formData.get("CourseCode") as string;
    const department_id = formData.get("departmentID") as string;

    const isValid = CourseSchema.safeParse({
      name,
      description,
      courseCode,
      department_id,
    });

    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const existingCourse = await prisma.course.findFirst({
      where: {
        courseCode: courseCode,
        department_id: department_id,
      },
    });

    if (existingCourse) {
      return { success: false, message: "This Course is already registered" };
    }

    await prisma.course.create({
      data: {
        name,
        description,
        courseCode,
        department_id,
      },
    });

    return { success: true, message: "Course registered Successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};

export const getCourseByDepartment = async ({
  departmentId,
}: {
  departmentId: string;
}) => {
  try {
    const isValid = GetCourseByDepartmentSchema.safeParse(departmentId);

    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const courses = await prisma.course.findMany({
      where: {
        department_id: departmentId,
      },
      select: {
        name: true,
        description: true,
        courseCode: true,
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

