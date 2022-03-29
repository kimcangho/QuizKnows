import "./App.css";
import LandingView from "./components/LandingView";
import QuizView from "./components/QuizView";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

//This fetches questions from OTDB and packages them in a randomized format.

export default function App() {

  //<-- STATE HOOKS -->

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [trivia, setTrivia] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [fetchedQuestions, setFetchedQuestions] = useState(3); //Hard-coded number of questions to fetch
  const [finalScore, setFinalScore] = useState(0);

  //<-- USEEFFECT HOOKS -->
  
  //Fetch from OTDB on startup or new game
  useEffect(() => {
    if (!newGame) {
      console.log("Fetching trivia data...");
      setFinalScore(0);
      fetchTrivia();
    } else {
      console.log("Checking answers");
      checkAnswers();
    }
  }, [newGame]);
  //Put together question bank whenever new trivia questions are added
  useEffect(() => {
    if (trivia !== null) {
      console.log("Creating question bank...");
      setQuizQuestions(createQuestionBank(trivia));
    }
  }, [trivia]);

  //<-- HELPER FUNCTIONS -->

  //Fetches trivia questions and updates trivia state
  const fetchTrivia = () => {
    fetch(`https://opentdb.com/api.php?amount=${fetchedQuestions}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTrivia(data.results);
      });
  };
  //Creates and returns a new question bank
  const createQuestionBank = (trivia) => {
    //Create questionBank
    const questionBank = trivia.map((otdb) => {
      //Add id and question object
      const tempQuestion = {
        questionId: nanoid(),
        questionText: otdb.question,
      };
      const tempAnswers = [];
      //Add correct answer to answer array
      tempAnswers.push({
        answerId: nanoid(),
        answerText: otdb.correct_answer,
        isCorrect: true,
        isSelected: false,
      });
      //Add incorrect answers to answer array
      otdb.incorrect_answers.forEach((wrongAns) => {
        tempAnswers.push({
          answerId: nanoid(),
          answerText: wrongAns,
          isCorrect: false,
          isSelected: false,
        });
      });
      // Fisher-Yates shuffling algorithm
      for (let i = tempAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = tempAnswers[i];
        tempAnswers[i] = tempAnswers[j];
        tempAnswers[j] = temp;
      }
      //Package question and answers
      const packagedQuestion = {
        question: tempQuestion,
        answers: tempAnswers,
      };
      //Returns packaged object in form: {question: question, answers: [{answer1}, {answer2}, ...]}
      return packagedQuestion;
    });
    //Return array containing all packaged questionsquestions
    return questionBank;
  };

  //<-- EVENT HANDLERS -->

  //Start a new quiz
  const clickToStartQuiz = () => {
    //Note: does this function need to be cleaned up? State no longer tracked once we start quiz.
    setIsQuizStarted((prevStart) => !prevStart);
  };
  //Play a new quiz
  const clickToPlayAgain = () => {
    setNewGame((prevGame) => !prevGame);
    // console.log(`Starting a new game? ${newGame}`);
    
  };

  //Check answers and tally score - Issue with checking all answers from all questions
  const checkAnswers = () => {
    quizQuestions.forEach(fullQuestion => {
      fullQuestion.answers.forEach(answer => {
        if (answer.isSelected && answer.isCorrect) {
          setFinalScore(prevScore => prevScore + 1)
          console.log("Right!")
        } else {
          console.log("Wrong!")
        }
      })
    })
  }

  //Select answer - only one selectable per question
  const selectAnswer = (q_id, a_id) => {
    //Change isSelected flag based on questionId and answerId
    setQuizQuestions((oldQuizQuestions) =>
      oldQuizQuestions.map((currentQuestion) => {
        if (currentQuestion.question.questionId === q_id) {
          const currentAnsArr = currentQuestion.answers.map(currentAns => {
            if (currentAns.answerId === a_id) { //If id matches --> isSelected: true
              return (
                {...currentAns, isSelected: true}
              )
            } else {  //If id doesn't match --> isSelected: false
              return {...currentAns, isSelected: false}
            }
          })
          return (
            {...currentQuestion, answers: currentAnsArr}
          )
        } else {
          return { ...currentQuestion };
        }
      })
    );
  };

  //Sets view based on isQuizStarted state
  return (
    <div>
      {isQuizStarted ? (
        <QuizView
          questions={quizQuestions}
          newGame={newGame}
          playAgain={clickToPlayAgain}
          selectAnswer={selectAnswer}
          totalQuestions={fetchedQuestions}
          correctQuestions={finalScore}
        />
      ) : (
        <LandingView
          fetchedQuestions={fetchedQuestions}
          clickToStartQuiz={clickToStartQuiz}
        />
      )}
    </div>
  );
}
