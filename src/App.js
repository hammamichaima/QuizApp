import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { API_BASE_URL, QUIZ_ENDPOINT } from "./config";


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Function to shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Fetch quiz data from backend
  const fetchQuizData = () => {
    fetch(`${API_BASE_URL}${QUIZ_ENDPOINT}`)
          .then((response) => response.json())
      .then((data) => {
        console.log("✅ Fetched API Data:", data);
        if (data && data.questions && data.questions.length > 0) {
          const shuffledQuestions = shuffleArray(data.questions);
          setQuestions(shuffledQuestions);
        } else {
          console.error("❌ API returned empty or wrong format.");
        }
      })
      .catch((error) => console.error("❌ Error fetching quiz data:", error));
  };

  
  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    fetchAndSetQuizData();
  }, []);
  


  const fetchAndSetQuizData = async () => {
    const data = await fetchQuizData();
    if (data && data.questions && data.questions.length > 0) {
      setQuestions(data.questions);
    } else {
      console.error("⚠️ API returned empty or incorrect data format.");
    }
  };

  
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setQuestions([]); 
    fetchQuizData(); 
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App is Running</h1>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
      <p>Score: {score}</p>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <Quiz question={questions[currentQuestion]} handleAnswer={handleAnswer} />
      ) : (
        <p>Loading questions or no questions available...</p>
      )}
      {showResults && (
        <Result score={score} totalQuestions={questions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
};

export default App;
