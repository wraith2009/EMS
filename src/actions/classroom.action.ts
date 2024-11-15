/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "../db/db";
import {
  ClassRoomSchema,
  getClassByTeacherSchema,
} from "../lib/validators/classroom.validator";
import { getClassByCourseSchema } from "../lib/validators/classroom.validator";
export const RegisterClassRoom = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());
    const parseResult = ClassRoomSchema.safeParse(data);

    if (!parseResult.success) {
      return {
        status: 400,
        message: "Validation Error",
        error: parseResult.error.errors,
      };
    }

    const { name, year, departmentId, instituteId, courseId, teacherId } =
      parseResult.data;

    const result = await prisma.$transaction(async (prisma) => {
      const existingClass = await prisma.classRoom.findFirst({
        where: {
          teacher_id: teacherId,
          course_id: courseId,
          department_id: departmentId,
          institute_id: instituteId,
        },
      });

      if (existingClass) {
        throw new Error("ClassRoom with teacher already exists");
      }

      const newClassRoom = await prisma.classRoom.create({
        data: {
          name,
          year,
          department_id: departmentId,
          institute_id: instituteId,
          course_id: courseId,
          teacher_id: teacherId,
        },
      });

      return newClassRoom;
    });

    return {
      status: 201,
      message: "ClassRoom Created",
      data: result,
    };
  } catch (error: any) {
    return {
      status:
        error.message === "ClassRoom with teacher already exists" ? 400 : 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getClassByCourse = async ({ courseId }: { courseId: string }) => {
  try {
    const parseResult = getClassByCourseSchema.safeParse({ courseId });
    if (!parseResult.success) {
      return { success: false, message: "Validation Error" };
    }
    const classes = await prisma.classRoom.findMany({
      where: {
        course_id: courseId,
      },
    });
    return { success: true, data: classes };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, message: "Server error" };
  }
};
export const getClassByTeacher = async ({
  teacherId,
}: {
  teacherId: string;
}) => {
  try {
    const parseResult = getClassByTeacherSchema.safeParse({ teacherId });
    console.log("teacher id here:", teacherId);
    console.log("get class:", parseResult.error);
    if (!parseResult.success) {
      return { success: false, message: "Validation Error" };
    }
    const classes = await prisma.classRoom.findMany({
      where: {
        teacher_id: teacherId,
      },
    });
    if (!classes) {
      return { success: false, message: "No classes found" };
    }
    return {
      success: true,
      data: classes,
      message: "Classes found by teacher id",
    };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, message: "Server error" };
  }
};
