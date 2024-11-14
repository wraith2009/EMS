"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllDepartments } from "@/src/actions/department.action";
import { getCourseByDepartment } from "@/src/actions/course.action";
import { useUser } from "@/src/context/UserContext";

interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

interface Course {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

export default function ViewCoursePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { adminData } = useUser();

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      setError(null);
      if (adminData && adminData.institute_id) {
        try {
          const response = await getAllDepartments({
            instituteId: adminData.institute_id,
          });
          if (response.status === 200 && response.json.success) {
            if (response.json.data) {
              setDepartments(response.json.data);
            } else {
              setError("No departments data found");
            }
          } else {
            setError(response.json?.message || "Failed to fetch departments");
          }
        } catch (error) {
          console.error("Error fetching departments:", error);
          setError("Failed to fetch departments");
        }
      }
      setIsLoading(false);
    };

    fetchDepartments();
  }, [adminData]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!selectedDepartment) {
        setCourses([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await getCourseByDepartment({
          department_id: selectedDepartment,
        });
        if (response.status === 200 && response.json.success) {
          setCourses(response.json.data as Course[]);
        } else {
          setError(response.json?.message || "Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses");
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
          View Courses
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Department:
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
          >
            <option value="">-- Select a Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold p-4 sm:p-6 border-b">Courses</h2>
          {isLoading ? (
            <p className="text-center p-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4">{error}</p>
          ) : courses.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {course.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {course.code}
                    </td>
                    <td className="px-4 py-4">{course.description || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-4">
              No courses available for this department.
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
