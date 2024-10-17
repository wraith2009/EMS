import dynamic from "next/dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { redirect } from "next/navigation";
const ProfileClient = dynamic(() => import("./ProfileClient"), { ssr: false });

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return <ProfileClient />;
}
