/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import {
  TeacherSchema,
  getTeacherByInstituteIDSchema,
  RegisterHodSchema,
} from "../lib/validators/teacher.validator";
import { TeacherRole } from "@prisma/client";

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
    const instituteID = formData.get("instituteID") as string;
    const subjects_teaching = formData.get("subjects_teaching") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;
    const department_id = formData.get("department_id") as string;

    const isValid = TeacherSchema.safeParse({
      firstName,
      lastName,
      qualification,
      experience,
      subjectSpecialization,
      employementStartDate,
      role,
      instituteID,
      subjects_teaching,
      dateOfBirth: parsedDateOfBirth,
      departments: department_id,
    });
    console.log("isvalid");
    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        firstName: firstName,
        lastName: lastName,
        institute_id: instituteID,
        dateOfBirth: parsedDateOfBirth,
      },
    });

    if (existingTeacher) {
      return { success: false, message: "Teacher already exists" };
    }

    const createData: any = {
      firstName,
      lastName,
      qualification,
      experience,
      subjectSpecialization,
      employementStartDate,
      role,
      institute_id: instituteID,
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
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};

export const TeacherByInstituteID = async ({
  InstituteId,
}: {
  InstituteId: string;
}) => {
  try {
    const isValid = getTeacherByInstituteIDSchema.safeParse(InstituteId);

    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const teachers = await prisma.teacher.findMany({
      where: {
        institute_id: InstituteId,
      },
      select: {
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
    console.error(error);
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
