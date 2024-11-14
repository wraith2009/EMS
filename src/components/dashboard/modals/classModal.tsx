import React, { useState } from "react";
import { toast } from "react-hot-toast";

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
  subjectSpecialization: string;
  employementStartDate: Date;
}

interface ClassFormState {
  name: string;
  year: string;
  departmentId: string;
  courseId: string;
  teacherId: string;
}

interface ClassModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  instituteId: string;
  departments: Department[];
  courses: Course[];
  teachers: Teacher[];
  RegisterClassRoom: (formData: FormData) => Promise<{ status: number }>;
  onDepartmentChange: (departmentId: string) => void;
}

const ClassModal: React.FC<ClassModalProps> = ({
  show,
  onClose,
  onSuccess,
  instituteId,
  departments,
  courses,
  teachers,
  RegisterClassRoom,
  onDepartmentChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [classFormState, setClassFormState] = useState<ClassFormState>({
    name: "",
    year: new Date().getFullYear().toString(),
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
      onDepartmentChange(value);
      // Reset courseId when department changes
      setClassFormState((prev) => ({
        ...prev,
        courseId: "",
      }));
    }
  };

  const validateClassForm = () => {
    if (!classFormState.name.trim()) {
      toast.error("Class name is required");
      return false;
    }
    if (!classFormState.year) {
      toast.error("Year is required");
      return false;
    }
    if (!classFormState.departmentId) {
      toast.error("Department is required");
      return false;
    }
    if (!classFormState.courseId) {
      toast.error("Course is required");
      return false;
    }
    if (!classFormState.teacherId) {
      toast.error("Teacher is required");
      return false;
    }
    return true;
  };

  const handleSubmitClass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateClassForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(classFormState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("instituteId", instituteId);

      const response = await RegisterClassRoom(formData);
      console.log("RegisterClassRoom response", response);
      if (response.status === 201) {
        toast.success("Classroom registered successfully");
        setClassFormState({
          name: "",
          year: new Date().getFullYear().toString(),
          departmentId: "",
          courseId: "",
          teacherId: "",
        });
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error("Failed to register classroom");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Add New Class</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmitClass} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              name="name"
              value={classFormState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter class name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={classFormState.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Teacher
            </label>
            <select
              name="teacherId"
              value={classFormState.teacherId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {`${teacher.firstName} ${teacher.lastName} - ${teacher.subjectSpecialization}`}
                </option>
              ))}
            </select>
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
      </div>
    </div>
  );
};

export default ClassModal;
