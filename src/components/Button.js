import React from "react";

export default function Button(props) {
  //   const styles = {
  //     backgroundColor: props.isCorrect ? "green" : "red",
  //   };
  return (
    <button
      className={props.isSelected ? "selected-button" : "answer-button"}
      onClick={() => props.selectAnswer(props.id)}
    >
      {props.answer}
    </button>
  );
}
