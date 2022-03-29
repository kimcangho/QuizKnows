import React from "react";

export default function NewButton(props) {

    const className = () => {
        if (!props.newGame) {
            if (props.isSelected) {
                return "selected-button"
            } else {
                return "answer-button"
            }
        } else {
            if (props.isCorrect) {
                return "correct-button"
            } else if (props.isSelected && !props.isCorrect) {
                return "incorrect-button"
            } else {
                return "answer-button"
            }
        }
    }
    

  return (
    <button
      className={className()}
    //   className={props.isCorrect ? "correct-button" : "incorrect-button"}
      onClick={() => props.selectAnswer(props.questionId, props.answerId)}
    >
      {props.answerText}
    </button>
  );
}
