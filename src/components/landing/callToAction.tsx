import React from "react";

interface CallToActionProps {
  onOpen: () => void; // Define the type of the onOpen function
}

const CallToAction = ({ onOpen }: CallToActionProps) => {
  return (
    <div>
      <div className="items-center justify-between mt-5">
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-b from-primary-red to-slate-200 text-transparent bg-clip-text text-center mt-5">
          SignUp to get started
        </h2>
        <p className="text-[#8c9499] text-center py-2">
          Effortless Management for Educators. Simplify attendance, fees, and
          more—all in one place.
        </p>
      </div>
      <div className="flex justify-center py-10 gap-10">
        <a href="#">
          <button className="border border-white lg:h-[40px] lg:w-[100px] bg-primary-red rounded shadow-lg text-slate-200 hover:text-white">
            Learn More
          </button>
        </a>

        <button
          className="border border-white bg-primary-red lg:h-[40px] lg:w-[100px] rounded shadow-lg text-slate-200 hover:text-white"
          onClick={onOpen} // Trigger the modal when clicked
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
