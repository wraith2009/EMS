import prisma from "../db/db";
import { StudentSchema } from "../lib/validators/student.validator";

export const RegisterStudent = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const parsedData = StudentSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.errors };
  }

  const {
    firstName,
    lastName,
    address,
    dateOfBirth,
    status,
    CurrentYear,
    CurrentSemester,
    courseID,
    enrollmentNumber,
    rollNumber,
    instituteID,
    BatchId,
  } = parsedData.data;

  const existingStudent = await prisma.student.findFirst({
    where: {
      enrollmentNumber: enrollmentNumber,
      institute_id: instituteID,
    },
  });

  if (existingStudent) {
    return {
      status: 400,
      json: {
        success: false,
        message: "Student already exists",
      },
    };
  }

  try {
    await prisma.student.create({
      data: {
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
        batch_id: BatchId,
        course_id: courseID,
      },
    });

    return {
      status: 200,
      json: {
        success: true,
        message: "Student Registered Successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      json: {
        success: false,
        messgae: "Server Error",
        error: error,
      },
    };
  }
};
