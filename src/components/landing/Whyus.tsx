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
    <div className="w-2/3 flex justify-center mt-10">
      <BentoGrid className="gap-6">
        {cards.map((card, index) => (
          <BentoCard
            key={index}
            name={card.name}
            description={card.description}
            backgroundImage={card.backgroundImage} // Pass backgroundImage
            Icon={card.Icon}
            href={card.href}
            cta={card.cta}
            className={
              index === 0 || index === 3
                ? "col-span-1 sm:col-span-2"
                : "col-span-1"
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
}
