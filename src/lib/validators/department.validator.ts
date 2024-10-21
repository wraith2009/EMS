import { z } from "zod";

export const DepartmentSchema = z.object({
  name: z.string().min(1, "Please Provide department Name"),
  code: z.string().min(1, "Please Provide department Code"),
  description: z.string().optional(),
  institute_id: z.string().min(1, "Please Provide Institute ID").cuid(),
  parent_id: z.string().optional(),
});

export const DepartmentByIdSchema = z.object({
  id: z.string().min(1, "Job id is required").cuid(),
});

export type DapartmentSchemaType = z.infer<typeof DepartmentSchema>;
export type DepartmentByIdSchemaType = z.infer<typeof DepartmentByIdSchema>;
