"use client";

import React from "react";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg text-center text-blue-800">
      {question}
    </div>
  );
};
