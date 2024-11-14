"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import {
  TeacherSchema,
  getTeacherByInstituteIDSchema,
  RegisterHodSchema,
} from "../lib/validators/teacher.validator";
import { TeacherRole } from "@prisma/client";
import bcryptjs from "bcryptjs";

export const RegisterTeacher = async (formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const qualification = formData.get("qualification") as string;
    const experience = formData.get("experience") as string;
    const subjectSpecialization = formData.get(
      "subjectSpecialization",
    ) as string;
    const employementStartDate = formData.get("employementStartDate") as string;
    const role = formData.get("role") as TeacherRole;
    const instituteId = formData.get("instituteID") as string; // Changed variable to match the schema
    const subjects_teaching = formData.get("subjects_teaching") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;
    const department_id = formData.get("department_id") as string;
    const email = formData.get("Email") as string;
    const password = formData.get("password") as string;
    console.log("institute id in backend", instituteId);

    // Validation using the correct field name
    const isValid = TeacherSchema.safeParse({
      firstName,
      lastName,
      qualification,
      experience,
      subjectSpecialization,
      employementStartDate,
      role,
      instituteId, // Updated field to match the schema
      subjects_teaching,
      dateOfBirth: parsedDateOfBirth,
      departments: department_id,
      email,
      password,
    });

    console.log("isValid error:", isValid.error);
    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    let existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const name = firstName + " " + lastName;
      existingUser = await prisma.user.create({
        data: {
          name: name,
          email,
          password: hashedPassword,
          role: "teacher",
        },
      });
    }

    if (existingUser) {
      const existingTeacher = await prisma.teacher.findFirst({
        where: {
          firstName: firstName,
          lastName: lastName,
          institute_id: instituteId,
          dateOfBirth: parsedDateOfBirth,
        },
      });

      if (existingTeacher) {
        return { success: false, message: "Teacher already exists" };
      }

      const createData: any = {
        id: existingUser.id,
        firstName,
        lastName,
        qualification,
        experience,
        subjectSpecialization,
        employementStartDate,
        role,
        institute_id: instituteId,
        subjects_teaching,
        departments: {
          connect: { id: department_id }, // Connect to the existing department by ID
        },
      };

      if (parsedDateOfBirth) {
        createData.dateOfBirth = parsedDateOfBirth;
      }

      await prisma.teacher.create({
        data: createData,
      });

      return { success: true, message: "Teacher registered successfully" };
    }

    return { success: false, message: "User not defined" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};

export const TeacherByInstituteID = async ({
  instituteId, // Changed to camelCase to match schema
}: {
  instituteId: string;
}) => {
  try {
    console.log("Fetching teachers for institute", instituteId);

    // Pass 'instituteId' correctly for validation
    const isValid = getTeacherByInstituteIDSchema.safeParse({ instituteId });
    console.log("Validation result:", isValid);

    if (!isValid.success) {
      console.log("Validation Error:", isValid.error);
      return { success: false, message: "Validation Error" };
    }

    const teachers = await prisma.teacher.findMany({
      where: {
        institute_id: instituteId, // Matching Prisma model field
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        qualification: true,
        experience: true,
        subjectSpecialization: true,
        employementStartDate: true,
        role: true,
        subjects_teaching: true,
      },
    });

    return { success: true, data: teachers };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, message: "Server error" };
  }
};

export const RegisterHod = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsedData = RegisterHodSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        status: 400,
        message: "Validation Error",
        error: parsedData.error.errors,
      };
    }

    const { instituteID, teacherID, departmentID } = parsedData.data;

    const result = await prisma.$transaction(async (prisma) => {
      const existingTeacher = await prisma.teacher.findUnique({
        where: { id: teacherID },
      });

      if (!existingTeacher) {
        throw new Error("Teacher not found");
      }

      const existingHod = await prisma.hod.findFirst({
        where: { teacher_id: teacherID },
      });

      if (existingHod) {
        throw new Error("Teacher is already an HoD");
      }

      const existingDepartment = await prisma.department.findUnique({
        where: { id: departmentID },
      });

      if (!existingDepartment) {
        throw new Error("Department not found");
      }

      const existingInstitute = await prisma.institute.findUnique({
        where: { id: instituteID },
      });

      if (!existingInstitute) {
        throw new Error("Institute not found");
      }

      const newHod = await prisma.hod.create({
        data: {
          teacher_id: teacherID,
          department_id: departmentID,
          institute_id: instituteID,
        },
      });

      return newHod;
    });

    return {
      status: 201,
      message: "HoD successfully registered",
      data: result,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getHodByInstituteId = async ({
  instituteID,
}: {
  instituteID: string;
}) => {
  try {
    const hods = await prisma.hod.findMany({
      where: {
        institute_id: instituteID,
      },
      select: {
        id: true,
        teacher_id: true,
        department_id: true,
      },
    });

    return {
      success: true,
      json: {
        data: hods,
        message: "Hods successfully fetched",
      },
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
};

export const getTeacherByUserId = async ({ userId }: { userId: string }) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        teacher: true,
        role: true,
      },
    });

    if (!existingUser) {
      return {
        status: 400,
        message: "User doesn't exist",
      };
    }

    if (existingUser.role === "teacher") {
      return {
        status: 201,
        message: "Teacher data fetched successfully",
        data: existingUser.teacher, // Removed the nested json structure
      };
    }

    return {
      status: 400,
      message: "User is not registered as a teacher",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Server Error",
    };
  }
};
