import { useState } from "react";
import Answers from "./Answers";
import Progress from "./Progress";
import questions from "../questions";

export default function Question({ index, onSkip, onHandleSelectedAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

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
      <Progress
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkip : null}
        mode={answerState}
      />
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
