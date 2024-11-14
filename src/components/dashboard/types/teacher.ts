import { TeacherRole } from "@prisma/client";
export interface TeacherFormData {
  firstName: string;
  lastName: string;
  Email: string;
  password: string;
  dateOfBirth: string; // Expecting date string format
  department_id: string;
  qualification: string;
  experience: string;
  subjectSpecialization: string;
  subjects_teaching: string; // JSON string or serialized array
  employementStartDate: string; // Expecting date string format
  role: TeacherRole; // Ensure TeacherRole is defined in your types
}
