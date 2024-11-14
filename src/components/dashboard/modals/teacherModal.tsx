import React, { useState } from "react";
import { TeacherRole } from "@prisma/client";
import { RegisterTeacher } from "@/src/actions/teacher.action";
interface Department {
  id: string;
  name: string;
}

interface TeacherFormData {
  firstName: string;
  lastName: string;
  Email: string;
  password: string;
  dateOfBirth: string;
  department_id: string;
  qualification: string;
  experience: string;
  subjectSpecialization: string;
  subjects_teaching: string;
  employementStartDate: string;
  role: "AssistantProfessor" | "Professor" | "Lecturer";
}

interface TeacherResponseMessage {
  type: "success" | "error";
  message: string;
}

interface TeacherModalProps {
  show: boolean;
  onClose: () => void;
  onTeacherSuccess?: () => void;
  departments: Department[];
  instituteId?: string;
  onSubmit: (formData: TeacherFormData) => Promise<void>;
}

const TeacherModal: React.FC<TeacherModalProps> = ({
  show,
  onClose,
  onTeacherSuccess,
  departments,
  instituteId,
}) => {
  const [teacherFormData, setTeacherFormData] = useState<TeacherFormData>({
    firstName: "",
    lastName: "",
    Email: "",
    password: "",
    dateOfBirth: "",
    department_id: "",
    qualification: "",
    experience: "",
    subjectSpecialization: "",
    subjects_teaching: "",
    employementStartDate: "",
    role: "AssistantProfessor",
  });
  const [teacherResponseMessage, setTeacherResponseMessage] =
    useState<TeacherResponseMessage | null>(null);
  const [teacherErrors, setTeacherErrors] = useState({
    dateOfBirth: "",
    employementStartDate: "",
  });

  const resetTeacherForm = () => {
    setTeacherFormData({
      firstName: "",
      lastName: "",
      Email: "",
      password: "",
      dateOfBirth: "",
      department_id: "",
      qualification: "",
      experience: "",
      subjectSpecialization: "",
      subjects_teaching: "",
      employementStartDate: "",
      role: "AssistantProfessor",
    });
    setTeacherResponseMessage(null);
    setTeacherErrors({
      dateOfBirth: "",
      employementStartDate: "",
    });
  };

  const handleTeacherInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTeacherFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateTeacherForm = () => {
    let isValid = true;
    const errors: { dateOfBirth: string; employementStartDate: string } = {
      dateOfBirth: "",
      employementStartDate: "",
    };

    // Validate date of birth
    const dob = new Date(teacherFormData.dateOfBirth);
    const todayDate = new Date();
    const minDate = new Date(
      todayDate.getFullYear() - 65,
      todayDate.getMonth(),
      todayDate.getDate(),
    );
    const maxDate = new Date(
      todayDate.getFullYear() - 18,
      todayDate.getMonth(),
      todayDate.getDate(),
    );
    if (dob < minDate || dob > maxDate) {
      isValid = false;
      errors.dateOfBirth =
        "Please enter a valid date of birth (between 18 and 65 years old)";
    }

    // Validate employment start date
    const employmentDate = new Date(teacherFormData.employementStartDate);
    if (employmentDate > todayDate) {
      isValid = false;
      errors.employementStartDate =
        "Employment start date cannot be in the future";
    }

    setTeacherErrors(errors);
    return isValid;
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTeacherForm()) return;

    const formData = new FormData();
    Object.entries(teacherFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.set("instituteID", instituteId ?? "");

    try {
      const response = await RegisterTeacher(formData);

      if (response.success) {
        setTeacherResponseMessage({
          type: "success",
          message: response.message,
        });
        resetTeacherForm();
        if (onTeacherSuccess) onTeacherSuccess();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setTeacherResponseMessage({
          type: "error",
          message: response.message,
        });
      }
    } catch (error) {
      setTeacherResponseMessage({
        type: "error",
        message: `Error registering teacher:${error}`,
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Register New Teacher
          </h3>
          <button
            onClick={() => {
              onClose();
              resetTeacherForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {teacherResponseMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              teacherResponseMessage.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {teacherResponseMessage.message}
          </div>
        )}

        <form onSubmit={handleTeacherSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={teacherFormData.firstName}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={teacherFormData.lastName}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="Email"
                value={teacherFormData.Email}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={teacherFormData.password}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="Password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={teacherFormData.dateOfBirth}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              />
              {teacherErrors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {teacherErrors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Department
              </label>
              <select
                name="department_id"
                value={teacherFormData.department_id}
                onChange={handleTeacherInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qualification *
              </label>
              <input
                type="text"
                name="qualification"
                value={teacherFormData.qualification}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., M.Ed., Ph.D."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                value={teacherFormData.experience}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., 5 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject Specialization *
              </label>
              <input
                type="text"
                name="subjectSpecialization"
                value={teacherFormData.subjectSpecialization}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subjects Teaching *
              </label>
              <input
                type="text"
                name="subjects_teaching"
                value={teacherFormData.subjects_teaching}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
                placeholder="e.g., Math, Physics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Start Date *
              </label>
              <input
                type="date"
                name="employementStartDate"
                value={teacherFormData.employementStartDate}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              />
              {teacherErrors.employementStartDate && (
                <p className="mt-1 text-sm text-red-600">
                  {teacherErrors.employementStartDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                name="role"
                value={teacherFormData.role}
                onChange={handleTeacherInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-red focus:ring-primary-red"
              >
                <option value="">Select Role</option>
                {[
                  TeacherRole.AssistantProfessor,
                  TeacherRole.Professor,
                  TeacherRole.Lecturer,
                ].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 transition-colors"
            >
              Register Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
