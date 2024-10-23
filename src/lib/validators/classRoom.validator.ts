import { z } from "zod";

export const ClassRoomSchema = z.object({
  name: z.string().min(1, "Please enter a specific name for your classroom"),
  year: z.string().optional(),
  departmentId: z.string().min(1, "Please enter a department ID").cuid(),
  instituteId: z.string().min(1, "Please enter an institute ID").cuid(),
  courseId: z.string().min(1, "Please enter a course ID").cuid(),
  teacherId: z.string().min(1, "Please enter a teacher ID").cuid(),
});

export type ClassRoomSchemaType = z.infer<typeof ClassRoomSchema>;
