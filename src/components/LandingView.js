import React from "react";

export default function LandingView(props) {

  return (
    <div className="container">
      <h2 className="landing-title">QuizKnows!</h2>
      <p className="landing-instructions">Answer {props.fetchedQuestions} questions correctly</p>
      <button className="landing-button" onClick={props.clickToStartQuiz}>Start Quiz!</button>
    </div>
  );
}
