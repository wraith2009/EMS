import React from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

export default function StepChart(): JSX.Element {
  const steps: Step[] = [
    {
      number: 1,
      title: "School Signup",
      description: "Create an account",
    },
    {
      number: 2,
      title: "Add School Details",
      description: "Fill in school info",
    },
    {
      number: 3,
      title: "Add Teachers",
      description: "Invite teachers",
    },
    {
      number: 4,
      title: "Teachers Add Students",
      description: "Teachers add students",
    },
    {
      number: 5,
      title: "Start Managing",
      description: "Manage school",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:px-8 md:py-4 md:w-2/3 w-full px-4">
      {steps.map((step, index) => (
        <div key={index} className="mb-8 md:mb-0 md:w-1/5 w-full">
          <div className="flex flex-col items-center text-center text-primary-red z-10">
            <div className="bg-primary-red text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">
              {step.number}
            </div>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p>{step.description}</p>
            </div>
          </div>
          {/* Optional connector line for larger screens */}
          {index < steps.length - 1 && (
            <div className="hidden md:block ml-[119px] -mt-[88px] absolute">
              <div className="w-[141px] h-0.5 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 opacity-50 "></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
