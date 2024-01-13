import { useState } from "react";
import Answers from "./Answers";
import Progress from "./Progress";
import questions from "../questions";

export default function Question({ index, onSkip, onHandleSelectedAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[index].answers[0] === answer,
      });
      setTimeout(() => {
        onHandleSelectedAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.isCorrect !== null && answer.selectedAnswer) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <Progress timeout={10000} onTimeOut={onSkip} />
      <h2>{questions[index].text}</h2>
      <Answers
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        onSelect={handleSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}
