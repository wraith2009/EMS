"use client";
import { DashboardCard } from "../../templates/dashboardCard";
import {
  DepartmentFormData,
  CreateDepartmentResponse,
} from "../types/department";
import { CourseFormData } from "../types/course";
import CourseModal from "../modals/courseModal";
import TeacherModal from "../modals/teacherModal";
import StudentModal from "../modals/studentModal";
import { TeacherFormData } from "../types/teacher";
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
import toast from "react-hot-toast";
import { RegisterClassRoom } from "@/src/actions/classroom.action";
import { TeacherByInstituteID } from "../../../actions/teacher.action";

import { RegisterStudent } from "@/src/actions/student.action";
import { getClassByCourse } from "@/src/actions/classroom.action";
import DepartmentModal from "../modals/departmentModal";
import ClassModal from "../modals/classModal";
interface AdminData {
  institute_id: string;
  admin_id: string;
  access_level: string;
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
interface ClassRoom {
  id: string;
  name: string;
  year: string;
  // Add other class properties as needed
}

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
  const [instituteId, setInstituteId] = useState<string | null>(null);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [, setResponseMessage] = useState<string | null>(null);
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

  // const [teacherErrors, setTeacherErrors] = useState<{ [key: string]: string }>(
  //   {},
  // );
  const [, setTeacherResponseMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showClassModal, setShowClassModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const classFormState: FormState = {
    name: "",
    year: new Date().getFullYear().toString(),
    departmentId: "",
    courseId: "",
    teacherId: "",
  };
  const [, setSelectedCourse] = useState<string>("");
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
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
    const fetchCourses = async () => {
      console.log("Fetching courses for department:", selectedDepartmentId);

      if (!selectedDepartmentId) {
        console.log("No department selected, clearing courses");
        setCourses([]);
        return;
      }

      try {
        const response = await getCourseByDepartment({
          department_id: selectedDepartmentId,
        });
        console.log("Course API response:", response);

        if (response.status === 200 && response.json.success) {
          setCourses(response.json.data as Course[]);
          console.log("Courses set:", response.json.data);
        } else {
          console.error("API Error:", response.json);
          toast.error(response.json?.message || "Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, [selectedDepartmentId]);
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
    console.log("selected course:", classFormState.courseId);
    console.log("selected course:", selectedCourseId);
    const fetchClasses = async () => {
      console.log("fetching classes:", selectedCourseId);
      if (!selectedCourseId) {
        console.log("no course selected");
        setClasses([]);
        return;
      }
      console.log("entering trycartch");

      try {
        const response = await getClassByCourse({
          courseId: selectedCourseId,
        });
        console.log("class fetch response:", response);
        if (response.success) {
          setClasses(
            (response.data ?? []).map((classRoom: any) => ({
              ...classRoom,
              year: classRoom.year ?? "",
            })),
          );
        } else {
          console.log("failed to get classes", response.message);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [selectedCourseId]);

  const handleViewDepartments = () => router.push("/departments");
  const handleAddDepartment = () => setShowDepModal(true);

  const handleAddCourse = () => setShowCourseModal(true);
  const handleViewCourse = () => router.push("/courses");

  const handleSubmitForm = async (formData: DepartmentFormData) => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("DepartmentCode", formData.departmentCode);
    form.append("description", formData.description);
    form.append("institute_id", formData.instituteId ?? "");
    form.append("parent_id", formData.parentId ?? "");

    try {
      const response = (await CreateDepartment(
        form,
      )) as CreateDepartmentResponse;
      if (response?.success) {
        toast.success("Department Added Successfully!");
        setShowDepModal(false);
      } else {
        toast.error(response?.message ?? "Error Adding Department!");
      }
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Error Adding Department!");
    }
  };

  const handleSubmitCourseForm = async (formData: CourseFormData) => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("code", formData.code);
    form.append("department_id", formData.departmentId);
    form.append("description", formData.description);

    try {
      const response = await RegisterNewCourse(form);
      if (response?.success) {
        toast.success("Course Added Successfully!");
      } else {
        setResponseMessage(response?.message || "Error registering course");
        toast.error("Unable to register course");
      }
    } catch (error) {
      setResponseMessage("Error creating course");
      console.error("Error creating course:", error);
    }
  };

  const handleAddTeachers = () => setShowTeacherModal(true);
  const handleViewTeachers = () => router.push("/employees");

  const validateTeacherForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!teacherFormData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }
    if (!teacherFormData.employementStartDate) {
      newErrors.employementStartDate = "Employment Start Date is required";
    }

    return Object.keys(newErrors).length === 0;
  };
  const handleTeacherSubmit = async (formData: TeacherFormData) => {
    if (!validateTeacherForm()) return;

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.set("instituteID", instituteId ?? "");

    try {
      const response = await RegisterTeacher(form);

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
    setTeacherResponseMessage(null);
  };
  const handleViewClass = () => router.push("/admin/classes");
  const handleViewStudent = () => router.push("/students");
  const handleAddClass = () => setShowClassModal(true);

  const handleSubmitStudent = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("instituteID", instituteId ?? "");

    try {
      const response = await RegisterStudent(formData);
      if (response.status === 200 && response.json.success) {
        toast.success("student registered successfully");
        // setFormState({
        //   loading: false,
        //   error: "",
        //   success: "Student registered successfully!",
        // });
        (event.target as HTMLFormElement).reset();
        // setSelectedDepartment("");
        setSelectedCourse("");
        setCourses([]);
        setClasses([]);
      } else {
        console.log("Error: " + response.status, response.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Error: " + err);
    }
  };
  const handleAddStudent = () => setShowStudentModal(true);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <button
            onClick={handleViewTeachers}
            className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            View Employees
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
        <DepartmentModal
          show={showDepModal}
          onClose={() => setShowDepModal(false)}
          onSubmit={handleSubmitForm}
          instituteId={instituteId ?? undefined}
        />
      )}
      {showCourseModal && (
        <CourseModal
          show={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          onSuccess={() => setShowCourseModal(false)}
          departments={departments}
          onSubmit={handleSubmitCourseForm}
        />
      )}
      {showTeacherModal && (
        <TeacherModal
          show={showTeacherModal}
          onClose={() => setShowTeacherModal(false)}
          onTeacherSuccess={() => setShowTeacherModal(false)}
          departments={departments}
          onSubmit={handleTeacherSubmit}
          instituteId={instituteId ?? undefined}
        />
      )}
      {showClassModal && (
        <ClassModal
          show={showClassModal}
          onClose={() => setShowClassModal(false)}
          onSuccess={() => setShowClassModal(false)}
          instituteId={instituteId ?? ""}
          departments={departments}
          courses={courses}
          teachers={teachers}
          RegisterClassRoom={RegisterClassRoom}
          onDepartmentChange={(departmentId: string) =>
            setSelectedDepartmentId(departmentId)
          }
        />
      )}
      <DashboardCard
        title="Student Management"
        icon={<IconBuilding className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handleViewStudent}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              View Students
            </button>
            <button
              onClick={handleAddStudent}
              className="w-full  bg-primary-red hover:bg-red-700 focus:ring-red-500  text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              Add Student
            </button>
          </div>
        </div>
      </DashboardCard>
      {showStudentModal && (
        <StudentModal
          showModal={showStudentModal}
          setShowModal={setShowStudentModal}
          handleSubmitStudent={handleSubmitStudent}
          departments={departments}
          courses={courses}
          classes={classes}
          onDepartmentChange={(departmentId: string) =>
            setSelectedDepartmentId(departmentId)
          }
          onCourseChange={(courseId: string) => setSelectedCourseId(courseId)}
        />
      )}
    </div>
  );
};
