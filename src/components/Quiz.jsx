import React from "react"
import Answer from "./Answer"
import { useState,useEffect, useRef } from "react"
import he from "he"



export default function Quiz(){

    const [questions,setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isChecking,setIsChecking] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [score,setScore] = useState(0)  
    const newButtonRef = useRef(null)  


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


    useEffect(() => {
        
        fetchQuestions(); 
    }, []);
    //moved fetchquestions outside so i can call after new game is clicked
 

    

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
     
      
    
    const questionEl = questions.map((q, questionIndex) => {
        
      return (
            <div key={q.question} className="question--answer--component">
                <h4>{he.decode(q.question)}</h4>
    
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
                            answer={he.decode(answer)}
                        />
                    ))}
                </div>
                <hr />
            </div>
        );
    });
    
    

    
    function checkAnswers(){
        if(!isGameOver){
            setIsChecking(true)
            setIsGameOver(true)

            let count = 0;
            questions.forEach((q, index) => {
                const selected = selectedAnswers[index];
                if (q.correct_answer === q.allAnswers[selected]) { //displaying score amount
                count++;
                }
            });
          setScore(count);

        }else{
            setIsChecking(false)
            setIsGameOver(false)
            setSelectedAnswers({})
            fetchQuestions();
            setScore(0)
        }
    }
   
    
    useEffect(() =>{
        if(isGameOver && newButtonRef.current){
            newButtonRef.current.scrollIntoView({behaviour: 'smooth'})
            newButtonRef.current.focus()
        }
    }, [isGameOver])

   
    
    
    return(
        <>
        <main className="question--component--main">
            

            {questionEl}

             {isGameOver === true ? <p className="score" >Your score is {score} / 5</p> : null}

            {Object.keys(selectedAnswers).length === questions.length && (
                <button className="check-answers" onClick={checkAnswers} ref={newButtonRef}> {isChecking === false ? 'Check Answers' : 'New Game'}</button>
            )}
        
         </main>
        </>
    )
}