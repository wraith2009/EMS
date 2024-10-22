import { z } from "zod";
import { TeacherRole } from "@prisma/client";

export const TeacherSchema = z.object({
  firstName: z.string().min(1, "Please Enter Your first Name"),
  lastName: z.string().min(1, "please Enter your last name"),
  qualification: z.string().min(1, "please Enter your qualification"),
  experience: z.string().min(1, "please Enter your experience"),
  subjectSpecialization: z
    .string()
    .min(1, "please Enter your subject specialization"),
  employementStartDate: z
    .string()
    .min(1, "please Enter your employement start date"),
  role: z.enum([
    TeacherRole.AssistantProfessor,
    TeacherRole.Professor,
    TeacherRole.Lecturer,
  ]),
  departments: z.string().min(1, "please Enter your department"),
  instituteID: z.string().min(1, "please Enter your institute"),
  subjects_teaching: z.string().min(1, "please Enter your subjects teaching"),
  dateOfBirth: z.date(),
});

export const getTeacherByInstituteIDSchema = z.object({
  instituteID: z.string().min(1, "Please Enter Your Institute ID"),
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

// model Hod {
//   id             String        @id @default(cuid())
//   user           User          @relation(fields: [id], references: [id])
//   teacher         Teacher      @relation(fields: [teacher_id], references:[id])
//   teacher_id      String        @unique
//   department      Department   @relation("HodToDepartment", fields: [department_id], references: [id])
//   department_id   String       @unique
//   institute      Institute     @relation(fields: [institute_id], references: [id]) // Institute reference
//   institute_id   String
//   created_at     DateTime      @default(now())
//   updated_at     DateTime      @updatedAt
// }
