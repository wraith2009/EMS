// app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { redirect } from "next/navigation";
import ProfilePageClient from "./profilePageClient";
import React from "react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <ProfilePageClient />
    </div>
  );
}
