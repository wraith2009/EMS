import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, "Please provide subject name"),
  course_id: z.string().min(1, "Please provide course id"),
});
export const subjectByCourseSchema = z.object({
  course_id: z.string().min(1, "Please Provide course id"),
});
export type subjectSchemaType = z.infer<typeof subjectSchema>;
export type subjectByCourseSchemaType = z.infer<typeof subjectByCourseSchema>;
