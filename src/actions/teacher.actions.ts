/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import { TeacherSchema } from "../lib/validators/teacher.validator";
import bcrypt from "bcryptjs";

export const RegisterNewTeacher = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const isValidated = TeacherSchema.safeParse(data);
  if (!isValidated.success) {
    return {
      status: 400,
      message: "Validation Error",
      error: isValidated.error.errors,
    };
  }

  const {
    email,
    firstName,
    lastName,
    qualification,
    experience,
    dateOfBirth,
    subjectSpecialization,
    employementStartDate,
    instituteId,
    role,
  } = isValidated.data;

  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        institute_id: instituteId,
        dateOfBirth: dateOfBirth,
      },
    });

    if (teacher) {
      return {
        status: 400,
        message: "Teacher already exists",
      };
    }

    const name = firstName + " " + lastName;
    const password = dateOfBirth.toISOString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: "teacher",
        password: hashedPassword,
      },
    });

    if (user) {
      await prisma.teacher.create({
        data: {
          firstName,
          lastName,
          qualification,
          experience,
          dateOfBirth,
          subjectSpecialization,
          employementStartDate,
          institute_id: instituteId,
          role,
        },
      });
    }

    return {
      status: 200,
      message: "Teacher Registered Successfully",
    };
  } catch (error: any) {
    console.error("Error registering teacher:", error);
    return {
      status: 500,
      message: error.message || "Server Error",
    };
  }
};
