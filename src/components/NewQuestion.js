import React from "react";
import NewButton from "./NewButton";

export default function NewQuestion(props) {
  //Map buttons
  const answerButtons = props.answers.map((answer) => {
    return (
      <NewButton
        key={answer.answerId}
        questionId={props.questionId}
        answerId={answer.answerId}
        answerText={answer.answerText}
        isCorrect={answer.isCorrect}
        isSelected={answer.isSelected}
        selectAnswer={props.selectAnswer}
        newGame={props.newGame}
      />
    );
  });

  return (
    <div className="container">
      <h3 className="landing-title">{props.questionText}</h3>
      <div>
        {answerButtons}
        <hr></hr>
      </div>
    </div>
  );
}
