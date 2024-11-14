"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/src/context/UserContext";
import { useRouter } from "next/navigation";
import { getAllDepartments } from "@/src/actions/department.action";

interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

export default function DepartmentsPage() {
  const { adminData } = useUser();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      setError(null);
      if (adminData && adminData.institute_id) {
        try {
          const response = await getAllDepartments({
            instituteId: adminData.institute_id,
          });
          if (response.json.success && response.json.data) {
            setDepartments(response.json.data);
          } else {
            setError("Failed to fetch departments");
          }
        } catch (err) {
          console.error("Error fetching departments:", err);
          setError("An error occurred while fetching departments");
        }
      }
      setIsLoading(false);
    };

    fetchDepartments();
  }, [adminData]);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit department", id);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete department", id);
  };

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
          Department List
        </h1>
        {isLoading ? (
          <p className="text-center">Loading departments...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {dept.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {dept.code}
                      </td>
                      <td className="px-4 py-4">
                        {dept.description ?? "No description available"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(dept.id)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          aria-label={`Edit ${dept.name}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${dept.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
              <button
                onClick={() => router.push("/")}
                className="mb-4 sm:mb-0 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
              >
                Go Back
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
                Add Department
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
