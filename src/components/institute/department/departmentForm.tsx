"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DepartmentSchema,
  DapartmentSchemaType,
} from "../../../lib/validators/department.validator";
import { CreateDepartment } from "../../../actions/department.actions";
import { useRouter } from "next/navigation"; // Assuming you're using Next.js or similar

const DepartmentRegistration: React.FC<{ instituteId: string }> = ({
  instituteId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DapartmentSchemaType>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      institute_id: instituteId,
    },
  });

  const [departmentCreated, setDepartmentCreated] = useState(false);
  const [createdDepartmentId, setCreatedDepartmentId] = useState<string | null>(
    null,
  );
  const router = useRouter();

  const onSubmit = async (data: DapartmentSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("DepartmentCode", data.code);
    formData.append("description", data.description || "");
    formData.append("institute_id", data.institute_id);
    formData.append("parent_id", data.parent_id || "");

    try {
      const response = await CreateDepartment(formData);
      if (response?.success) {
        console.log("Department created successfully:", response);
        setDepartmentCreated(true);
        setCreatedDepartmentId(response?.department?.id ?? null); // Assuming you return the ID in response
      } else {
        console.error("Error:", response?.message);
      }
      reset();
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleAddCourse = () => {
    if (createdDepartmentId) {
      router.replace(`/courses/register-courses/${instituteId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-primary-red">
          Add New Department
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter department name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Code
            </label>
            <input
              type="text"
              {...register("code")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter department code"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Department (optional)
            </label>
            <input
              type="text"
              {...register("parent_id")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter parent department ID"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-red text-white py-2 px-4 rounded-lg font-semibold"
          >
            Create Department
          </button>
        </form>

        
          <div className="mt-6">
            <button
              onClick={handleAddCourse}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Add Courses to Department
            </button>
          </div>
      </div>
    </div>
  );
};

export default DepartmentRegistration;
