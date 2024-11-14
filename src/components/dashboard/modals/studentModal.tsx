import React, { useState } from "react";
import { StudentStatus } from "@prisma/client";
interface Department {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
}

interface ClassRoom {
  id: string;
  year: string;
  name: string;
}
interface ClassFormState {
  name: string;
  year: string;
  departmentId: string;
  courseId: string;
  teacherId: string;
  error?: string;
  success?: string;
}
interface StudentModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmitStudent: (event: React.FormEvent<HTMLFormElement>) => void;
  departments: Department[];
  courses: Course[];
  classes: ClassRoom[];

  onDepartmentChange: (departmentId: string) => void;
  onCourseChange: (courseId: string) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
  showModal,
  setShowModal,
  handleSubmitStudent,
  departments,
  courses,
  classes,
  onDepartmentChange,
  onCourseChange,
}) => {
  const [classFormState, setClassFormState] = useState<ClassFormState>({
    name: "",
    year: "",
    departmentId: "",
    courseId: "",
    teacherId: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setClassFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "departmentId") {
      console.log("Department changed to:", value);
      onDepartmentChange(value);
      setClassFormState((prev) => ({
        ...prev,
        courseId: "",
        departmentId: value,
      }));
    }
    if (name === "courseId") {
      console.log("courseId changed to:", value);
      onCourseChange(value);
      setClassFormState((prev) => ({
        ...prev,
        courseId: value,
      }));
    }
  };

  if (!showModal) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Add New Student</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmitStudent} className="space-y-6">
          {/* Previous form fields remain the same until the Course dropdown */}

          {/* Department Dropdown */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {/* </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="departmentId"
                  value={classFormState.departmentId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 
                  }`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  name="courseId"
                  value={classFormState.courseId}
                  onChange={handleChange}
                  disabled={!classFormState.departmentId}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    !classFormState.departmentId ? "bg-gray-100" : ""
                  } `}
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div> */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="departmentId"
              value={classFormState.departmentId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              name="courseId"
              value={classFormState.courseId}
              onChange={handleChange}
              disabled={!classFormState.departmentId}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                !classFormState.departmentId ? "bg-gray-100" : ""
              }`}
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
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
                  {"year:" + classRoom.year + " section:" + classRoom.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-primary-red"
            ></button>
          </div>

          {/* Error and Success Messages */}
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
