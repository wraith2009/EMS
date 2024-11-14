import { z } from "zod";
import { StudentStatus } from "@prisma/client";

export const StudentSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional(),

  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  address: z.string().optional(),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  status: z.enum([
    StudentStatus.Active,
    StudentStatus.Graduated,
    StudentStatus.Dropped_Out,
  ]),
  CurrentYear: z.string().optional(),
  CurrentSemester: z.string().optional(),
  departmentId: z.string().min(1, "Please enter your department"),
  courseId: z.string().min(1, "Please enter your course"),
  enrollmentNumber: z.string().min(1, "Please enter your enrollment number"),
  rollNumber: z.string().optional(),
  instituteID: z.string().min(1, "Please enter your institute"),
  classID: z.string().min(1, "Please enter your class"),
});

export const getStudentByIdSchema = z.object({
  id: z.string().min(1, "Please Enter Your ID"),
});

export const getStudentByInstituteSchema = z.object({
  instituteID: z.string().min(1, "Please Enter Your Institute ID"),
});

export const getStudentByDepartmentSchema = z.object({
  departmentID: z.string().min(1, "Please Enter Your Department ID"),
  InstituteID: z.string().cuid().min(1, "please provide Institute Id"),
});

export const getStudentByCourseSchema = z.object({
  courseID: z.string().min(1, "Please Enter Your Course ID"),
  InstituteID: z.string().cuid().min(1, "please provide Institute Id"),
});

export const getStudentByBatchSchema = z.object({
  batchID: z.string().min(1, "Please Enter Your Batch ID").cuid(),
  InstituteID: z.string().cuid().min(1, "please provide Institute Id"),
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
