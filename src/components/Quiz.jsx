import React, { use } from "react"
import Answer from "./Answer"
import { useState,useEffect } from "react"


export default function Quiz(){

    const [questions,setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isChecking,setIsChecking] = useState(false)
    const [showAnswers,setShowAnswers] = useState([])
    


    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
            const data = await res.json();
            setQuestions(data.results.map(q => {
                return {
                    ...q, 
                    allAnswers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
                };
            }))
            
        }
    
        fetchQuestions(); 
    }, []);
 

    

    function holdAnswer(questionIndex, answerIndex) {
        setSelectedAnswers(prev => {
         
          if (prev[questionIndex] === answerIndex) {
            const newAnswers = { ...prev };
            delete newAnswers[questionIndex]; 
            return newAnswers;
          } else {
            
            return {
              ...prev,
              [questionIndex]: answerIndex
            };
          }
        });
      }
      //TODO -> CHECK BUTTON CLICK
      // CHEKS IF SELECTED ANSWER === CORRECT ANSWER
      // SEND THRU PROPS -> SO DESIGN CAN BE APPLIED TO BUTTONS
      // DISPLAY FINAL SCORE
      // NEW GAME BUTTON AND FUNCTIONALITY
    
    const questionEl = questions.map((q, questionIndex) => {
        
      return (
            <div key={q.question} className="question--answer--component">
                <h4>{q.question}</h4>
    
                <div className="btn-container">
                    {q.allAnswers.map((answer, answerIndex) => (
                        <Answer
                            key={answerIndex}
                            id={answerIndex}
                            onClick={() => holdAnswer(questionIndex, answerIndex)}
                            isHeld={selectedAnswers[questionIndex] === answerIndex}
                            isWrong={isChecking && selectedAnswers[questionIndex] !== answerIndex && answer === q.correct_answer && selectedAnswers[questionIndex] !== answerIndex}
                            isCorrect={isChecking === true && selectedAnswers[questionIndex] === answerIndex && answer === q.correct_answer}
                            // displaying styles based on condtions of states
                            shouldDisable={isChecking}
                            answer={answer}
                        />
                    ))}
                </div>
                <hr />
            </div>
        );
    });
    
    

    
    function checkAnswers(){
        console.log("answer check")
        setIsChecking(true)
        

    }
   
    
   

   
    
    
    return(
        <>
        <main className="question--component--main">
            

            {questionEl}
            {Object.keys(selectedAnswers).length === questions.length && (
                <button onClick={checkAnswers}> Check Answers</button>
            )}

            
            
            
        </main>
        </>
    )
}