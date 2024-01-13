import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import QuizConplete from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  console.log('before ' + activeQuestionIndex);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={QuizConplete} alt="logo quiz-complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  console.log(activeQuestionIndex);
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSkip={handleSkipAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        handleSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
