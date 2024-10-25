import { z } from "zod";
import { AttendanceStatus } from "@prisma/client";

export const AttendenceSchema = z.object({
  user_id: z.string().min(1, "Please provide user id").cuid(),
  subject_id: z.string().min(1, "Please provide subject id").cuid(),
  date: z.date().optional(),
  status: z.enum(
    [
      AttendanceStatus.absent,
      AttendanceStatus.present,
      AttendanceStatus.late,
      AttendanceStatus.excused,
    ],
    {
      message: "Invalid Status",
    },
  ),
  remarks: z.string().optional(),
});

export const ReportSchema = z.object({
  user_id: z.string().min(1, "Please provide user id").cuid(),
});

export type AttendenceSchemaType = z.infer<typeof AttendenceSchema>;
export type ReportSchemaType = z.infer<typeof ReportSchema>;
