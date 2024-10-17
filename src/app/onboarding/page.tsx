"use client";
import React from "react";
import { Timeline } from "@/src/components/ui/timeline";
import Particles from "@/src/components/ui/particles";
import Header from "@/src/components/auth/Header";
import FooterPage from "@/src/components/auth/footer";

const Onboarding: React.FC = () => {
  const timelineData = [
    {
      title: "Step 1: Account Activated!",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-lg md:text-xl font-semibold text-[#676767] text-center md:text-left">
              You&apos;re in! Time to verify that shiny new account of yours.
              Let&apos;s make sure it&apos;s official.
            </p>
            <a href="/profile">
              <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,111,86)] bg-white/[0.2] text-sm transition duration-200 max-w-fit hover:border-primary-red">
                Verify your Account
              </button>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Organization, Assemble!",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-lg md:text-xl text-[#676767] font-semibold text-center md:text-left">
              Ready to take charge? Register your organization and become the
              mastermind behind the scenes.
            </p>
            <a href="/register">
              <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,111,86)] bg-white/[0.2] text-sm transition duration-200 max-w-fit hover:border-primary-red">
                Register your Organization
              </button>
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#f3f7f9] h-full">
      <Particles
        className="absolute inset-0 "
        quantity={100}
        ease={80}
        color="#ff6f61"
        size={0.8}
        refresh
      />
      <Header />
      <div className="flex flex-col items-center">
        <div className="title pt-20 md:pt-40 text-primary-red flex flex-col gap-6 md:gap-12 items-center px-4 md:px-10 lg:px-20">
          <div className="flex flex-col gap-6 items-center">
            <p className="text-primary-red text-2xl md:text-3xl lg:text-4xl font-bold text-center">
              Unlock the Future of{" "}
            </p>
            <div className="relative inline-block text-center">
              <span className="relative z-10 text-2xl md:text-3xl lg:text-4xl px-4 text-white pb-8">
                Institutional Management
              </span>
              <span
                className="absolute inset-0 bg-primary-red -skew-y-3 transform px-4 py-2 -bottom-4 -top-2 rounded-md"
                aria-hidden="true"
              ></span>
            </div>
          </div>
          <div className="description text-lg text-[#676767] md:text-xl font-semibold text-center">
            <p>
              Register your organization to efficiently manage teachers,
              students, and operations. Follow the steps below to get started.
            </p>
          </div>
        </div>
      </div>
      <Timeline data={timelineData} />
      <div className="py-10  text-center">
        <h2 className="text-3xl md:text-4xl  my-4 font-bold text-primary-red">
          Congratulations!
        </h2>
        <p className="text-lg md:text-xl  mb-4 text-[#676767] font-semibold">
          All set! You&apos;ve completed the setup.It&apos;s time to dive in and
          make your organisation management easy.
        </p>
        <button className="py-2 px-4 bg-primary-red text-slate-200 hover:text-white rounded-3xl border-gray-600">
          Dashboard
        </button>
      </div>
      <FooterPage />
    </div>
  );
};

export default Onboarding;
