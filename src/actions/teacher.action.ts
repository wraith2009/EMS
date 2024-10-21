import prisma from "../db/db";
import {
  TeacherSchema,
  getTeacherByInstituteIDSchema,
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
    const dateOfBirth = formData.get("DateOfBirth");

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
      dateOfBirth,
    });

    if (!isValid.success) {
      return { success: false, message: "Validation Error" };
    }

    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        firstName: firstName,
        lastName: lastName,
        institute_id: instituteID,
        dateOfBirth: dateOfBirth,
      },
    });

    if (existingTeacher) {
      return { success: false, message: "Teacher already exists" };
    }

    await prisma.teacher.create({
      data: {
        firstName,
        lastName,
        qualification,
        experience,
        subjectSpecialization,
        employementStartDate,
        role,
        institute_id,
        subjects_teaching,
        dateOfBirth,
      },
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
