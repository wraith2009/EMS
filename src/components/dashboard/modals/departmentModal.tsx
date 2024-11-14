import React, { useState, useEffect } from "react";
import { DepartmentFormData } from "../types/department";

interface DepartmentModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (formData: DepartmentFormData) => Promise<void>;
  instituteId?: string;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  show,
  onClose,
  onSubmit,
  instituteId,
}) => {
  const initialState: DepartmentFormData = {
    name: "",
    departmentCode: "",
    description: "",
    parentId: "",
    instituteId: instituteId,
  };

  const [formData, setFormData] = useState<DepartmentFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!show) {
      setFormData(initialState);
    }
  }, [show, instituteId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        instituteId,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Add New Department
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-red focus:border-primary-red"
              placeholder="Enter department name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="departmentCode"
              className="block text-sm font-medium text-gray-700"
            >
              Department Code
            </label>
            <input
              id="departmentCode"
              name="departmentCode"
              type="text"
              value={formData.departmentCode}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-red focus:border-primary-red"
              placeholder="Enter department code"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-red focus:border-primary-red"
              placeholder="Enter department description"
            />
          </div>
          <div>
            <label
              htmlFor="parentId"
              className="block text-sm font-medium text-gray-700"
            >
              Parent Id
            </label>
            <input
              id="parentId"
              name="parentId"
              type="text"
              value={formData.parentId}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-red focus:border-primary-red"
              placeholder="Enter parent ID"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding Department..." : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
