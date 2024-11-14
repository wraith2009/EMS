"use client";
import React from "react";
import { AdminDashboard } from "./admin/adminDashboard";
import { useRouter } from "next/navigation";
import {
  IconUsers,
  IconBook,
  IconCalendar,
  IconBell,
  IconNotebook,
  IconChartBar,
  IconClock,
  // IconBriefcase,
  // IconBuilding,
} from "@tabler/icons-react";
import { useUser } from "@/src/context/UserContext";
interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
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

const TeacherDashboard = () => {
  const router = useRouter();

  const handleTakeAttendance = () => {
    router.push("/attendance/mark-attendance");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Mark Attendance"
        icon={<IconUsers className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Today&apos;s Classes</span>
            <span className="font-medium text-primary-red">3 Pending</span>
          </div>
          <button
            onClick={handleTakeAttendance}
            className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Take Attendance
          </button>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Quick Stats"
        icon={<IconBook className="w-6 h-6" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-gray-800">156</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Active Courses</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Recent Activity"
        icon={<IconCalendar className="w-6 h-6" />}
      >
        <div className="space-y-3">
          {[
            { action: "Submitted Grades", time: "2h ago" },
            { action: "Class Completed", time: "4h ago" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-gray-600">{activity.action}</span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Upcoming Assignments"
        icon={<IconNotebook className="w-6 h-6" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Due This Week</span>
            <span className="font-medium text-primary-red">2 Pending</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Math Assignment</p>
              <p className="text-sm text-gray-600">Due in 2 days</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Science Project</p>
              <p className="text-sm text-gray-600">Due in 5 days</p>
            </div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="My Progress"
        icon={<IconChartBar className="w-6 h-6" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Attendance</p>
            <p className="text-2xl font-bold text-gray-800">92%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Average Grade</p>
            <p className="text-2xl font-bold text-gray-800">A-</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Class Schedule"
        icon={<IconClock className="w-6 h-6" />}
      >
        <div className="space-y-3">
          {[
            { subject: "Mathematics", time: "9:00 AM", room: "Room 101" },
            { subject: "Science", time: "11:00 AM", room: "Lab 2" },
          ].map((schedule, index) => (
            <div
              key={index}
              className="flex flex-col p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{schedule.subject}</span>
                <span className="text-sm text-gray-500">{schedule.time}</span>
              </div>
              <span className="text-xs text-gray-600">{schedule.room}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

const DashboardComponent = () => {
  const { userData, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-[#f3f7f9]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back, {userData?.name ?? "Guest"}
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <IconBell className="w-5 h-5" />
            <span>View Notifications</span>
          </button>
        </div>

        {userData?.role === "teacher" ? (
          <TeacherDashboard />
        ) : userData?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
