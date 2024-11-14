"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TeacherByInstituteID } from "@/src/actions/teacher.action";
import { useUser } from "@/src/context/UserContext";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  qualification: string;
  role: string;
  subjectSpecialization: string;
  subjects_teaching: string;
  employmentStartDate: Date;
  experience: string;
}

export default function ViewEmployeesPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { adminData } = useUser();
  const instituteId = adminData?.institute_id || "";

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await TeacherByInstituteID({ instituteId });
        console.log("response of fetching teachers:", response);

        if (response.success) {
          if (response.data) {
            setTeachers(
              response.data.map((teacher: any) => ({
                ...teacher,
                employmentStartDate: new Date(teacher.employmentStartDate),
              })),
            );
          } else {
            setError("No teachers found");
          }
        } else {
          setError(response.message || "Failed to fetch teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Failed to fetch teachers");
      }

      setIsLoading(false);
    };

    if (instituteId) {
      fetchTeachers();
    }
  }, [instituteId]);

  if (!teachers) {
    return <h1>Wait</h1>;
  }

  console.log("Teaching staff:", teachers);

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
          View Employees
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold p-4 sm:p-6 border-b">
            Employees
          </h2>
          {isLoading ? (
            <p className="text-center p-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4">{error}</p>
          ) : teachers.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject Specialization
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects Teaching
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employment Start Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.firstName} {teacher.lastName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.qualification}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.role}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.subjectSpecialization}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.subjects_teaching}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {teacher.experience} years
                    </td>
                    <td className="px-4 py-4">
                      {teacher.employmentStartDate.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-4">
              No employees available for this institute.
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-start">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
