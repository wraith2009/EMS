"use client";

import { useSession } from "next-auth/react";
import { getTeacherByUserId } from "@/src/actions/teacher.action";
import { getClassByTeacher } from "@/src/actions/classRoom.action";
import { getStudentsByClass } from "@/src/actions/student.action";
import { useEffect, useState } from "react";

interface ClassRoom {
  id: string;
  name: string;
  created_at: Date;
  institute_id: string;
  year: string | null;
  department_id: string;
  course_id: string;
  teacher_id: string;
}

interface Student {
  id: string;
  name: string;
  enrollmentNumber: string;
}

type AttendanceStatus = "present" | "absent" | "review" | null;

interface AttendanceRecord {
  [studentId: string]: AttendanceStatus;
}

const RegisterAttendance = () => {
  const { data: session } = useSession();
  const [teacherId, setTeacherId] = useState<string>("");
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord>({});
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await getTeacherByUserId({
          userId: session.user.id,
        });

        if (response.status === 201 && response.data) {
          setTeacherId(response.data.id);
        } else {
          setError(response.message || "No teacher data found");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        setError("Failed to fetch teacher data");
      }
    };

    fetchTeacherData();
  }, [session?.user?.id]);

  // Fetch classes only when teacherId is available
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return;

      setLoading(true);
      try {
        const response = await getClassByTeacher({ teacherId });

        if (response.success && response.data) {
          setClasses(response.data);
        } else {
          setError("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [teacherId]);

  // Fetch students when a class is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) return;

      setStudentsLoading(true);
      try {
        const response = await getStudentsByClass({ classId: selectedClassId });

        if (response.status === 201 && response.json && response.json.data) {
          setStudents(
            response.json.data[0].students.map((student: any) => ({
              id: student.id,
              name: `${student.firstName} ${student.lastName}`,
              enrollmentNumber: student.enrollmentNumber,
            })),
          );
        } else {
          setError("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students");
      } finally {
        setStudentsLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(event.target.value);
    setAttendance({}); // Reset attendance when class changes
  };

  const handleAttendanceChange = (
    studentId: string,
    status: AttendanceStatus,
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = async () => {
    // TODO: Implement the API call to save attendance
    console.log("Attendance data:", attendance);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-[#f3f7f9] p-4">
      {teacherId ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Class</h2>
            <select
              value={selectedClassId}
              onChange={handleClassChange}
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a class</option>
              {classes.map((classRoom) => (
                <option key={classRoom.id} value={classRoom.id}>
                  {classRoom.name} ({classRoom.year || "N/A"})
                </option>
              ))}
            </select>
          </div>

          {selectedClassId && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Mark Attendance</h2>
              {studentsLoading ? (
                <div>Loading students...</div>
              ) : students.length > 0 ? (
                <>
                  <div className="grid gap-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="p-4 bg-white rounded-lg shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-gray-600">
                              Enrollment Number: {student.enrollmentNumber}
                            </p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                checked={attendance[student.id] === "present"}
                                onChange={() =>
                                  handleAttendanceChange(student.id, "present")
                                }
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <span className="text-sm text-green-600">
                                Present
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                checked={attendance[student.id] === "absent"}
                                onChange={() =>
                                  handleAttendanceChange(student.id, "absent")
                                }
                                className="h-4 w-4 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm text-red-600">
                                Absent
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                checked={attendance[student.id] === "review"}
                                onChange={() =>
                                  handleAttendanceChange(student.id, "review")
                                }
                                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                              />
                              <span className="text-sm text-yellow-600">
                                Review
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSubmitAttendance}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Submit Attendance
                    </button>
                  </div>
                </>
              ) : (
                <p>No students found in this class</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-yellow-600">No teacher data found</div>
      )}
    </div>
  );
};

export default RegisterAttendance;
