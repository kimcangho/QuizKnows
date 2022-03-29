import React from "react";
import NewQuestion from "./NewQuestion";
import Confetti from "react-confetti";

export default function QuizView(props) {
  //Display questions - New implementation
  const questionBank = props.questions.map((otdb) => {
    return (
      <NewQuestion
        key={otdb.question.questionId}
        questionId={otdb.question.questionId}
        questionText={otdb.question.questionText}
        answers={otdb.answers}
        selectAnswer={props.selectAnswer}
        newGame={props.newGame}
      />
    );
  });

  return (
    <div className="container">
      {questionBank}
      {props.newGame && (props.correctQuestions === props.totalQuestions) && <Confetti />}
      {props.newGame && (
        <h3 className="landing-title">
          You scored {props.correctQuestions}/{props.totalQuestions} correct
          answers
        </h3>
      )}
      <button className="landing-button" onClick={() => props.playAgain()}>
        {!props.newGame ? "Check Answers" : "Play Again"}
      </button>
    </div>
  );
}
