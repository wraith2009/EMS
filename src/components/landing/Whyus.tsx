import { BentoGrid, BentoCard } from '../magicui/bento-grid'; // assuming the file is named BentoGrid
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function FeatureCards() {
  const cards = [
    {
      name: "Streamlined Leave Application",
      description: "Easily apply for leaves with a few clicks, saving time and effort.",
      background: <div className="w-full h-full bg-[#bfa6d6]" />, // Custom background color
      Icon: ArrowRightIcon,
      href: "#", // Add the appropriate link
      cta: "Learn More",
    },
    {
      name: "Effortless Attendance Tracking",
      description: "Monitor attendance seamlessly with our intuitive management tools.",
      background: <div className="w-full h-full bg-[#d5b5b2]" />,
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
    {
      name: "Transparent Financial Management",
      description: "Gain insights into finances with real-time tracking and reporting.",
      background: <div className="w-full h-full bg-[#a5c6bd]" />,
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    },
    {
      name: "Event Coordination Made Simple",
      description: "Plan and manage events effortlessly, ensuring a smooth experience for all.",
      background: <div className="w-full h-full bg-[#9eb1bf]" />,
      Icon: ArrowRightIcon,
      href: "#",
      cta: "Learn More",
    }
  ];

  return (
    <div className="w-2/3 flex justify-center mt-10">
      <BentoGrid className="gap-6">
        {cards.map((card, index) => (
          <BentoCard
            key={index}
            name={card.name}
            description={card.description}
            background={card.background}
            Icon={card.Icon}
            href={card.href}
            cta={card.cta}
            className={
              index === 0 || index === 3
                ? "col-span-1 sm:col-span-2" // 1 space on small, 2 on large for 1st and 4th card
                : "col-span-1" // 1 space for 2nd and 3rd card
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
}
