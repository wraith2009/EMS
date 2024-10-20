import { z } from "zod";

// model Teacher {
//   id             String        @id @default(cuid())
//   user           User          @relation(fields: [id], references: [id])

//   departments    Department[]  @relation("TeacherDepartments")

//   institute      Institute     @relation(fields: [institute_id], references: [id]) // Institute reference
//   institute_id   String
//   timetables     Timetable[]
//   subjects_teaching Json

//   created_at     DateTime      @default(now())
//   updated_at     DateTime      @updatedAt
// }

export const TeacherSchema = z.object({});
