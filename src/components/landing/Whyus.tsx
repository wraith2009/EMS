import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

export default function FeatureCards() {
  const cards = [
    {
      name: "Streamlined Leave Application",
      description:
        "Easily apply for leaves with a few clicks, saving time and effort.",
      backgroundImage: "url(/leave.png)", // Add image path here
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
    {
      name: "Effortless Attendance Tracking",
      description:
        "Monitor attendance seamlessly with our intuitive management tools.",
      backgroundImage: "url(/attendance.png)", // Use your image path
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
    {
      name: "Transparent Financial Management",
      description:
        "Gain insights into finances with real-time tracking and reporting.",
      backgroundImage: "url(/fee.png)",
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
    {
      name: "Event Coordination Made Simple",
      description:
        "Plan and manage events effortlessly, ensuring a smooth experience for all.",
      backgroundImage: "url(/timetable.png)",
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
  ];

  return (
    <div className="w-full sm:w-4/5 lg:w-2/3 flex justify-center mt-10 px-4">
      <BentoGrid className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <BentoCard
            key={index}
            name={card.name}
            description={card.description}
            backgroundImage={card.backgroundImage} // Pass backgroundImage
            Icon={card.Icon}
            href={card.href}
            cta={card.cta}
            className={`col-span-1 ${
              index === 0 || index === 3 ? "sm:col-span-2" : ""
            }`}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
