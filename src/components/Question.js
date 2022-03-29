import React, { useState } from "react";
import Button from "./Button";
import { nanoid } from "nanoid";

function Question(props) {
  const buildBank = (correctAns, incorrectArr) => {
    const tempBank = [];
    //Add correct answer object
    tempBank.push({
      id: nanoid(),
      answer: correctAns,
      isCorrect: true,
      isSelected: false,
    });
    //Add incorrect answer objects
    incorrectArr.forEach((wrongAns) => {
      tempBank.push({
        id: nanoid(),
        answer: wrongAns,
        isCorrect: false,
        isSelected: false,
      });
    });
    
    return tempBank;
  };

  const [answerBank, setAnswerBank] = useState((prevBank) => {
    if (!props.newGame) {
      return buildBank(props.correct, props.incorrect);
    }
  });

  //Only allows for one answer to be selected per question
  const selectAnswer = (id) => {
    console.log(`Selected item with id: ${id}`);
    setAnswerBank((oldBank) =>
      oldBank.map((answer) => {
        console.log(`isSelected flag: ${answer.isSelected}`);
        return answer.id === id
          ? { ...answer, isSelected: !answer.isSelected }
          : { ...answer, isSelected: false };
      })
    );
  };

  //Generates all answers per question
  const questionButtons = answerBank.map((question) => {
    return (
      <Button
        key={question.id}
        id={question.id}
        answer={question.answer}
        isCorrect={question.isCorrect}
        isSelected={question.isSelected}
        selectAnswer={() => selectAnswer(question.id)}
      />
    );
  });

  return (
    <div className="container">
      <h3 className="landing-title">{props.question}</h3>
      <div>
        {questionButtons}
        <hr></hr>
      </div>
    </div>
  );
}

export default Question;
