"use client";
import React from "react";
import { Timeline } from "@/src/components/ui/timeline";
import Image from "next/image";
import Particles from "@/src/components/ui/particles";
const Onboarding: React.FC = () => {
  const timelineData = [
    {
      title: "Step 1: Account Activated!",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">
              You&apos;re in! Time to verify that shiny new account of yours.
              Let&apos;s make sure it&apos;s official.
            </p>
            <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,111,86)] bg-white/[0.2] text-sm transition duration-200 max-w-fit hover:border-primary-red">
              Verify your Account
            </button>
          </div>
          <Image
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728504079/verify1_yywr3h.webp"
            alt="step1 first img"
            width={200}
            height={200}
            className="md:w-1/2 rounded-md"
          ></Image>
        </div>
      ),
    },
    {
      title: "Step 2: Organization, Assemble!",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">
              Ready to take charge? Register your organization and become the
              mastermind behind the scenes.
            </p>
            <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,111,86)] bg-white/[0.2] text-sm transition duration-200 max-w-fit hover:border-primary-red">
              Register your Organization
            </button>
          </div>
          <Image
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728504094/register_z2ju15.webp"
            alt="step1 first img"
            width={200}
            height={200}
            className="md:w-1/2 rounded-md"
          ></Image>
        </div>
      ),
    },
    {
      title: "Step 3: Done and Dusted!",
      content: (
        <p className="text-xl font-semibold">
          All set! You&apos;ve crossed the finish line. Time to dive in and make
          your mark.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-[#f3f7f9] h-full pb-80">
      <Particles 
        className="absolute inset-0 "
        quantity={100}
        ease={80}
        color="#ff6f61"
        size={0.8}
        refresh 
        />
      <div className="flex flex-col items-center">
        <div className="title pt-40 text-primary-red flex flex-col gap-12 items-center px-80">
          <div className="flex flex-col gap-6 items-center">
            <p className="text-primary-red text-4xl font-bold">
              Unlock the Future of{" "}
            </p>
            <div className="relative inline-block">
              <span className="relative z-10 text-4xl px-4 text-white pb-8">
                Institutional Management
              </span>
              <span
                className="absolute inset-0 bg-primary-red -skew-y-3 transform px-4 py-2 -bottom-4 -top-2 rounded-md"
                aria-hidden="true"
              ></span>
            </div>
          </div>
          <div className="description text-2xl font-semibold">
            <p>
              Register your organization to efficiently manage teachers,
              students, and operations. Follow the steps below to get started.
            </p>
          </div>
        </div>
      </div>
      <Timeline data={timelineData} />
    </div>
  );
};
export default Onboarding;
