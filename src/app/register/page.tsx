import BusinessRegistration from "@/src/components/register";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";
const Register = async () => {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (!session) {
    redirect("/");
  }

  return session?.user ? (
    <BusinessRegistration userId={(session.user as { id: string }).id} />
  ) : null;
};

export default Register;
