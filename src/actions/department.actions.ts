import {
  DepartmentSchema,
  DepartmentByIdSchema,
} from "../lib/validators/department.validator";
import prisma from "../db/db";

export const CreateDepartment = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const code = formData.get("DepartmentCode") as string;
    const description = formData.get("description") as string;
    const institute_id = formData.get("institute_id") as string;
    const parent_id = formData.get("parent_id") as string;

    const isValidated = DepartmentSchema.safeParse({
      name,
      code,
      description,
      institute_id,
      parent_id,
    });

    if (!isValidated.success) {
      return { success: false, message: "Validation Error" };
    }

    const existingDepartment = await prisma.department.findFirst({
      where: {
        code: code,
        institute_id: institute_id,
      },
    });

    if (existingDepartment) {
      return { success: false, message: "Department already exists" };
    }

    await prisma.department.create({
      data: {
        name,
        code,
        description,
        institute_id,
        parent_id,
      },
    });

    return { success: true, message: "Department Added Successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};

export const getAllDepartments = async ({
  instituteId,
}: {
  instituteId: string;
}) => {
  const isValid = DepartmentByIdSchema.safeParse(instituteId);

  if (!isValid.success) {
    return {
      status: 400,
      json: { success: false, message: "Validation Error" },
    };
  }

  try {
    const existingInstitute = await prisma.institute.findUnique({
      where: {
        id: instituteId,
      },
    });

    if (!existingInstitute) {
      return {
        status: 404,
        json: {
          success: false,
          message: "Institute not found",
        },
      };
    }

    const departments = await prisma.department.findMany({
      where: {
        institute_id: instituteId,
      },
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
      },
    });

    if (!departments.length) {
      return {
        status: 404,
        json: {
          success: false,
          message: "No departments found for this university",
        },
      };
    }

    return {
      status: 200,
      json: { success: true, data: departments },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      json: { success: false, message: "Server error" },
    };
  }
};