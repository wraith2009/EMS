import LandingPage from "@/src/components/landing/LandingPage";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Onboarding from "./onboarding/page";
import Dashboard from "./dashboard/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("serverSession", session);
  if (!session?.user) {
    return (
      <main>
        <LandingPage />
      </main>
    );
  } else if (session?.user?.role === null) {
    return (
      <main>
        <Onboarding />
      </main>
    );
  } else {
    return (
      <main>
        <Dashboard />
      </main>
    );
  }
}
