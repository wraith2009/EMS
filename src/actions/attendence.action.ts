/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "../db/db";
import { AttendenceSchema } from "../lib/validators/attendence.validator";

export const MarkAttendence = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = AttendenceSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      status: 400,
      error: parsedData.error.errors[0].message,
      message: "Validation Error",
    };
  }

  const { user_id, subject_id, status, remarks } = parsedData.data;

  try {
    const result = prisma.$transaction(async (prisma) => {
      const MarkedAttendence = prisma.attendance.create({
        data: {
          user_id,
          subject_id,
          date: new Date(),
          status,
          remarks,
        },
      });

      return MarkedAttendence;
    });

    return {
      success: true,
      message: "Attendence Marked Successfully",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: error.message || "Server Error",
    };
  }
};
