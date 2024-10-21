import prisma from "../db/db";
import { BatchSchema } from "../lib/validators/batch.validator";

export const CreateBatch = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const start_year = formData.get("startYear") as string;
    const end_year = formData.get("endYear") as string;
    const institute_id = formData.get("InstituteId") as string;
    const course_id = formData.get("CourseId") as string;

    const isvalid = BatchSchema.safeParse({
      name,
      start_year: parseInt(start_year),
      end_year: parseInt(end_year),
      course_id,
      institute_id,
    });

    if (!isvalid.success) {
      return {
        status: 400,
        success: false,
        message: "validation error",
      };
    }

    const existingBatch = await prisma.batch.findFirst({
      where: {
        institute_id: institute_id,
        course_id: course_id,
        start_year: parseInt(start_year),
        end_year: parseInt(end_year),
      },
    });

    if (existingBatch) {
      return {
        status: 400,
        success: false,
        message: "Batch already exists",
      };
    }

    await prisma.batch.create({
      data: {
        name,
        start_year: parseInt(start_year),
        end_year: parseInt(end_year),
        course_id,
        institute_id,
      },
    });

    return {
      status: 200,
      json: {
        success: true,
        message: "Batch created successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      json: {
        success: false,
        message: "server error",
        error: error,
      },
    };
  }
};
