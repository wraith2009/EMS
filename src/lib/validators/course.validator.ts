import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string().min(1, "Please Provide Course Name"),
  code: z.string().min(1, "Please Provide Course Code"),
  description: z.string().optional(),
  department_id: z.string().min(1, "please Provide departmentID").cuid(),
});

export const GetCourseByDepartmentSchema = z.object({
  department_id: z.string().min(1, "Department id is required").cuid(),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
export type GetCourseByDepartmentSchemaType = z.infer<
  typeof GetCourseByDepartmentSchema
>;
