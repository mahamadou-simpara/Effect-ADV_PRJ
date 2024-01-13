import Answers from "./Answers";
import Progress from "./Progress";

export default function Question({
  questionText,
  answers,
  onSkip,
  selectedAnswer,
  answerState,
  handleSelectAnswer,
}) {
  return (
    <div id="question">
      <Progress timeout={10000} onTimeOut={onSkip} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}
