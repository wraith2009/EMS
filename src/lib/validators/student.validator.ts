import { z } from "zod";
import { StudentStatus } from "@prisma/client";

export const StudentSchema = z.object({
  firstName: z.string().min(1, "Please Enter Your first Name"),
  lastName: z.string().min(1, "please Enter your last name"),
  address: z.string().optional(),
  dateOfBirth: z.string().min(1, "please Enter your date of birth"),
  status: z.enum([
    StudentStatus.Active,
    StudentStatus.Graduated,
    StudentStatus.Dropped_Out,
  ]),
  CurrentYear: z.string().optional(),
  CurrentSemester: z.string().optional(),
  department: z.string().min(1, "please Enter your department"),
  course: z.string().min(1, "please Enter your course"),
  enrollmentNumber: z.string().min(1, "please Enter your enrollment number"),
  rollNumber: z.string().optional(),
  instituteID: z.string().min(1, "please Enter your institute"),
});

export const getStudentByIdSchema = z.object({
  id: z.string().min(1, "Please Enter Your ID"),
});

export const getStudentByInstituteSchema = z.object({
  instituteID: z.string().min(1, "Please Enter Your Institute ID"),
});

export const getStudentByDepartmentSchema = z.object({
  departmentID: z.string().min(1, "Please Enter Your Department ID"),
});

export const getStudentByCourseSchema = z.object({
  courseID: z.string().min(1, "Please Enter Your Course ID"),
});

export const getStudentByBatchSchema = z.object({
  batchID: z.string().min(1, "Please Enter Your Batch ID"),
});

export type getStudentByBatchSchemaType = z.infer<
  typeof getStudentByBatchSchema
>;
export type getStudentByIdSchemaType = z.infer<typeof getStudentByIdSchema>;
export type StudentSchemaType = z.infer<typeof StudentSchema>;
export type getStudentByDepartmentSchemaType = z.infer<
  typeof getStudentByDepartmentSchema
>;
export type getStudentByCourseSchemaType = z.infer<
  typeof getStudentByCourseSchema
>;
export type getStudentByInstituteSchemaType = z.infer<
  typeof getStudentByInstituteSchema
>;
