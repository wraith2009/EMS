"use client";

import React from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconDashboard,
  IconUsers,
  IconBook,
  IconCalendar,
  IconSettings,
  IconNotebook,
  IconMessage,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { useUser } from "../../context/UserContext";
import Link from "next/link";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dhrbg2jbi/image/upload/c_crop,w_700,h_700,g_auto/v1729231721/Untitled_design_1__page-0001_bngic2.jpg";

const teacherNavigationLinks = [
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

const studentNavigationLinks = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: <IconDashboard className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "My Courses",
    href: "/student/courses",
    icon: <IconBook className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Assignments",
    href: "/student/assignments",
    icon: <IconNotebook className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Messages",
    href: "/student/messages",
    icon: <IconMessage className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Progress",
    href: "/student/progress",
    icon: (
      <IconReportAnalytics className="min-w-8 min-h-8 w-8 h-8 text-white" />
    ),
  },
  {
    label: "Settings",
    href: "/student/settings",
    icon: <IconSettings className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
];

const adminNavigationLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <IconDashboard className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <IconUsers className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <IconSettings className="min-w-8 min-h-8 w-8 h-8 text-white" />,
  },
];

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { userData, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        Unauthorized
      </div>
    );
  }

  const getNavigationLinks = (role: string) => {
    switch (role) {
      case "teacher":
        return teacherNavigationLinks;
      case "student":
        return studentNavigationLinks;
      case "admin":
        return adminNavigationLinks;
      default:
        return studentNavigationLinks;
    }
  };

  const navigationLinks = getNavigationLinks(userData.role);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar>
        <SidebarBody className="!bg-primary-red shadow-lg">
          <div className="mb-8">
            <Image
              src={userData.avatar || DEFAULT_AVATAR}
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
            <Link href="/userProfile">
              <div className="flex items-center gap-2 p-2">
                <Image
                  src={userData.avatar || DEFAULT_AVATAR}
                  alt="User Avatar"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <span className="text-white font-semibold text-lg sidebar-open:block sidebar-closed:hidden">
                  {userData.name}
                </span>
              </div>
            </Link>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto p-8 bg-[#f3f7f9]">{children}</main>
    </div>
  );
};

export default SidebarLayout;
