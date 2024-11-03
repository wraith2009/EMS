"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import {
  IconDashboard,
  IconUsers,
  IconBook,
  IconCalendar,
  IconSettings,
  IconBell,
} from "@tabler/icons-react";
import { getUserById } from "@/src/actions/auth.actions";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dhrbg2jbi/image/upload/c_crop,w_700,h_700,g_auto/v1729231721/Untitled_design_1__page-0001_bngic2.jpg";

const navigationLinks = [
  {
    label: "Dashboard",
    href: "/teacher/dashboard",
    icon: <IconDashboard className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Students",
    href: "/teacher/students",
    icon: <IconUsers className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Courses",
    href: "/teacher/courses",
    icon: <IconBook className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Schedule",
    href: "/teacher/schedule",
    icon: <IconCalendar className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Settings",
    href: "/teacher/settings",
    icon: <IconSettings className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
];

const TeacherDashboard = () => {
  const [userData, setUserData] = useState({
    name: "Teacher",
    avatar: DEFAULT_AVATAR,
  });

  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        try {
          const response = await getUserById({ userId });
          if (response?.user) {
            setUserData({
              name: response.user.name || "Teacher",
              avatar: response.user.avatar || DEFAULT_AVATAR,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };
    getUser();
  }, [userId]);

  const handleTakeAttendance = () => {
    router.push("/attendance/mark-attendance");
  };

  interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }

  const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    icon,
    children,
  }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {icon}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar>
        <SidebarBody className="!bg-primary-red shadow-lg">
          <div className="mb-8">
            <Image
              src={DEFAULT_AVATAR}
              height={50}
              width={50}
              alt="logo"
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className="rounded-lg py-2 transition-colors flex items-center justify-start text-white font-bold text-xl"
              />
            ))}
          </div>

          <div className="flex flex-col justify-end flex-1 mt-10">
            <div className="flex items-center gap-2 p-2">
              <Image
                src={userData.avatar}
                alt="User Avatar"
                height={40}
                width={40}
                className="rounded-full"
              />
              <span className="text-white font-semibold text-lg sidebar-open:block sidebar-closed:hidden">
                {userData.name}
              </span>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto p-8 bg-[#f3f7f9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back, {userData.name}
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <IconBell className="w-5 h-5" />
              View Notifications
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Mark Attendance"
              icon={<IconUsers className="w-5 h-5 text-gray-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Today&apos;s Classes</span>
                  <span className="font-medium">3 Pending</span>
                </div>
                <button
                  onClick={handleTakeAttendance}
                  className="w-full bg-primary-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                >
                  Take Attendance
                </button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Quick Stats"
              icon={<IconBook className="w-5 h-5 text-gray-500" />}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div>
                  <p className="text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Recent Activity"
              icon={<IconCalendar className="w-5 h-5 text-gray-500" />}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Submitted Grades</span>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Class Completed</span>
                  <span className="text-xs text-gray-500">4h ago</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
