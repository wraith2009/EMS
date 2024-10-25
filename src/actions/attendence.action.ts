/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "../db/db";
import {
  AttendenceSchema,
  ReportSchema,
} from "../lib/validators/attendence.validator";
import { NextResponse } from "next/server";

export const MarkAttendence = async (req: Request) => {
  try {
    const { students } = await req.json();

    const parsedDataArray = Object.values(students).map((entry) =>
      AttendenceSchema.safeParse(entry),
    );

    const allValid = parsedDataArray.every((parsedData) => parsedData.success);
    if (!allValid) {
      const firstError = parsedDataArray.find(
        (parsedData) => !parsedData.success,
      );
      return NextResponse.json(
        {
          success: false,
          status: 400,
          error: firstError?.error.errors[0].message,
          message: "Validation Error",
        },
        { status: 400 },
      );
    }

    const attendanceEntries = parsedDataArray.map((parsedData) => ({
      user_id: parsedData.data.user_id,
      subject_id: parsedData.data.subject_id,
      date: new Date(),
      status: parsedData.data.status,
      remarks: parsedData.data.remarks,
    }));

    const result = await prisma.$transaction(async (prisma) => {
      const markedAttendance = await Promise.all(
        attendanceEntries.map((entry) =>
          prisma.attendance.create({
            data: entry,
          }),
        ),
      );
      return markedAttendance;
    });

    return NextResponse.json({
      success: true,
      message: "Attendance marked successfully",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 500,
        error: error.message || "Server Error",
      },
      { status: 500 },
    );
  }
};

export const GetAttendanceReport = async ({ user_id }: { user_id: string }) => {
  const parsedData = ReportSchema.safeParse(user_id);

  if (!parsedData.success) {
    return {
      success: false,
      status: 400,
      error: parsedData.error.errors[0].message,
      message: "Validation Error",
    };
  }

  const today = new Date();

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const dailyAttendance = await prisma.attendance.findMany({
      where: {
        user_id: user_id,
        date: today,
      },
    });

    const weeklyAttendance = await prisma.attendance.findMany({
      where: {
        user_id: user_id,
        date: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    // Fetch monthly attendance
    const monthlyAttendance = await prisma.attendance.findMany({
      where: {
        user_id: user_id,
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });

    const dailyReport = generateSummary(dailyAttendance);
    const weeklyReport = generateSummary(weeklyAttendance);
    const monthlyReport = generateSummary(monthlyAttendance);

    return {
      success: true,
      message: "Attendance report fetched successfully",
      data: {
        daily: dailyReport,
        weekly: weeklyReport,
        monthly: monthlyReport,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: error.message || "Server Error",
    };
  }
};

const generateSummary = (attendances: any[]) => {
  const totalClasses = attendances.length;
  const presentClasses = attendances.filter(
    (a) => a.status === "PRESENT",
  ).length;
  const absentClasses = attendances.filter((a) => a.status === "ABSENT").length;

  return {
    totalClasses,
    presentClasses,
    absentClasses,
  };
};
