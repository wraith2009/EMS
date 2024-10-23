"use client";
import React from "react";
import { RegisterTeacher } from "../../../actions/teacher.action";
import { TeacherRole } from "@prisma/client";
import { getAllDepartments } from "@/src/actions/department.actions";
import { useState, useEffect } from "react";
const TeacherRegistration = ({ instituteId }: { instituteId: string }) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await getAllDepartments({ instituteId });
      if (response?.json.success) {
        if (response.json.data) {
          setDepartments(response.json.data);
        }
      }
    };

    fetchDepartments();
  }, [instituteId]);
 
  const handleTeacherSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set("instituteID", instituteId);
    

    const dateOfBirth = formData.get("dateOfBirth") as string;
    if (!dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "Date of Birth is required",
      }));
      return;
    }

    const employementStartDate = formData.get("employementStartDate") as string;
    if (!employementStartDate) {
      setErrors((prev) => ({
        ...prev,
        employementStartDate: "Employment Start Date is required",
      }));
      return;
    }

    const response = await RegisterTeacher(formData);

    if (response.success) {
      setResponseMessage({
        type: "success",
        message: response.message,
      });
      e.currentTarget.reset();
    } else {
      setResponseMessage({
        type: "error",
        message: response.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-primary-red mb-8">
          Register New Teacher
        </h1>

        {responseMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              responseMessage.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {responseMessage.message}
          </div>
        )}

        <form onSubmit={handleTeacherSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="text"
                name="Email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Email"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="password"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* Professional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Department
              </label>
              <select
                name="department_id"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qualification *
              </label>
              <input
                type="text"
                name="qualification"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., M.Ed., Ph.D."
              />
              {errors.qualification && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.qualification}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., 5 years"
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject Specialization *
              </label>
              <input
                type="text"
                name="subjectSpecialization"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., Mathematics"
              />
              {errors.subjectSpecialization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subjectSpecialization}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subjects Teaching *
              </label>
              <input
                type="text"
                name="subjects_teaching"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., Math, Physics"
              />
              {errors.subjects_teaching && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subjects_teaching}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Start Date *
              </label>
              <input
                type="date"
                name="employementStartDate"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              />
              {errors.employementStartDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.employementStartDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                name="role"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              >
                <option value="">Select Role</option>
                {[
                  TeacherRole.AssistantProfessor,
                  TeacherRole.Professor,
                  TeacherRole.Lecturer,
                ].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 transition-colors"
            >
              Register Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegistration;
