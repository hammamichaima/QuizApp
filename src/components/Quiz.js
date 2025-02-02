import React from "react";


const [selectedOption, setSelectedOption] = useState(null);

const Quiz = ({ question, handleAnswer }) => {
  return (
    <div className="quiz">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option.isCorrect)}>
            {option.answer}
          </button>
        ))}
      </div>
    </div>
  );
};


export default Quiz;
