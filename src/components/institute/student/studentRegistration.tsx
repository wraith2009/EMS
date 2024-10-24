"use client";

import React, { useState, useEffect } from "react";
import { getAllDepartments } from "@/src/actions/department.actions";
import { getCourseByDepartment } from "@/src/actions/course.action";
import { RegisterStudent } from "@/src/actions/student.action";
import { getClassByCourse } from "@/src/actions/classRoom.action";
import { StudentStatus } from "@prisma/client";

interface StudentRegistrationProps {
  instituteId: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

interface Course {
  id: string | number | undefined;
  name: string;
  description: string;
  courseCode: string;
}

interface ClassRoom {
  id: string;
  name: string;
  // Add other class properties as needed
}

interface FormState {
  loading: boolean;
  error: string;
  success: string;
}

const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  instituteId,
}) => {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: "",
    success: "",
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getAllDepartments({ instituteId });
        if (response.status === 200 && response.json.success) {
          const departmentsData = response.json.data || [];
          setDepartments(departmentsData);
        } else {
          setFormState((prev) => ({
            ...prev,
            error: response.json.message || "Failed to fetch departments",
          }));
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setFormState((prev) => ({
          ...prev,
          error: "Failed to fetch departments",
        }));
      }
    };

    fetchDepartments();
  }, [instituteId]);

  // Fetch courses when department is selected
  useEffect(() => {
    const fetchCourses = async () => {
      if (!selectedDepartment) {
        setCourses([]);
        setSelectedCourse("");
        setClasses([]);
        return;
      }

      try {
        const response = await getCourseByDepartment({
          department_id: selectedDepartment,
        });
        if (response.status === 200 && response.json.success) {
          setCourses(response.json.data as Course[]);
        } else {
          setFormState((prev) => ({
            ...prev,
            error: response.json?.message || "Failed to fetch courses",
          }));
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setFormState((prev) => ({
          ...prev,
          error: "Failed to fetch courses",
        }));
      }
    };

    fetchCourses();
  }, [selectedDepartment]);

  // Fetch classes when course is selected
  useEffect(() => {
    const fetchClasses = async () => {
      if (!selectedCourse) {
        setClasses([]);
        return;
      }

      try {
        const response = await getClassByCourse({
          courseId: selectedCourse,
        });
        if (response.success) {
          setClasses(response.data ?? []);
        } else {
          setFormState((prev) => ({
            ...prev,
            error: response?.message || "Failed to fetch classes",
          }));
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setFormState((prev) => ({
          ...prev,
          error: "Failed to fetch classes",
        }));
      }
    };

    fetchClasses();
  }, [selectedCourse]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState({ loading: true, error: "", success: "" });

    const formData = new FormData(event.currentTarget);
    formData.append("instituteID", instituteId);

    try {
      const response = await RegisterStudent(formData);
      if (response.status === 200 && response.json.success) {
        setFormState({
          loading: false,
          error: "",
          success: "Student registered successfully!",
        });
        (event.target as HTMLFormElement).reset();
        setSelectedDepartment("");
        setSelectedCourse("");
        setCourses([]);
        setClasses([]);
      } else {
        setFormState({
          loading: false,
          error: response.json?.message || "Failed to register student",
          success: "",
        });
      }
    } catch (err) {
      setFormState({
        loading: false,
        error: err instanceof Error ? err.message : "An error occurred",
        success: "",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-red mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Previous form fields remain the same until the Course dropdown */}

          {/* Department Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter first name"
              />
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password *
              </label>
              <input
                type="text"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter last name"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter address"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>
            {/* status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status *
              </label>
              <select
                name="status"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              >
                <option value="">Select Status</option>
                {[
                  StudentStatus.Active,
                  StudentStatus.Graduated,
                  StudentStatus.Dropped_Out,
                ].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            {/* Current Year */}
            <div>
              <label
                htmlFor="CurrentYear"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Year
              </label>
              <input
                type="number"
                id="CurrentYear"
                name="CurrentYear"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter current year"
              />
            </div>

            {/* Current Semester */}
            <div>
              <label
                htmlFor="CurrentSemester"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Semester
              </label>
              <input
                type="number"
                id="CurrentSemester"
                name="CurrentSemester"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter current semester"
              />
            </div>

            {/* Enrollment Number */}
            <div>
              <label
                htmlFor="enrollmentNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enrollment Number *
              </label>
              <input
                type="text"
                id="enrollmentNumber"
                name="enrollmentNumber"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter enrollment number"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Enter roll number"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department *
            </label>
            <select
              id="department"
              name="department"
              required
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label
              htmlFor="courseID"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course *
            </label>
            <select
              id="courseID"
              name="courseID"
              required
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id ?? ""}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class Dropdown */}
          <div>
            <label
              htmlFor="classID"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class *
            </label>
            <select
              id="classID"
              name="classID"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              <option value="">Select Class</option>
              {classes.map((classRoom) => (
                <option key={classRoom.id} value={classRoom.id}>
                  {classRoom.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={formState.loading}
              className="w-full bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              {formState.loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {formState.error && (
            <div className="text-red-500 text-sm mt-2">{formState.error}</div>
          )}
          {formState.success && (
            <div className="text-green-500 text-sm mt-2">
              {formState.success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
