import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236914/avatar-1_xxgkqm.png",
    name: "Alex Rose",
    username: "@alexrose06",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236914/avatar-2_jddbqk.png",
    name: "Sarah Smith",
    username: "@sarahsmith07",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236915/avatar-3_xdijdf.png",
    name: "John Doe",
    username: "@johndoe21",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236915/avatar-4_ppdr5c.png",
    name: "Jane Walker",
    username: "@janewalker",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236915/avatar-5_uzpthr.png",
    name: "David Lee",
    username: "@davidlee22",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut fuga magni!",
    imageSrc:
      "https://res.cloudinary.com/dtc9ysbnn/image/upload/v1723236916/avatar-6_tkivlz.png",
    name: "Emma Stone",
    username: "@emmastone09",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(0, 3);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50% ",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }, i) => (
              <div
                key={i}
                className="card p-5 rounded-lg shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-[#676767]">{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-full bg-white"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight text-[#676767] leading-5">
                      {name}
                    </div>
                    <div className="leading-5 text-[#676767] tracking-tight">
                      {username}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="bg-[#f3f7f9]">
      <div className="px-5 md:px-0 md:max-w-[900px] lg:max-w-[1300px] container mx-auto">
        <div className="max-w-[540px] mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-b from-primary-red to-slate-200 text-transparent bg-clip-text text-center mt-5">
            What our users say
          </h2>
          <p className="text-lg tracking-tighter text-[#8c9499] text-center mt-5">
            Hear from Our Satisfied Users About Their Experience with
            management.
          </p>
        </div>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)] mt-10 max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
