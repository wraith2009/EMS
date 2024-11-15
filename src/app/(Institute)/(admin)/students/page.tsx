"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudentByInstitute } from "@/src/actions/student.action";
import { useUser } from "@/src/context/UserContext";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  enrollmentNumber: string;
  rollNumber?: string;
  course_id: string;
  CurrentSemester?: string;
  CurrentYear?: string;
  address?: string;
  dateOfBirth: Date;
  status: string;
  course: {
    id: string;
    name: string;
    courseCode: string;
  };
}

export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { adminData } = useUser();
  const instituteId = adminData?.institute_id || "";

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getStudentByInstitute({ instituteId });
        console.log("response of fetching students:", response);

        if (response.status === 200 && response.json?.data) {
          setStudents(
            response.json.data.map((student: any) => ({
              ...student,
              dateOfBirth: new Date(student.dateOfBirth),
            })),
          );
        } else {
          setError(response.message || "Failed to fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students");
      }

      setIsLoading(false);
    };

    if (instituteId) {
      fetchStudents();
    }
  }, [instituteId]);

  if (!students) {
    return <h1>Wait</h1>;
  }

  console.log("Students list:", students);

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
          View Students
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold p-4 sm:p-6 border-b">
            Students
          </h2>
          {isLoading ? (
            <p className="text-center p-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4">{error}</p>
          ) : students.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Number
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Semester
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.enrollmentNumber}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.rollNumber || "N/A"}
                    </td>
                    {/* <td className="px-4 py-4 whitespace-nowrap">{student.course_id}</td> */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.course.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.CurrentSemester || "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      {student.dateOfBirth.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-4">
              No students available for this institute.
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
