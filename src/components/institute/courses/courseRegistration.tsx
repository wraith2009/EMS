"use client";

import React, { useEffect, useState } from "react";
import { getAllDepartments } from "../../../actions/department.actions";
import { RegisterNewCourse } from "../../../actions/course.action";

const CourseRegistration: React.FC<{ instituteId: string }> = ({ instituteId }) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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

  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Handle course registration
    const response = await RegisterNewCourse(formData);
    
    // Provide feedback to the user
    if (response?.success) {
      setResponseMessage("Course registered successfully!");
    } else {
      setResponseMessage(response?.message || "Error registering course");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-primary-red">
          Register New Course
        </h1>
        <form onSubmit={handleCourseSubmit} className="space-y-4 mt-6">
          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Department</label>
            <select
              name="department_id"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setSelectedDepartment(e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course name"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Code</label>
            <input
              type="text"
              name="code"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course code"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea
              name="description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter description"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-red text-white py-2 px-4 rounded-lg font-semibold"
          >
            Register Course
          </button>
        </form>

        {/* Feedback Message */}
        {responseMessage && (
          <div className="mt-4 p-2 bg-gray-200 text-center rounded-md text-gray-700">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistration;
