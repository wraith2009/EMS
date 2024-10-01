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
    <div className="flex justify-between items-center px-8 py-4 w-2/3">
      {steps.map((step, index) => (
        <div key={index}>
          <div className="flex flex-col items-center text-center text-primary-red z-10">
            <div className="bg-primary-red text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">
              {step.number}
            </div>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p>{step.description}</p>
            </div>
          </div>
          {/* Optional connector line (uncomment if desired) */}
          {/* {index < steps.length - 1 && (
            <div className="mb-20 relative">
              <div className="w-32 h-0.5 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 opacity-50"></div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
