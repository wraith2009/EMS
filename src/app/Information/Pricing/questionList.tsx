import React from "react";
import QuestionCard from "./questionCard";

interface Question {
  question: string;
  answer: string;
}

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  return (
    <div className="my-8">
      {questions.map((q, index) => (
        <QuestionCard key={index} question={q.question} answer={q.answer} />
      ))}
    </div>
  );
};

export default QuestionsList;
