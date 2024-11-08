import React from "react";
import UserProfileComponent from "@/src/components/Profile/userProfile";
import AdminProfileComponent from "@/src/components/Profile/adminProfile";
import StudentProfileComponent from "@/src/components/Profile/studentProfile";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { redirect } from "next/navigation";
import Onboarding from "../../onboarding/page";

const UserProfile = async () => {
  const session = (await getServerSession(authOptions)) as Session & {
    user: { role?: string | null };
  };

  if (!session?.user) {
    redirect("/");
    return null;
  }

  if (session.user.role === null || session.user.role === undefined) {
    return (
      <main>
        <Onboarding />
      </main>
    );
  }

  return (
    <main>
      {session.user.role === "admin" && <AdminProfileComponent />}
      {session.user.role === "student" && <StudentProfileComponent />}
      {session.user.role === "teacher" && <UserProfileComponent />}
      {!["admin", "student", "teacher"].includes(session.user.role || "") && (
        <UserProfileComponent />
      )}
    </main>
  );
};

export default UserProfile;
