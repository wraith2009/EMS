import React, { useState } from "react";

interface QuestionCardProps {
  question: string;
  answer: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b py-4 px-8">
      <div
        onClick={toggleAnswer}
        className="cursor-pointer p-2 flex justify-between bg-red-200 rounded-lg items-center"
      >
        <h3 className="text-lg font-semibold  text-[#676767]">{question}</h3>
        <span>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <p className=" p-2 bg-gray-400 rounded-lg text-white">{answer}</p>
      )}
    </div>
  );
};

export default QuestionCard;
