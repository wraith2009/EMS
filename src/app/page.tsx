import LandingPage from "@/src/components/landing/LandingPage";
import React from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Onboarding from "./onboarding/page";
import Dashboard from "./dashboard/page";
import SidebarLayout from "../components/layouts/sideBarLayout";

export default async function Home() {
  const session = (await getServerSession(authOptions)) as Session & {
    user: { role?: string | null };
  };

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
      <SidebarLayout>
        <Dashboard />
      </SidebarLayout>
    );
  }
}
