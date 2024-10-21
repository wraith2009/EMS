import { z } from "zod";

export const BatchSchema = z.object({
  name: z.string().min(3).max(255),
  start_year: z.number().min(1900).max(3000),
  end_year: z.number().min(1900).max(3000),
  course_id: z.string().cuid(),
  institute_id: z.string().cuid(),
});

export type BatchSchemaType = z.infer<typeof BatchSchema>;
