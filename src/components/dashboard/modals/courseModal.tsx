import React, { useState } from "react";

interface Department {
  id: string;
  name: string;
}

interface CourseFormData {
  name: string;
  code: string;
  departmentId: string;
  description: string;
}

interface CourseModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  departments: Department[];
  onSubmit: (formData: CourseFormData) => Promise<void>;
}

const CourseModal: React.FC<CourseModalProps> = ({
  show,
  onClose,
  onSuccess,
  departments,
  onSubmit,
}) => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const resetCourseForm = () => {
    setCourseName("");
    setCourseCode("");
    setDepartmentId("");
    setDescription("");
    setResponseMessage("");
  };

  const handleSubmitCourseForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: CourseFormData = {
      name: courseName,
      code: courseCode,
      departmentId,
      description,
    };

    try {
      await onSubmit(formData);
      setResponseMessage("Course registered successfully!");
      resetCourseForm();
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setResponseMessage("Error registering course");
      console.error("Error creating course:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Register New Course
          </h3>
          <button
            onClick={() => {
              onClose();
              resetCourseForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmitCourseForm} className="space-y-4">
          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Department
            </label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course name"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Code
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course code"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter description"
            />
          </div>

          {/* Feedback Message */}
          {responseMessage && (
            <div className="p-2 bg-gray-200 text-center rounded-md text-gray-700">
              {responseMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300"
          >
            Register Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
