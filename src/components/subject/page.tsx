"use client";

import React, { useState } from "react";
import { RegisterSubject } from "@/src/actions/subject.action";

const AddSubject: React.FC<{ course_id: string }> = ({ course_id }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("course id:", course_id);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    formData.append("course_id", course_id);

    try {
      const response = await RegisterSubject(formData);

      if (!response.success) {
        setError(response.message || "Something went wrong");
      } else {
        setSuccess(response.message || null);
        // Reset the form
        (event.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.log(err);
      setError("Failed to add subject. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Subject</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Enter subject name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isLoading ? "Adding Subject..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
