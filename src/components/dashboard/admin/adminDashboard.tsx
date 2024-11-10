"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/src/context/UserContext";
import {
  //   IconUsers,
  //   IconBell,
  //   IconChartBar,
  IconBriefcase,
  IconBuilding,
} from "@tabler/icons-react";
import {
  CreateDepartment,
  getAllDepartments,
} from "@/src/actions/department.action";
import { RegisterNewCourse } from "@/src/actions/course.action";
import { getCourseByDepartment } from "@/src/actions/course.action";
import { RegisterTeacher } from "../../../actions/teacher.action";
import { TeacherRole } from "@prisma/client";
import toast from "react-hot-toast";
import { RegisterClassRoom } from "@/src/actions/classroom.action";
import { TeacherByInstituteID } from "../../../actions/teacher.action";
// Define the interface for adminData
interface AdminData {
  institute_id: string;
  admin_id: string;
  access_level: string;
}

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
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
interface Course {
  id: string;
  name: string;
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
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <div className="text-gray-500">{icon}</div>
    </div>
    {children}
  </div>
);

export const AdminDashboard = () => {
  const router = useRouter();

  // Provide type definition for useUser context
  const { isLoading, adminData } = useUser() as {
    userData: any;
    isLoading: boolean;
    adminData: AdminData | null;
  };

  const [showDepModal, setShowDepModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [instituteId, setInstituteId] = useState<string | null>(null);

  const [departments, setDepartments] = useState<Department[]>([]);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [teacherFormData, setTeacherFormData] = useState({
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
    role: "",
  });

  const [teacherErrors, setTeacherErrors] = useState<{ [key: string]: string }>(
    {},
  );
  const [teacherResponseMessage, setTeacherResponseMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showClassModal, setShowClassModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [classFormState, setClassFormState] = useState<FormState>({
    name: "",
    year: new Date().getFullYear().toString(),
    departmentId: "",
    courseId: "",
    teacherId: "",
  });
  useEffect(() => {
    console.log("in useee");
    const fetchDepartments = async () => {
      console.log("fetch");
      if (adminData) {
        setInstituteId(adminData.institute_id);
        if (adminData && adminData.institute_id) {
          console.log("adminData:", adminData);

          const response = await getAllDepartments({
            instituteId: adminData.institute_id,
          });
          console.log("response:", response);
          if (response.json.success) {
            if (response.json.data) {
              setDepartments(response.json.data);
              console.log("departments", departments);
            }
          }
        }
      }
    };
    console.log("calling function");
    fetchDepartments();
    console.log("departments", departments);
  }, [adminData]);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await TeacherByInstituteID({
          instituteId: instituteId ?? "",
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
            console.log(response.message, "No teachers found");
          }
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, [instituteId]);
  useEffect(() => {
    const fetchCourses = async () => {
      console.log("fetching courses");
      if (!classFormState.departmentId) {
        setCourses([]);
        return;
      }

      try {
        const response = await getCourseByDepartment({
          department_id: classFormState.departmentId,
        });
        if (response.status === 200 && response.json.success) {
          setCourses(response.json.data as Course[]);
        } else {
          toast.error(response.json?.message || "Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, [classFormState.departmentId]);

  const handleViewDepartments = () => router.push("/admin/departments");
  const handleAddDepartment = () => setShowDepModal(true);

  const handleAddCourse = () => setShowCourseModal(true);
  const handleViewCourse = () => router.push("/admin/courses");

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newDepartmentName);
    formData.append("DepartmentCode", departmentCode);
    formData.append("description", departmentDescription);
    formData.append("institute_id", instituteId ?? "");
    formData.append("parent_id", parentId ?? "");

    try {
      const response = await CreateDepartment(formData);
      if (response?.success) {
        console.log("Department created successfully:", response);
        toast.success("Department Added Successfully!");
        setShowDepModal(false);
      } else {
        console.error("Error:", response?.message);
        toast.error("Error Adding Department!");
      }
      setNewDepartmentName("");
      setDepartmentCode("");
      setDepartmentDescription("");
      setParentId("");
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };
  const handleSubmitCourseForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("code", courseCode);
    formData.append("department_id", departmentId);
    formData.append("description", description);

    try {
      const response = await RegisterNewCourse(formData);
      if (response?.success) {
        setResponseMessage("Course registered successfully!");
        resetCourseForm();
        // if (onSuccess) onSuccess();
        toast.success("Course Added Successfully!");
        setTimeout(() => {
          setShowCourseModal(false);
        }, 1500);
      } else {
        setResponseMessage(response?.message || "Error registering course");
        toast.error("Unable to register course");
      }
    } catch (error) {
      setResponseMessage("Error creating course");
      console.error("Error creating course:", error);
    }
  };
  const resetCourseForm = () => {
    setCourseName("");
    setCourseCode("");
    setDepartmentId("");
    setDescription("");
    setResponseMessage(null);
  };

  const handleAddTeachers = () => setShowTeacherModal(true);
  //   const handleViewTeachers = () => router.push("/admin/teachers");
  const handleTeacherInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setTeacherFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateTeacherForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!teacherFormData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }
    if (!teacherFormData.employementStartDate) {
      newErrors.employementStartDate = "Employment Start Date is required";
    }

    setTeacherErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        // if (onTeacherSuccess) onTeacherSuccess();
        setTimeout(() => {
          setShowTeacherModal(false);
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
      role: "",
    });
    setTeacherErrors({});
    setTeacherResponseMessage(null);
  };
  const handleViewClass = () => router.push("/admin/classes");
  const handleAddClass = () => setShowClassModal(true);
  const validateClassForm = () => {
    const newErrors: Partial<FormState> = {};

    if (!classFormState.name.trim()) {
      newErrors.name = "Class name is required";
    }

    if (!classFormState.year) {
      newErrors.year = "Year is required";
    }

    if (!classFormState.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    if (!classFormState.courseId) {
      newErrors.courseId = "Course is required";
    }

    if (!classFormState.teacherId) {
      newErrors.teacherId = "Teacher is required";
    }

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmitClass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateClassForm()) {
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(classFormState).forEach(([key, value]) => {
        if (key !== "error" && key !== "success") {
          formData.append(key, value);
        }
      });
      formData.append("instituteId", instituteId ?? "");

      const response = await RegisterClassRoom(formData);

      if (response.status === 201) {
        toast.success("Classroom registered successfully");
        setClassFormState({
          name: "",
          year: new Date().getFullYear().toString(),
          departmentId: "",
          courseId: "",
          teacherId: "",
        });
      } else {
        toast.error("Failed to register classroom");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setClassFormState((prev) => ({ ...prev, [name]: value }));
  };
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <DashboardCard
        title="System Overview"
        icon={<IconChartBar className="w-6 h-6" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">487</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Active Courses</p>
            <p className="text-2xl font-bold text-gray-800">24</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Teachers</p>
            <p className="text-2xl font-bold text-gray-800">32</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Students</p>
            <p className="text-2xl font-bold text-gray-800">455</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="User Management"
        icon={<IconUsers className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">New Registration Requests</span>
            <span className="font-medium text-primary-red">5 Pending</span>
          </div>
          <button
            onClick={handleManageUsers}
            className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Manage Users
          </button>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Recent Registrations</span>
              <span className="text-xs text-gray-500">Last 24h</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="System Alerts"
        icon={<IconBell className="w-6 h-6" />}
      >
        <div className="space-y-3">
          {[
            {
              type: "Server Load",
              status: "Normal",
              time: "2m ago",
              color: "text-green-600",
            },
            {
              type: "Storage Usage",
              status: "75%",
              time: "1h ago",
              color: "text-yellow-600",
            },
            {
              type: "Backup Status",
              status: "Completed",
              time: "6h ago",
              color: "text-green-600",
            },
          ].map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">{alert.type}</span>
                <span className={`text-sm ${alert.color}`}>{alert.status}</span>
              </div>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
      </DashboardCard> */}

      <DashboardCard
        title="Department Management"
        icon={<IconBuilding className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Departments</span>
            <span className="font-medium text-primary-red">
              {departments.length} Active
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleViewDepartments}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              View Departments
            </button>
            <button
              onClick={handleAddDepartment}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              Add Department
            </button>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard
        title="Course Management"
        icon={<IconBuilding className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Courses</span>
            <span className="font-medium text-primary-red">
              {departments.length} Active
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleViewCourse}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              View Courses
            </button>
            <button
              onClick={handleAddCourse}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              Add Course
            </button>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard
        title="Employee Management"
        icon={<IconBriefcase className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <button
            onClick={handleAddTeachers}
            className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Add Employees
          </button>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Employees</span>
              <span className="text-xs text-gray-500">Updated 1h ago</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">78</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Hires</span>
              <span className="text-xs text-gray-500">This Month</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">5</p>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard
        title="Classes Management"
        icon={<IconBuilding className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handleViewClass}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              View Classes
            </button>
            <button
              onClick={handleAddClass}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              Add Class
            </button>
          </div>
        </div>
      </DashboardCard>
      {showDepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Add New Department
              </h3>
              <button
                onClick={() => setShowDepModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department Code
                </label>
                <input
                  type="text"
                  value={departmentCode}
                  onChange={(e) => setDepartmentCode(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter department code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter department description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Id
                </label>
                <textarea
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter department description"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300"
              >
                Add Department
              </button>
            </form>
          </div>
        </div>
      )}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Register New Course
              </h3>
              <button
                onClick={() => {
                  setShowCourseModal(false);
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
      )}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Register New Teacher
              </h3>
              <button
                onClick={() => {
                  setShowTeacherModal(false);
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
      )}
      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Class</h3>
              <button
                onClick={() => setShowClassModal(false)}
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 
                  }`}
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
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Teacher
                </label>
                <select
                  name="teacherId"
                  value={classFormState.teacherId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500
                  }`}
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
      )}
    </div>
  );
};
