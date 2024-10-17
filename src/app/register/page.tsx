import BusinessRegistration from "@/src/components/register";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";
const Register = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <BusinessRegistration />;
};

export default Register;
