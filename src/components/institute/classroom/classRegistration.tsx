"use client";
import React, { useEffect, useState } from "react";
import { getAllDepartments } from "@/src/actions/department.actions";
import { getCourseByDepartment } from "@/src/actions/course.action";
import { RegisterClassRoom } from "@/src/actions/classRoom.action";
import { TeacherByInstituteID } from "@/src/actions/teacher.action";
import { useRouter } from "next/navigation";
// Define types
interface Department {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
}

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  qualification: string;
  experience: string;
  subjectSpecialization: string;
  employementStartDate: Date;
  role: string;
  subjects_teaching: string[];
}

interface FormState {
  name: string;
  year: string;
  departmentId: string;
  courseId: string;
  teacherId: string;
  error?: string;
  success?: string;
}

const ClassRegistration: React.FC<{ instituteId: string }> = ({
  instituteId,
}) => {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", message: "" });

  const [formState, setFormState] = useState<FormState>({
    name: "",
    year: new Date().getFullYear().toString(),
    departmentId: "",
    courseId: "",
    teacherId: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Fetch teachers when component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await TeacherByInstituteID({
          instituteId: instituteId,
        });
        console.log("response of fetching teachers:", response);
        if (response.success) {
          if (response.data) {
            setTeachers(
              response.data.map((teacher: any) => ({
                ...teacher,
                employementStartDate: new Date(teacher.employementStartDate),
              })),
            );
          } else {
            showToastMessage("error", "No teachers found");
          }
        } else {
          showToastMessage(
            "error",
            response.message || "Failed to fetch teachers",
          );
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        showToastMessage("error", "Failed to fetch teachers");
      }
    };

    fetchTeachers();
  }, [instituteId]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getAllDepartments({ instituteId });
        if (response.status === 200 && response.json.success) {
          setDepartments(response.json.data || []);
        } else {
          showToastMessage(
            "error",
            response.json.message || "Failed to fetch departments",
          );
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        showToastMessage("error", "Failed to fetch departments");
      }
    };

    fetchDepartments();
  }, [instituteId]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!formState.departmentId) {
        setCourses([]);
        return;
      }

      try {
        const response = await getCourseByDepartment({
          department_id: formState.departmentId,
        });
        if (response.status === 200 && response.json.success) {
          setCourses(response.json.data as Course[]);
        } else {
          showToastMessage(
            "error",
            response.json?.message || "Failed to fetch courses",
          );
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        showToastMessage("error", "Failed to fetch courses");
      }
    };

    fetchCourses();
  }, [formState.departmentId]);

  const validateForm = () => {
    const newErrors: Partial<FormState> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Class name is required";
    }

    if (!formState.year) {
      newErrors.year = "Year is required";
    }

    if (!formState.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    if (!formState.courseId) {
      newErrors.courseId = "Course is required";
    }

    if (!formState.teacherId) {
      newErrors.teacherId = "Teacher is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastMessage = (type: string, message: string) => {
    setToastMessage({ type, message });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (key !== "error" && key !== "success") {
          formData.append(key, value);
        }
      });
      formData.append("instituteId", instituteId);

      const response = await RegisterClassRoom(formData);

      if (response.status === 201) {
        showToastMessage("success", "Classroom registered successfully");
        setFormState({
          name: "",
          year: new Date().getFullYear().toString(),
          departmentId: "",
          courseId: "",
          teacherId: "",
        });
      } else {
        showToastMessage(
          "error",
          response.message || "Failed to register classroom",
        );
      }
    } catch (error) {
      showToastMessage("error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleAddStudents = () => {
    router.replace(`/students/add-student/${instituteId}`); // Navigate to the teacher registration page
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Toast Message */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-500 ${
            toastMessage.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toastMessage.message}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Register New Classroom
        </h2>
        <p className="text-gray-600">
          Create a new classroom for your institute
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter class name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formState.year}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.year ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            name="departmentId"
            value={formState.departmentId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.departmentId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-red-500 text-sm">{errors.departmentId}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            name="courseId"
            value={formState.courseId}
            onChange={handleChange}
            disabled={!formState.departmentId}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              !formState.departmentId ? "bg-gray-100" : ""
            } ${errors.courseId ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <p className="text-red-500 text-sm">{errors.courseId}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <select
            name="teacherId"
            value={formState.teacherId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.teacherId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} ${teacher.lastName} - ${teacher.subjectSpecialization}`}
              </option>
            ))}
          </select>
          {errors.teacherId && (
            <p className="text-red-500 text-sm">{errors.teacherId}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium 
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-red hover:bg-red-700"}
            transition-colors duration-200`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Registering...
            </span>
          ) : (
            "Register Classroom"
          )}
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={handleAddStudents}
          className="w-full bg-primary-red text-white py-2 px-4 rounded-lg font-semibold"
        >
          Add Students
        </button>
      </div>
    </div>
  );
};

export default ClassRegistration;
