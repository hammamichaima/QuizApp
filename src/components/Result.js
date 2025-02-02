// src/components/Result.js
import React from "react";

const Result = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <button onClick={restartQuiz}>Start New Quiz</button>
      </div>
  );
};

export default Result;
