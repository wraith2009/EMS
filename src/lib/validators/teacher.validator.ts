import { z } from "zod";
import { TeacherRole } from "@prisma/client";

export const TeacherSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  dateOfBirth: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z
      .date()
      .refine(
        (date) => date <= new Date(),
        "Date of birth must be in the past",
      ),
  ),
  subjectSpecialization: z
    .string()
    .min(1, "Subject specialization is required"),
  employementStartDate: z.string(),
  instituteId: z.string().cuid("Institute ID must be a valid cuid"),
  role: z.enum([
    TeacherRole.Lecturer,
    TeacherRole.AssistantProfessor,
    TeacherRole.Professor,
    TeacherRole.HOD,
  ]),
});

export const getTeacherByInstituteIDSchema = z.object({
  instituteId: z.string().min(1, "Please Enter Your Institute ID"),
});

export const RegisterHodSchema = z.object({
  teacherID: z.string().min(1, "Please Enter Your Teacher ID").cuid(),
  departmentID: z.string().min(1, "Please Enter Your Department ID").cuid(),
  instituteID: z.string().min(1, "Please Enter Your Institute ID").cuid(),
});

export type TeacherSchemaType = z.infer<typeof TeacherSchema>;
export type getTeacherByInstituteIDSchemaType = z.infer<
  typeof getTeacherByInstituteIDSchema
>;
export type RegisterHodSchemaType = z.infer<typeof RegisterHodSchema>;
