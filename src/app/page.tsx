import LandingPage from "@/src/components/landing/LandingPage";
import React from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Onboarding from "./onboarding/page";
import Dashboard from "./dashboard/page";

export default async function Home() {
  console.log("Home");
  const session = (await getServerSession(authOptions)) as Session & {
    user: { role?: string | null };
  };

  console.log("serverSession", session?.user);
  if (!session?.user) {
    return (
      <main>
        <LandingPage />
      </main>
    );
  } else if (
    session?.user?.role === null ||
    session?.user?.role === undefined
  ) {
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
