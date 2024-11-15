/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "../db/db";
import { StudentSchema } from "../lib/validators/student.validator";
import bcryptjs from "bcryptjs";

export const RegisterStudent = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("Received form data:", data); // Log form data

  // Validate input data
  const parsedData = StudentSchema.safeParse(data);
  if (!parsedData.success) {
    console.log("Validation errors:", parsedData.error.errors); // Log validation errors
    return { error: parsedData.error.errors };
  }
  console.log("Parsed data:", parsedData.data); // Log successfully parsed data

  const {
    firstName,
    lastName,
    email,
    password,
    address,
    dateOfBirth,
    status,
    CurrentYear,
    CurrentSemester,
    courseId,
    classID, // Add classId to be extracted from parsedData
    enrollmentNumber,
    rollNumber,
    instituteID,
  } = parsedData.data;

  // Check if user already exists
  let existingUser = await prisma.user.findFirst({
    where: { email },
  });
  console.log("Existing user found:", existingUser); // Log existing user if found

  // If user doesn't exist, create a new one
  if (!existingUser) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed password generated:", hashedPassword);

    const name = `${firstName} ${lastName}`;
    console.log("Generated full name:", name);

    existingUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "student",
      },
    });
    console.log("New user created:", existingUser);
  }

  if (existingUser) {
    const existingStudent = await prisma.student.findFirst({
      where: {
        enrollmentNumber,
        institute_id: instituteID,
      },
    });
    console.log("Existing student found:", existingStudent); // Log if student exists

    if (existingStudent) {
      console.log("Student already exists, returning error."); // Log duplicate student error
      return {
        status: 400,
        json: {
          success: false,
          message: "Student already exists",
        },
      };
    }

    try {
      const newStudent = await prisma.student.create({
        data: {
          id: existingUser.id,
          firstName,
          lastName,
          address: address || null,
          dateOfBirth: new Date(dateOfBirth),
          status,
          CurrentYear: CurrentYear || null,
          CurrentSemester: CurrentSemester || null,
          enrollmentNumber,
          rollNumber: rollNumber || null,
          institute_id: instituteID,
          course_id: courseId,
          ClassRoom: {
            connect: classID ? { id: classID } : [], // Connect the class if classId is provided
          },
        },
      });
      console.log("New student created:", newStudent);

      return {
        status: 200,
        json: {
          success: true,
          message: "Student Registered Successfully",
        },
      };
    } catch (error) {
      console.error("Error while creating student:", error); // Log error if creation fails
      return {
        status: 500,
        json: {
          success: false,
          message: "Server Error",
          error: error instanceof Error ? error.message : String(error),
        },
      };
    }
  } else {
    console.log("User not found after creation attempt."); // Log user creation failure
    return { success: false, message: "User not defined" };
  }
};

export const getStudentsByClass = async ({ classId }: { classId: string }) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const ClassStudent = await prisma.classRoom.findMany({
        where: {
          id: classId,
        },
        select: {
          Student: true,
        },
      });

      return ClassStudent;
    });

    return {
      status: 201,
      message: "Class students Fetched successfully",
      json: {
        data: result,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Server error",
    };
  }
};
export const getStudentByInstitute = async ({
  instituteId,
}: {
  instituteId: string;
}) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const students = await prisma.student.findMany({
        where: {
          institute_id: instituteId,
        },
        include: {
          course: {
            // This includes the full course information in each student
            select: {
              id: true,
              name: true,
              courseCode: true,
            },
          },
        },
      });

      return students;
    });

    return {
      status: 200,
      message: "Students fetched successfully",
      json: {
        data: result,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Server error",
    };
  }
};
