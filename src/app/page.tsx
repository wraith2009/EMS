import LandingPage from "@/src/components/landing/LandingPage";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Onboarding from "./onboarding/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main>
        <LandingPage />
      </main>
    );
  } else {
    return (
      <main>
        <Onboarding />
      </main>
    );
  }
}
